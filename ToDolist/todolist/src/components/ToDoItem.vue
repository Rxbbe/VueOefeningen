<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
    // Validator: controleert of het object de juiste velden bevat
    validator: (value) => {
      return (
        typeof value.id !== "undefined" &&
        typeof value.title === "string" &&
        typeof value.done === "boolean"
      );
    },
  },
});

const emit = defineEmits(["toggle", "remove"]);
</script>
<template>
    <li class="todo-item">
    <input
      type="checkbox"
      :checked="todo.done"
      @change="emit('toggle', todo.id)"
    />
    <span :class="{ done: todo.done }">{{ todo.title }}</span>
    <button class="remove" @click="emit('remove', todo.id)">Verwijder</button>
  </li>
</template>


<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}
.done {
  text-decoration: line-through;
  color: #999;
}
.remove {
  margin-left: auto;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>