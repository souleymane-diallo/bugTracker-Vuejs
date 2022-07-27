import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DashbordView from '@/views/DashbordView.vue'
import AddBugView from '@/views/AddBugView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/inscription',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/dashbord',
    name: 'Dashbord',
    component: DashbordView
  },
  {
    path: '/dashbord/ajouter-bug',
    name: 'AddBug',
    component: AddBugView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
