<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todo";
import TodoDetail from "@/components/TodoDetail.vue";

const route = useRoute();
const router = useRouter();
const todoStore = useTodoStore();

const todo = ref(null);

onMounted(async () => {
  const id = route.params.id;
  todo.value = await todoStore.getTodoById(id);
});

// Bonus: het emit-event van TodoDetail afhandelen
async function handleDelete(id) {
  await todoStore.deleteTodo(id);
  router.push({ name: "TodoList" }); // terug naar de lijst
}
</script>

<template>
  <p v-if="todoStore.loading">Laden...</p>
  <p v-if="todoStore.error" class="error">Fout: {{ todoStore.error }}</p>

  <TodoDetail v-if="todo" :todo="todo" @delete="handleDelete" />

  <button @click="router.push({ name: 'TodoList' })">← Terug naar lijst</button>
</template>