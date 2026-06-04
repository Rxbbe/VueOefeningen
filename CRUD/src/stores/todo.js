import { defineStore } from "pinia";
import { ref } from "vue";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const useTodoStore = defineStore("todo", () => {
  // --- State ---
  const todos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- READ: alle todos ophalen ---
  async function fetchTodos() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      todos.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // --- READ: één todo ophalen op id ---
  async function getTodoById(id) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      return await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // --- CREATE: nieuwe todo ---
  async function addTodo(title) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const newTodo = await response.json();
      // jsonplaceholder wijzigt de server niet écht → state zelf bijwerken
      todos.value.unshift(newTodo);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // --- UPDATE: bestaande todo ---
  async function updateTodo(updatedTodo) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BASE_URL}/${updatedTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const result = await response.json();
      // state bijwerken: het oude item vervangen door het bijgewerkte
      const index = todos.value.findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) todos.value[index] = { ...todos.value[index], ...result };
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // --- DELETE: todo verwijderen ---
  async function deleteTodo(id) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      // state bijwerken: item eruit filteren
      todos.value = todos.value.filter((t) => t.id !== id);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return { todos, loading, error, fetchTodos, getTodoById, addTodo, updateTodo, deleteTodo };
});