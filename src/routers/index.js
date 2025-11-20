import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../api/Auth'
import LoginPage from '../views/Login.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import AnnouncementsPage from '../views/Announcements.vue'







const routes = [
  {
    path: '/',
    redirect: '/login', // Explicitly redirect root to login
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { public: true },
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      
      {
        path: 'announcements',
        name: 'AnnouncementsPage',
        component: AnnouncementsPage,
      },
    
    
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = Auth.isAuthenticated()

   if (!to.meta.public && !isAuthenticated) {
    next('/login') }

    if (to.path === '/login' && isAuthenticated) {
    next('/dashboard') 
  } else {
    next()
  }
})

export default router