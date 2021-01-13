<template>
  <div class="container">
    <div style="margin-bottom:50px">
    <h1>Login</h1>
    <p>Log in to the API
This command is required for every session in order to identify the user for the API</p>
    </div>
    <div class="row">
    <form @submit.prevent="login(usuario)" style="border: black 2px solid; padding:40px; margin-left:auto; margin-right:auto">
      
     
      <!-- v-model relaciona los input con la data que tenemos en vue-->
    
      <label for="">User: </label>
      <input type="text" placeholder="Usuario" v-model="usuario.Alias" style="margin-right:50px">
     
  
      <label for="">Password: </label>
      <input type="password" placeholder="password" v-model="usuario.Contrasena" style="margin-right:50px">
      
      <div>
      <button type="submit "  class="btn btn-success" style="margin-top:50px">Send</button>
      </div>
      
      
    </form>
    
    </div>
  </div>
</template>

<script>

//el mapaction accede a lo que esta en acciones
import {mapActions} from 'vuex'


//las acciones siempre van en los metodos, el metodo login se trae de index.js y se llama arriba en el formulario

export default {
  data(){
    return{
      usuario:{
        Alias:'cbaez',
        Contrasena:'inicio01'
      }
    }
  },

  methods:{
    
    
    ...mapActions(['login']),
   

    
  },

}
</script>
