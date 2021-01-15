<template>
  <div class="container">
    
    
    
    <button @click="cerrarSesion" class="btn btn-secondary">Logout</button>
    <h3>Current session: </h3>
     <div class="row">
       <div class="col-sm-12 col-md-12" style="padding-bottom:50px"> {{token}}</div>
       <div class="col-sm-8 col-md-7" >
    <form @submit.prevent="listar()">
      <div class="text-center col-md-8" style="border: black 2px solid; padding:40px" >
            <h3 class="text-center">Events request</h3>
            <h5>Filters</h5>
            <p>Request the events for a car(VIN)</p>
            <label for="">VIN  : </label>
            <input type="text" placeholder="Ingrese el VIN" class="form-control m-2" v-model="vehiculo.vin">
            <label for="">Patente  : </label>
            <input type="text" placeholder="Ingrese la patente" class="form-control m-2" v-model="vehiculo.patente">
            <hr>
            <h5>Date filter</h5>
            <label for="">From date  : </label>
            <input type="text" placeholder="Ingrese fecha inicial" class="form-control m-2" v-model="vehiculo.startedDate">
            <p>Format: YYYY-MM-DD HH:MM:SS</p>

            <label for="">To date  : </label>
            <input type="text" placeholder="Ingrese fecha final" class="form-control m-2" v-model="vehiculo.endDate">
            <button type="submit" class="btn btn-success">Send</button>
            <p>Format: YYYY-MM-DD HH:MM:SS</p>
            
            </div>
    </form>
       </div>
   
   
      <div class="col-sm-4 col-md-5">
        
    <div clas="" v-if="ver">
      <h3>Require: </h3>
      {{vehiculo}}

      <h3>Response: </h3>
      <pre>{{vehiculos}}</pre>
      <!-- <vue-json-pretty
      :data="this.vehiculos"
      > 
    </vue-json-pretty> -->
   
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
import VueJsonPretty from 'vue-json-pretty'
Vue.component("vue-json-pretty", VueJsonPretty.default);

export default{
  data(){
    return{
      
      vehiculo:{},
      ver:false,
      vehiculos:{}
    }
    },
    computed:{
    ...mapState(['token'])
  },
   components: {
    VueJsonPretty
  },
  
  methods:{
    
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
        this.vehiculos="Cargando..."
        const res = await fetch(`http://localhost:3000/api/?vin=${this.vehiculo.vin}&startedDate=${this.vehiculo.startedDate}&endDate=${this.vehiculo.endDate}&patente=${this.vehiculo.patente}`,{
          headers:{
             'Content-Type': 'application/json',
             //esto lee del servidor
            'auth-token': this.token
          }
        })
        this.ver=true
        const dataDB = await res.json()
      
        this.vehiculos= dataDB
      }catch(error){
        console.log(error)
      }
    },
 
  

  }
 

}
</script>
