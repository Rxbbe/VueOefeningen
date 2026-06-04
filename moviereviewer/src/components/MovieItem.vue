<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  movie: { type: Object, required: true },
  placeholder: { type: String, default: "Schrijf een review..." },
  minLength: { type: Number, default: 3 },
});

const emit = defineEmits(["add-review"]);

const newReview = ref("");
const error = ref("");

const isTooShort = computed(() => newReview.value.trim().length < props.minLength);

function submitReview() {
  if (newReview.value.trim() === "") {
    error.value = "Een review mag niet leeg zijn.";
    return;
  }
  emit("add-review", { id: props.movie.id, text: newReview.value.trim() });
  newReview.value = "";
  error.value = "";
}
</script>

<template>
  <article class="movie">
    <div class="movie-head">
      <h2>{{ movie.title }}</h2>
      <span class="year">{{ movie.year }}</span>
    </div>

    <div class="count">
      <span class="dot"></span>
      {{ movie.reviews.length }} {{ movie.reviews.length === 1 ? "review" : "reviews" }}
    </div>

    <ul class="reviews" v-if="movie.reviews.length">
      <li v-for="(review, index) in movie.reviews" :key="index">
        <span class="star">★</span>{{ review }}
      </li>
    </ul>
    <p v-else class="empty">Nog geen reviews — wees de eerste.</p>

    <div class="add-review">
      <input
        v-model="newReview"
        :placeholder="placeholder"
        @keyup.enter="submitReview"
      />
      <button @click="submitReview" :disabled="isTooShort">Plaats</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </article>
</template>

<style scoped>
.movie {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.movie:hover {
  transform: translateY(-3px);
  border-color: var(--gold);
}

.movie-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}
.movie-head h2 {
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.9rem;
  letter-spacing: 0.03em;
  font-weight: 400;
}
.year {
  font-family: "Bebas Neue", sans-serif;
  font-size: 0.95rem;
  color: var(--gold);
  border: 1px solid var(--gold);
  border-radius: 999px;
  padding: 0.1rem 0.7rem;
  white-space: nowrap;
}

.count {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0.4rem 0 1rem;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--gold);
}

.reviews {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.1rem;
}
.reviews li {
  background-color: var(--surface-2);
  border-radius: 8px;
  padding: 0.6rem 0.85rem;
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.star {
  color: var(--gold);
}
.empty {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 1.1rem;
}

.add-review {
  display: flex;
  gap: 0.5rem;
}
.add-review input {
  flex: 1;
  background-color: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 0.85rem;
  color: var(--text);
  font-family: inherit;
  font-size: 0.92rem;
}
.add-review input::placeholder {
  color: var(--text-muted);
}
.add-review input:focus {
  outline: none;
  border-color: var(--gold);
}
.add-review button {
  background-color: var(--gold);
  color: #1a140e;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.3rem;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.add-review button:hover:not(:disabled) {
  background-color: var(--gold-soft);
}
.add-review button:disabled {
  background-color: var(--border);
  color: var(--text-muted);
  cursor: not-allowed;
}

.error {
  color: var(--danger);
  font-size: 0.85rem;
  margin-top: 0.6rem;
}
</style>