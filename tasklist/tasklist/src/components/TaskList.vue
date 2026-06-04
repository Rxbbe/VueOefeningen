<script setup>
import { ref, computed, onMounted } from "vue";
import TaskItem from "./TaskItem.vue";

const tasks = ref([]);
const newTask = ref("");

// --- Taak toevoegen ---
function addTask() {
  if (newTask.value.trim() === "") return; // lege taak negeren

  tasks.value.push({
    id: Date.now(),          // simpele unieke id
    text: newTask.value,
    completed: false,
  });

  newTask.value = "";        // invoerveld leegmaken
  saveTasks();
}

// --- Taak verwijderen ---
function deleteTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
  saveTasks();
}

// --- Taak (de)markeren als voltooid ---
function toggleTask(id) {
  const task = tasks.value.find((task) => task.id === id);
  if (task) task.completed = !task.completed;
  saveTasks();
}

// --- localStorage opslaan ---
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

// --- Computed: aantal openstaande taken ---
const openTasks = computed(
  () => tasks.value.filter((task) => !task.completed).length
);

// --- Bij opstarten laden uit localStorage ---
onMounted(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks.value = JSON.parse(saved);
  }
});
</script>

<template>
  <h2>Mijn takenlijst</h2>

  <div class="add-task">
    <input v-model="newTask" placeholder="Nieuwe taak..." @keyup.enter="addTask" />
    <button @click="addTask">Toevoegen</button>
  </div>

  <p>Openstaande taken: {{ openTasks }}</p>

  <ul class="list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete="deleteTask"
      @toggle="toggleTask"
    />
  </ul>
</template>

<style scoped>
.add-task {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.add-task input {
  flex: 1;
  padding: 0.5rem;
}
.add-task button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.list {
  list-style: none;
  padding: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>