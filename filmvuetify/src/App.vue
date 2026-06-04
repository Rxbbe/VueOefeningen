<script setup>
import { useTheme } from "vuetify";
import MovieList from "@/views/MovieList.vue";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" title="Films & Reviews">
      <v-spacer />
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme" />
    </v-app-bar>

    <v-main>
      <MovieList />
    </v-main>
  </v-app>
</template>

<script>
import MovieList from "@/views/MovieList.vue";
export default { components: { MovieList } };
</script>