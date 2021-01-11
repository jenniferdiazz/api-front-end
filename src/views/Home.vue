<template>
  <div class="home">
    <h1>Login</h1>
    <form @submit.prevent="login(usuario)">
      <!-- v-model relaciona los input con la data que tenemos en vue-->
      <input type="text" placeholder="Usuario" v-model="usuario.Alias">
      <input type="password" placeholder="password" v-model="usuario.Contrasena">
      <button type="submit">Acceder</button>
    </form>
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
    ...mapActions(['login'])
  }

}
</script>
