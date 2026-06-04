<script setup>
import { ref } from "vue";
import MovieItem from "@/components/MovieItem.vue";

const movies = ref([
  { id: 1, title: "Inception", year: 2010, reviews: [] },
  { id: 2, title: "The Matrix", year: 1999, reviews: [] },
  { id: 3, title: "Interstellar", year: 2014, reviews: [] },
]);

function addReview({ id, text }) {
  const movie = movies.value.find((m) => m.id === id);
  if (movie) {
    movie.reviews.push(text);
  }
}
</script>

<template>
  <header class="page-header">
    <span class="eyebrow">Now Showing</span>
    <h1>Films &amp; Reviews</h1>
    <p class="sub">Jouw persoonlijke filmlijst</p>
  </header>

  <MovieItem
    v-for="movie in movies"
    :key="movie.id"
    :movie="movie"
    @add-review="addReview"
  />
</template>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.eyebrow {
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 0.35em;
  font-size: 0.85rem;
  color: var(--gold);
  text-transform: uppercase;
}
.page-header h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: 3.5rem;
  letter-spacing: 0.04em;
  line-height: 1;
  margin: 0.3rem 0;
}
.sub {
  color: var(--text-muted);
  font-size: 0.95rem;
}
</style>