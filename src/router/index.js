import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'home',
  component: () => import( /* webpackChunkName: "home" */ '../views/index.vue')
}, {
  path: '/amuse/lottery',
  name: 'amuse.lottery',
  component: () => import( /* webpackChunkName: "amuse.lottery" */ '../views/amuse/lottery.vue')
}, {
  path: '/amuse/truth',
  name: 'amuse.truth',
  component: () => import( /* webpackChunkName: "amuse.truth" */ '../views/amuse/truth.vue')
}, {
  path: '/basic/tasks',
  name: 'basic.tasks',
  component: () => import( /* webpackChunkName: "basic.tasks" */ '../views/basic/tasks.vue')
}, {
  path: '/system/shutdown',
  name: 'system.shutdown',
  component: () => import( /* webpackChunkName: "system.shutdown" */ '../views/system/shutdown.vue')
}]

const router = new VueRouter({
  routes
})

export default router