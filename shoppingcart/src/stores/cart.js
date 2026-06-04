import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {

    const coupons = {
    SAVE10: 0.10,
    SAVE20: 0.20,
    PXL50: 0.50,
    };
    
    const items = ref([
        { id: 1, title: "Mok", price: 7.50, added: false },
        { id: 2, title: "T-shirt", price: 19.99 , added: false },
        { id: 3, title: "Stickerpack", price: 4.00 , added: false },
    ]);

    const coupon = ref("");
    const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  );

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  const discount = computed(() => {
    const percentage = coupons[coupon.value] || 0; // onbekende code → 0%
    return subtotal.value * percentage;
  });

  const total = computed(() => subtotal.value - discount.value);

  // --- Actions ---
  function add(id) {
    const item = items.value.find((i) => i.id === id);
    if (item) item.qty++;
  }

  function remove(id) {
    const item = items.value.find((i) => i.id === id);
    if (item) item.qty = 0;
  }

  function setQty(id, qty) {
    const item = items.value.find((i) => i.id === id);
    if (item) item.qty = Math.max(0, qty); // nooit onder 0
  }

  function applyCoupon(code) {
    coupon.value = code;
  }

  // --- localStorage (uitbreiding) ---
  function initialize() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const data = JSON.parse(saved);
      items.value = data.items;
      coupon.value = data.coupon;
    }
  }
  initialize();

  // Bij elke wijziging opslaan (deep, want qty zit genest in objecten)
  watch(
    [items, coupon],
    () => {
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: items.value, coupon: coupon.value })
      );
    },
    { deep: true }
  );

  return { items, coupon, count, subtotal, discount, total, add, remove, setQty, applyCoupon };
});