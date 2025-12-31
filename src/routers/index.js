import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../api/Auth'
import LoginPage from '../views/Login.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import AnnouncementsPage from '../views/Announcements.vue'
import Payments from '../views/Payments.vue'
import FeeStructures from '../views/FeeStructures.vue'
import Expenditures from '../views/Expenditures.vue'
import Invoices from '../views/Invoices.vue'
import FeeDetails from '../components/FeeStructure/FeeDetails.vue'
import FeeCreate from '../components/FeeStructure/FeeCreate.vue'
import FeePrint from '../components/FeeStructure/FeePrint.vue'
import InvoiceCreate from '../components/Invoices/InvoiceCreate.vue'
import InvoiceDetail from '../components/Invoices/InvoiceDetail.vue'
import PaymentDetails from '../components/payments/PaymentDetails.vue'
import ExpenseDetails from '../components/Expenses/ExpenseDetails.vue'
import EventDetail from '../components/events/EventDetail.vue'



const routes = [
  {
    path: '/',
    redirect: '/login', 
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
        path: 'fee-structure',
        name: 'FeeStructure',
        component: FeeStructures
      },
      {
        path: 'invoices',
        name: 'Invoices',
        component: Invoices
      },
      {
        path: 'payments',
        name: 'Payments',
        component: Payments
      },
      {
        path: 'invoice-create',
        name: 'CreateInvoice',
        component: InvoiceCreate
      },
      {
        path: 'invoice-detail/:id',
        name: 'InvoiceDetail',
        component: InvoiceDetail
      },
    
      {
        path: 'payment-details/:id',
        name: 'PaymentDetails',
        component: PaymentDetails
      },
      {
        path: 'expenditures',
        name: 'Expenditures',
        component: Expenditures
      },
      {
        path: 'expenses-details/:id',
        name: 'ExpenseDetails',
        component: ExpenseDetails
      },
      {
        path: 'fee-details/:id',
        name: 'FeeDetails',
        component: FeeDetails
      },
      {
        path: 'fee-create',
        name: 'FeeCreate',
        component: FeeCreate
      },
      {
       path: '/finance/fees/print/:id',
       name: 'FeePrint',
       component: FeePrint
      },
      {
        path: 'event-details/:id',
        name: 'EventDetail',
        component: EventDetail
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