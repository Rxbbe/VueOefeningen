import { defineStore } from "pinia";
import { ref } from "vue";

export const useJokeStore = defineStore("joke", () => {
  const joke = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function getJoke() {
    loading.value = true;
    joke.value = null;
    error.value = null;

    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();
      joke.value = data.value;
    } catch (err) {
      error.value = "Fout bij het ophalen van de grap: " + err.message;
    } finally {
      loading.value = false;
    }
  }

  return { joke, loading, error, getJoke };
});