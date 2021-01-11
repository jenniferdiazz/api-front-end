<template>
  <div class="about">
    <h1>Ruta protegida</h1>
    {{token}}
     <div class="row">
    <form @submit.prevent="listar()">
            <h3 class="text-center">Pide un deseo</h3>
            <div class="text-center">
            <input type="text" placeholder="Ingrese el VIN" class="form-control m-2" v-model="vehiculo.vin">
            <button type="submit" class="btn btn-block btn-success">Buscar</button>
            
            </div>
    </form>
    </div>
    <div clas="" v-if="ver">
    {{vehiculos}}
    </div>

   
  </div>
</template>
<script>
 //El map state siempre va en una propiedad computada
import {mapState} from 'vuex'

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
  // listar(){
  //   //this.ver=!this.ver
  //       this.axios.get(`/?vin=${this.vehiculo.vin}`)
  //       .then((response)=>{
  //         console.log(this.vehiculo.vin)
  //           this.vehiculos= response.data;
  //       })
  //       .catch(e=>{
  //         console.log(this.vehiculo.vin)          
  //           console.log('error'+e)
  //       })
  //   },
  //created inicializa una funcion
  created(){
    this.datosProtegidos();
  }

  }
 

}
</script>
