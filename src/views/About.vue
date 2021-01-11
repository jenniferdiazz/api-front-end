<template>
  <div class="container">
    <h1>Ruta protegida</h1>
    <button @click="cerrarSesion" class="btn btn-secondary">Logout</button>
    
     <div class="row">
       <div class="col-sm-12 col-md-12" style="padding-bottom:50px">Current session: {{token}}</div>
       <div class="col-sm-8 col-md-7" >
    <form @submit.prevent="listar()">
      <div class="text-center col-md-8" style="border: black 2px solid; padding:40px" >
            <h3 class="text-center">Events request</h3>
            <p>Request the events for a car(VIN)</p>
            
            <input type="text" placeholder="Ingrese el VIN" class="form-control m-2" v-model="vehiculo.vin">
            <button type="submit" class="btn btn-success">Send</button>
            
            </div>
    </form>
       </div>
   
   
      <div class="col-sm-4 col-md-5">
    <div clas="" v-if="ver">
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
        //por defecto la solicitud es get
        const res = await fetch(`http://localhost:3000/api/?vin=${this.vehiculo.vin}`,{
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
 
  //created inicializa una funcion
  created(){
    this.datosProtegidos();
  }

  }
 

}
</script>
