<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete"]);
</script>

<template>
  <div class="detail">
    <h2>{{ todo.title }}</h2>
    <p>Status: {{ todo.completed ? "Voltooid" : "Niet voltooid" }}</p>
    <p>ID: {{ todo.id }}</p>

    <button class="delete" @click="emit('delete', todo.id)">Verwijderen</button>
  </div>
</template>

<style scoped>
.detail {
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1.5rem;
}
.delete {
  background: #dc3545; color: #fff; border: none;
  padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;
}
</style>