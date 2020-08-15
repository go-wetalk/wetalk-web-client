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
    component: () => import(/* webpackChunkName: "writePost" */ '../views/WritePost.vue'),
    meta: {
      required: true
    }
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import(/* webpackChunkName: "notification" */ '../views/Notification.vue'),
    meta: {
      required: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      required: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      required: true
    }
  },
  {
    path: '/topics/:topicId',
    name: 'JoinTopic',
    component: () => import(/* webpackChunkName: "joinTopic" */ '../views/Topic.vue'),
    props: true,
  },
  {
    path: '/users/:name',
    name: 'UserDetail',
    component: () => import(/* webpackChunkName: "userDetail" */ '../views/UserDetail.vue'),
    props: true,
    meta: {
      required: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
