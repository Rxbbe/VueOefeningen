<script setup>
import { ref } from "vue";
import MovieItem from "@/components/MovieItem.vue";

const movies = ref([
  { id: 1, title: "Inception", year: 2010, reviews: ["Mind-blowing"] },
  { id: 2, title: "The Matrix", year: 1999, reviews: [] },
  { id: 3, title: "Interstellar", year: 2014, reviews: ["Prachtig", "Lang maar goed"] },
]);

function addReview({ id, text }) {
  const movie = movies.value.find((m) => m.id === id);
  if (movie) {
    movie.reviews.push(text);
  }
}
</script>

<template>
  <v-container max-width="700">
    <h1 class="text-h4 mb-6">Mijn filmlijst</h1>

    <MovieItem
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      @add-review="addReview"
    />
  </v-container>
</template>