import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/joinus',
    name: 'JoinUs',
    component: () => import(/* webpackChunkName: "joinUs" */ '../views/JoinUs.vue')
  },
  {
    path: '/write',
    name: 'WritePost',
    component: () => import(/* webpackChunkName: "writePost" */ '../views/WritePost.vue')
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import(/* webpackChunkName: "notification" */ '../views/Notification.vue')
  },
  {
    path: '/topics/:topicId',
    name: 'JoinTopic',
    component: () => import(/* webpackChunkName: "joinTopic" */ '../views/Topic.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
