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
  <v-card class="mb-4" elevation="2">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>{{ movie.title }}</span>
      <v-chip color="primary" size="small">{{ movie.year }}</v-chip>
    </v-card-title>

    <v-card-subtitle>
      {{ movie.reviews.length }}
      {{ movie.reviews.length === 1 ? "review" : "reviews" }}
    </v-card-subtitle>

    <v-card-text>
      <v-list v-if="movie.reviews.length" density="compact">
        <v-list-item
          v-for="(review, index) in movie.reviews"
          :key="index"
          prepend-icon="mdi-star"
        >
          {{ review }}
        </v-list-item>
      </v-list>
      <p v-else class="text-medium-emphasis font-italic">
        Nog geen reviews — wees de eerste.
      </p>

      <div class="d-flex ga-2 mt-3">
        <v-text-field
          v-model="newReview"
          :placeholder="placeholder"
          :error-messages="error"
          hide-details="auto"
          density="comfortable"
          @keyup.enter="submitReview"
        />
        <v-btn
          color="primary"
          :disabled="isTooShort"
          @click="submitReview"
        >
          Plaats
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>