<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todo";

const todoStore = useTodoStore();
const router = useRouter();

const newTitle = ref("");

function handleAdd() {
  if (newTitle.value.trim() === "") return;
  todoStore.addTodo(newTitle.value.trim());
  newTitle.value = "";
}

function handleToggle(todo) {
  // PUT met de omgekeerde completed-status
  todoStore.updateTodo({ ...todo, completed: !todo.completed });
}

function goToDetail(id) {
  router.push({ name: "TodoDetail", params: { id } });
}
</script>

<template>
  <div>
    <h2>Takenlijst</h2>

    <div class="add">
      <input v-model="newTitle" placeholder="Nieuwe taak..." @keyup.enter="handleAdd" />
      <button @click="handleAdd">Toevoegen</button>
    </div>

    <p v-if="todoStore.loading">Laden...</p>
    <p v-if="todoStore.error" class="error">Fout: {{ todoStore.error }}</p>

    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="handleToggle(todo)"
        />
        <span :class="{ done: todo.completed }" @click="goToDetail(todo.id)">
          {{ todo.title }}
        </span>
        <button @click="todoStore.deleteTodo(todo.id)">Verwijder</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.add { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.done { text-decoration: line-through; color: #999; }
li { display: flex; align-items: center; gap: 0.5rem; }
li span { cursor: pointer; flex: 1; }
.error { color: #dc3545; }
</style>