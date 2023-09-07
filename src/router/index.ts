import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    redirect: "/about/main",
    children:[
      {
        path: '/about/main',
        name: 'main',
        component: () => import('../views/Main.vue'),
      },
      {
        path:'/about/manage',
        name: 'manage',
        component: () => import('../views/Manage.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
