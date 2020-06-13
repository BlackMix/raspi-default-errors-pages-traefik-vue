import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/error/404' },
  {
    path: '/error/:error',
    name: 'Error',
    title: 'Error',
    component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
  }
]

const router = new VueRouter({ routes })

export default router
