<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "toggle"]);
</script>

<template>
  <li class="task" :class="{ done: task.completed }">
    <span @click="emit('toggle', task.id)">{{ task.text }}</span>
    <button class="delete" @click="emit('delete', task.id)">Verwijder</button>
  </li>
</template>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}
.task span {
  cursor: pointer;
}
.done span {
  text-decoration: line-through;
  color: #999;
}
.delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>