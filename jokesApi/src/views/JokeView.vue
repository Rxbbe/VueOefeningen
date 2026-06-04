<script setup>
import { useJokeStore } from "@/stores/joke";
const jokeStore = useJokeStore();
</script>

<template>
  <button @click="jokeStore.getJoke" :disabled="jokeStore.loading">
    Fetch Chuck Norris Joke
  </button>

  <p v-if="jokeStore.loading">Loading joke...</p>
  <p v-else-if="jokeStore.error">{{ jokeStore.error }}</p>
  <p v-else-if="jokeStore.joke">{{ jokeStore.joke }}</p>
</template>