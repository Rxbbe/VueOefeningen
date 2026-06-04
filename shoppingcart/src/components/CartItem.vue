<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) =>
      typeof value.id !== "undefined" &&
      typeof value.title === "string" &&
      typeof value.price === "number" &&
      typeof value.qty === "number",
  },
});

const emit = defineEmits(["add", "remove", "setQty"]);
</script>

<template>
  <li class="cart-item">
    <span class="info">{{ item.title }} — € {{ item.price.toFixed(2) }}</span>

    <div class="qty">
      <button @click="emit('setQty', { id: item.id, qty: item.qty - 1 })">−</button>
      <span class="number">{{ item.qty }}</span>
      <button @click="emit('add', item.id)">+</button>
    </div>

    <button class="remove" @click="emit('remove', item.id)">Verwijder</button>
  </li>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid #ccc;
}
.info { flex: 1; }
.qty { display: flex; align-items: center; gap: 0.5rem; }
.qty button {
  width: 28px; height: 28px;
  border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer;
}
.number { min-width: 1.5rem; text-align: center; }
.remove {
  background: #dc3545; color: #fff; border: none;
  padding: 0.3rem 0.7rem; border-radius: 4px; cursor: pointer;
}
</style>