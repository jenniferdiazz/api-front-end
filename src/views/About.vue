<template>
  <div class="container">
    <button @click="cerrarSesion" class="btn btn-secondary">Logout</button>
    <h3>Current session: </h3>
    <div class="row">
      <div class="col-sm-12 col-md-12" style="padding-bottom:50px"> 
        {{token}}
      </div>
      <div class="col-sm-12 col-md-12"></div>
      <div class="col-md-4 col-lg-4" style="margin-right:80px">
          <form @submit.prevent="listar()" >
            <div class="" style="border: black 1px solid; padding:40px; text-align: left " >
              <h3 class="text-center">Events request</h3>
              <hr>
              <h5>Filters</h5>
              <p>Request the events for a car(VIN), or patent</p>
              <label for="">VIN  : </label>
              <input type="text" placeholder="Ingrese el VIN" class="form-control m-2" v-model="vehiculo.vin">
              <label for="">Patente  : </label>
              <input type="text" placeholder="Ingrese la patente" class="form-control m-2" v-model="vehiculo.patente"><br>
              <label>Event type: </label>
              <div class="input-field">
                <select class="form-select" style="width: 60%; height:25%; margin-left:15px" @change="handleChange" >
                  <option value="" selected >Todos</option>
                  <option value="25">GPS</option>
                  <option value="54">Motor</option>
                </select>
                <br>
              </div>
              <br>
              <hr>
              <h5>Date filter</h5>
              <label for="">From date  : </label>
              <input type="text" placeholder="2020-01-01 00:00:00" class="form-control m-2" v-model="vehiculo.startedDate">
              <p>Format: YYYY-MM-DD HH:MM:SS</p>
              <label for="">To date  : </label>
              <input type="text" placeholder="2020-12-12 00:00:00" class="form-control m-2" v-model="vehiculo.endDate">
              <p>Format: YYYY-MM-DD HH:MM:SS</p>
              <hr>
              <div class="text-center">
                <button type="submit" class="btn btn-success" @click="handleClick">Send</button>
              </div>
            </div>
          </form>
      </div>
        
    
      <div clas="col-md-8 col-lg-8" style="text-align: left">
    
        <div>
          <h3>Request: </h3>
          <pre>{{this.vehiculo}}</pre>
        </div>
        <div>
          <h3>Response: </h3>
          <!-- <pre>{{vehiculos}}</pre> -->
          
          <div>
  <tree-view :data="this.vehiculos" :options="{maxDepth: 2, rootObjectKey: 'data'}"></tree-view>
</div>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>

 //El map state siempre va en una propiedad computada
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import Vue from 'vue'
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)

export default{
  data(){
    return{
      
      vehiculo:{},
      
      vehiculos:{},
     
   
    }
    },
    computed:{
    ...mapState(['token'])
  },
 
  created() {

 this.vehiculo.generico=""
  this.vehiculo.vin= ""
 this.vehiculo.startedDate= ""
  this.vehiculo.endDate= ""
  this.vehiculo.patente= ""

    console.log('created')

  },
  
  methods:{
    handleChange(e) {     
      console.log(e.target.value)
      this.vehiculo.generico=e.target.value
           
       },
       handleClick(e) {     
      console.log(e.target.value)
      this.vehiculos="Loading...."
           
       },
     
    
    ...mapActions(['cerrarSesion']),
    async listar(){
      try{
        console.log("Send...")
        
        if(this.vehiculo.startedDate==undefined && this.vehiculo.endDate==undefined){
          this.vehiculo.startedDate=""
          this.vehiculo.endDate=""
        }
        if(this.vehiculo.patente==undefined){
          this.vehiculo.patente=""
        }
        if(this.vehiculo.vin==undefined){
          this.vehiculo.vin=""
        }
        //por defecto la solicitud es get
        //this.carga="Cargando..."
        const res = await fetch(`http://localhost:3000/api/?vin=${this.vehiculo.vin}&startedDate=${this.vehiculo.startedDate}&endDate=${this.vehiculo.endDate}&patente=${this.vehiculo.patente}&generico=${this.vehiculo.generico}`,{
          headers:{
             'Content-Type': 'application/json',
             //esto lee del servidor
            'auth-token': this.token
          }
        })
        
        //this.carga=""
        
        const dataDB = await res.json()
      
        this.vehiculos= dataDB
      }catch(error){
        console.log(error)
      }
    },
 
  

  }
 

}
</script>

<style>
  .tree-view-item-key {
    font-weight: bold;
}
</style>