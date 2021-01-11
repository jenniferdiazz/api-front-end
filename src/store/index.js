import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null
  },
  mutations: {
    setToken(state, payload){
      state.token = payload
    }
  },
  actions: {
    //lo segundo es el componente que recibe. dentro del login se hace la solicitud
    async login({commit}, usuario){
      console.log(usuario)
      try{
          const res= await fetch('http://localhost:3000/api/login',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
          })

          //viene la respuesta de nuestra base de datos
          const resDB = await res.json()
          console.log(resDB)
          
          //el commit llama una mutacion, lo segundo es lo que le enviaremos
          commit('setToken', resDB.data.token)
          //para almaacenar las credenciales usamos localstorage
          localStorage.setItem('token2', resDB.data.token)
          alert("Ha iniciado sesión")
      }catch(error){
        console.log(error)
        alert("Ha ocurrido un error")

      }

    },
    leerToken({ commit }){
      //pregunta si el token existe
      if(localStorage.getItem('token')){
        commit('setToken',localStorage.getItem('token'))
      }else{
        commit('setToken',null)

      }
    },
    cerrarSesion({commit}){
      localStorage.removeItem('token')
      commit('setToken', null)
      alert("Ha cerrado sesión")

    }
  },
  modules: {
  }
})
