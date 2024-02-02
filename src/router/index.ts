import { createRouter, createWebHistory } from 'vue-router'

import common from './common'
import system from './system'

import dashboard from '@/views/dashboard/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      // component: dashboard
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    ...system.routers,
    ...common.routers
  ]
})

export default router
