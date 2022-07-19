import { createRouter, createWebHashHistory } from 'vue-router'

export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: () => import('../Layout'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/404')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
