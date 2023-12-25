import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import GenreView from '../views/GenreView.vue'
import UserDashboardView from '../views/UserDashboardView.vue'
import UserPostsView from '../views/UserPostsView.vue'
import UserInformationView from '../views/UserInformationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'home',
    component: HomeView
   }, 
   {
    path: '/user', 
    name: 'user',
    component: UserView, 
    redirect: '/user/dashboard', 
    children: [
      {
        path: 'dashboard', 
        component: UserDashboardView,
        name: 'user.dashboard'
      }, 
      {
        path: 'posts', 
        component: UserPostsView,
        name: 'user.posts'
      }, 
      {
        path: 'profile',
        component: UserInformationView,
        name: 'user.profile'
      }
    ] 
   }, 
   {
    path: '/genre/:id',
    name: 'genre',
    component: GenreView
   }
  ]
})
export default router;