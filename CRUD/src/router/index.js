import { createRouter, createWebHistory } from "vue-router";
import TodoView from "../views/TodoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/todos", name: "TodoList", component: TodoView },
    {
      path: "/todos/:id",
      name: "TodoDetail",
      component: () => import("../views/TodoDetailView.vue"),
    },
  ],
});

export default router;