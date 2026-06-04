import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // Lijst met bestaande accounts
  const users = ref([
    { username: "Jan", email: "jan@pxl.be", password: "geheim123" },
    { username: "Sara", email: "sara@pxl.be", password: "wachtwoord" },
    { username: "Robbe", email: "robbe@pxl.be", password: "vue2026" },
  ]);

  // De ingelogde gebruiker (null = niemand ingelogd)
  const user = ref(null);

  // Getter: is er iemand ingelogd?
  const isLoggedIn = computed(() => user.value !== null);

  // Action: inloggen
  function login(email, password) {
    const found = users.value.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      user.value = found;
      localStorage.setItem("user", JSON.stringify(found));
      return true; // gelukt
    }
    return false; // mislukt
  }

  // Action: uitloggen
  function logout() {
    user.value = null;
    localStorage.removeItem("user");
  }

  // Bij het aanmaken van de store: ingelogde gebruiker uit localStorage halen
  function initialize() {
    const saved = localStorage.getItem("user");
    if (saved) {
      user.value = JSON.parse(saved);
    }
  }

  initialize();

  return { users, user, isLoggedIn, login, logout };
});