<script setup>
import { onMounted } from "vue";
import { useTodoStore } from "@/stores/todo";
import TodoList from "@/components/ToDoList.vue";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.fetchTodos();
});
</script>

<template>
  <h1>Mijn Todo's</h1>
  <TodoList />
</template>