import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{rutaProtegida:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next)=>{
  //mi meta:true se pasa a rutaEsProtegida, home es f ,  y about es true
  const rutaEsProtegida= to.matched.some(item => item.meta.rutaProtegida)
  if(rutaEsProtegida && store.state.token===null){
    //si existe el token, el usuario puede acceder a la ruta protegida
    next('/')
  }
  else{
    next()
  }
})

export default router
