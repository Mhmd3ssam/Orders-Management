<script setup lang="ts">
import { useCounterStore } from "@/store/counter.js";
import { storeToRefs } from "pinia";
import DataTable from "./DataTable";

defineProps<{ msg: string }>();

const store = useCounterStore();
const { count, lang } = storeToRefs(store);
const { increment, toggleLang } = store;

const headLabels = [
  { header: "ID", field: "id" },
  { header: "Name", field: "name" },
  { header: "Email", field: "email" },
];

const rowsData = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" },
  { id: 3, name: "User 3", email: "user3@example.com" },
  { id: 4, name: "User 1", email: "user1@example.com" },
  { id: 5, name: "User 2", email: "user2@example.com" },
  { id: 7, name: "User 3", email: "user3@example.com" },
];

const metadata = {
  total: 9,
  pages: 1,
  perPage: 2,
  currentPage: 1,
  lastPage: 1,
};

const handlePageChange = (newPage: number) => {
  console.log("Page changed to:", newPage);
};

</script>
<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="increment">count is {{ count }}</button>
    <button type="button" @click="toggleLang">
      Current language: {{ lang }}
    </button>
  </div>

  <DataTable
    :tableLabel="'User List'"
    :headLabels="headLabels"
    :rowsData="rowsData"
    :metadata="metadata"
    :onPageChange="handlePageChange"
  />
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
