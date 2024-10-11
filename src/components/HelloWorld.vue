<script setup lang="ts">
import { useCounterStore } from "@/store/counter.js";
import { storeToRefs } from "pinia";

defineProps<{ msg: string }>();

const store = useCounterStore();
const { count, lang } = storeToRefs(store);
const { increment, toggleLang } = store;

</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="increment">count is {{ count }}</button>
    <button type="button" @click="toggleLang">
      Current language: {{ lang }}
    </button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
}
</style>
