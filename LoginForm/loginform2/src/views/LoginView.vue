<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");

function handleLogin() {
  error.value = "";

  const success = authStore.login(email.value, password.value);

  if (!success) {
    error.value = "Ongeldige e-mail of wachtwoord.";
    return;
  }

  // Velden leegmaken na succesvolle login
  email.value = "";
  password.value = "";
}

function handleLogout() {
  authStore.logout();
}
</script>

<template>
  <div class="login-card">
    <!-- Wel ingelogd: welkomstboodschap + logout -->
    <div v-if="authStore.isLoggedIn">
      <h2>Welkom, {{ authStore.user.username }}</h2>
      <button class="btn" @click="handleLogout">Log out</button>
    </div>

    <!-- Niet ingelogd: het formulier -->
    <form v-else @submit.prevent="handleLogin">
      <h2>Inloggen</h2>

      <input v-model="email" type="email" placeholder="E-mail" />
      <input v-model="password" type="password" placeholder="Wachtwoord" />

      <p v-if="error" class="error">{{ error }}</p>

      <button class="btn" type="submit">Log in</button>
    </form>
  </div>
</template>

<style scoped>
.login-card {
  max-width: 340px;
  margin: 3rem auto;
  padding: 1.75rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}
.error {
  color: #dc3545;
  font-size: 0.9rem;
  margin: 0;
}
</style>