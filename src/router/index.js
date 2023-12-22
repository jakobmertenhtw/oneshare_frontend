import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import GenreView from '../views/GenreView.vue'

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
    component: UserView
   }, 
   {
    path: '/genre/:id',
    name: 'genre',
    component: GenreView
   }
  ]
})
export default router;
