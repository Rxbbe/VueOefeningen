import { createRouter, createWebHistory } from 'vue-router'
import JokeView from '@/views/JokeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'joke',
      component: JokeView,
    }
    
  ],
})

export default router
