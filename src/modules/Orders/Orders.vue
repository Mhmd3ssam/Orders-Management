<script>
export default {
  name: "Orders",
  data() {
    return {
      headLabels: [
        { header: "ID", field: "id" },
        { header: "Name", field: "name" },
        { header: "Email", field: "email" },
      ],
      rowsData: [
        { id: 1, name: "User 1", email: "user1@example.com" },
        { id: 2, name: "User 2", email: "user2@example.com" },
        { id: 3, name: "User 3", email: "user3@example.com" },
        { id: 4, name: "User 1", email: "user1@example.com" },
        { id: 5, name: "User 2", email: "user2@example.com" },
        { id: 7, name: "User 3", email: "user3@example.com" },
      ],
      metadata: {
        total: 9,
        pages: 1,
        perPage: 2,
        currentPage: 1,
        lastPage: 1,
      },
    };
  },
};
</script>

<template>
  <div class="orders">
    <DataTable
      :tableLabel="'Orders Lis'"
      :headLabels="headLabels"
      :rowsData="rowsData"
      :metadata="metadata"
      :onPageChange="handlePageChange"
    />
  </div>
</template>

<style scoped>
.orders {
  width: 80vw;
}
</style>
