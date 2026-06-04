<script setup>
import { ref } from "vue";
import TodoItem from "@/components/ToDoItem.vue";

const todos = ref([
  { id: 1, title: "Web Advanced studeren", done: false },
  { id: 2, title: "Oefening to-do list maken", done: true },
  { id: 3, title: "Cheat sheet doornemen", done: false },
]);

// Emit 'toggle' → done-status van de juiste todo omdraaien
function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
}

// Emit 'remove' → de juiste todo uit de lijst filteren
function removeTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id);
}
</script>

<template>
  <h2>Mijn to-do lijst</h2>

  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="toggleTodo"
      @remove="removeTodo"
    />
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>