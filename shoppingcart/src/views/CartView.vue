<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();

const couponInput = ref("");
const activeTab = ref("producten"); // welke tab staat open

function applyCoupon() {
  cartStore.applyCoupon(couponInput.value.trim().toUpperCase());
}

// Bij toevoegen: product toevoegen ÉN naar de winkelmand-tab springen
function handleAdd(id) {
  cartStore.add(id);
  activeTab.value = "winkelmand";
}
</script>

<template>
  <div class="cart">
    <h1>Cart Store</h1>

    <!-- Tab-knoppen -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'producten' }" @click="activeTab = 'producten'">
        Producten
      </button>
      <button :class="{ active: activeTab === 'winkelmand' }" @click="activeTab = 'winkelmand'">
        Winkelmand ({{ cartStore.count }})
      </button>
    </div>

    <!-- Tab 1: Producten -->
    <ul v-if="activeTab === 'producten'" class="items">
      <CartItem
        v-for="product in cartStore.items"
        :key="product.id"
        :item="product"
        @add="handleAdd"
        @remove="cartStore.remove"
        @setQty="(payload) => cartStore.setQty(payload.id, payload.qty)"
      />
    </ul>

    <!-- Tab 2: Winkelmand -->
    <div v-else-if="activeTab === 'winkelmand'">
      <ul class="items">
        <CartItem
          v-for="product in cartStore.items.filter((p) => p.qty > 0)"
          :key="product.id"
          :item="product"
          @add="cartStore.add"
          @remove="cartStore.remove"
          @setQty="(payload) => cartStore.setQty(payload.id, payload.qty)"
        />
      </ul>

      <div class="coupon">
        <input v-model="couponInput" placeholder="Kortingscode (bv. SAVE10)" />
        <button @click="applyCoupon">Apply</button>
      </div>

      <div class="totals">
        <p>Subtotaal: € {{ cartStore.subtotal.toFixed(2) }}</p>
        <p v-if="cartStore.discount > 0" class="discount">
          Korting: − € {{ cartStore.discount.toFixed(2) }}
        </p>
        <p class="total">
          Totaal: € {{ cartStore.total.toFixed(2) }} ({{ cartStore.count }} items)
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tabs button {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-weight: 500;
}
.tabs button.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}
.discount { color: #28a745; }
.total { font-weight: bold; }
</style>