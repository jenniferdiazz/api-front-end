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
            <p>Request the events for a car(VIN)</p>
            <label for="">VIN  : </label>
            <input type="text" placeholder="Ingrese el VIN" class="form-control m-2" v-model="vehiculo.vin">

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
    {{vehiculos}}
    </div>
    </div>
    </div>

   
  </div>
</template>
<script>

 //El map state siempre va en una propiedad computada
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

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
  methods:{
    ...mapActions(['cerrarSesion']),
    async listar(){
      try{
        console.log("holaaaaaa")
        
        if(this.vehiculo.startedDate==undefined && this.vehiculo.endDate==undefined){
          this.vehiculo.startedDate=""
          this.vehiculo.endDate=""
        }
        console.log(this.vehiculo.startedDate)
        //por defecto la solicitud es get
        const res = await fetch(`http://localhost:3000/api/?vin=${this.vehiculo.vin}&startedDate=${this.vehiculo.startedDate}&endDate=${this.vehiculo.endDate}`,{
          headers:{
             'Content-Type': 'application/json',
             //esto lee del servidor
            'auth-token': this.token
          }
        })
        this.ver=true
        const dataDB = await res.json()
        console.log(dataDB)
        console.log(this.vehiculo.vin)
        this.vehiculos= dataDB;

      }catch(error){
        console.log(error)
      }
    },
 
  

  }
 

}
</script>
