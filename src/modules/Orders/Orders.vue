<template>
  <div class="orders">
    <div class="header">
      <div class="filters">
        <Calendar
          :modelValue="selectedDate"
          @update:modelValue="updateSelectedDate"
          placeholder="Select Date"
        />
        <SelectInput
          :modelValue="selectedStatus"
          @update:modelValue="updateSelectedStatus"
          id="status"
          :options="orderStatusOptions"
          placeholder="Select Status"
          @blur="filterOrders"
        />
      </div>
      <div class="actions">
        <CustomButton
          label="Create Order"
          :to="{ name: 'order-create' }"
          severity="contrast"
          icon="pi pi-plus"
          size="large"
        />
      </div>
    </div>
    <DataTable
      :headLabels="headLabels"
      :rowsData="filteredRowsData"
      :metadata="metadata"
      :onPageChange="handlePageChange"
    />
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      headLabels: [
        { header: "Product Name", field: "product_name" },
        { header: "Quantity", field: "quantity" },
        { header: "Price", field: "price" },
        { header: "Status", field: "status" },
      ],
      rowsData: [
        {
          id: 1,
          product_name: "Product 1",
          quantity: 5,
          status: "Pending",
          price: 10,
          createdAt: "2024-10-10",
        },
        {
          id: 2,
          product_name: "Product 2",
          quantity: 5,
          status: "Paid",
          price: 10,
          createdAt: "2023-09-25",
        },
        {
          id: 3,
          product_name: "Product 3",
          quantity: 5,
          status: "Canceled",
          price: 10,
          createdAt: "2023-09-15",
        },
        {
          id: 4,
          product_name: "Product 1",
          quantity: 5,
          status: "Pending",
          price: 10,
          createdAt: "2023-08-11",
        },
        {
          id: 5,
          product_name: "Product 2",
          quantity: 5,
          status: "Paid",
          price: 10,
          createdAt: "2023-07-30",
        },
        {
          id: 6,
          product_name: "Product 3",
          quantity: "user3@example.com",
          status: "Canceled",
          price: 10,
          createdAt: "2023-06-20",
        },
      ],
      filteredRowsData: [],
      metadata: {
        total: 9,
        pages: 1,
        perPage: 4,
        currentPage: 1,
        lastPage: 1,
      },
      selectedDate: null,
      selectedStatus: null,
      orderStatusOptions: [
        { label: "Pending", value: "Pending" },
        { label: "Paid", value: "Paid" },
        { label: "Canceled", value: "Canceled" },
      ],
    };
  },
  mounted() {
    this.filteredRowsData = this.rowsData;
  },
  methods: {
    handlePageChange(page) {
      console.log("Page changed to:", page);
    },
    updateSelectedStatus(newValue) {
      this.selectedStatus = newValue;
      this.filterOrders();
    },

    filterOrders() {
      console.log("selectedStatus", this.selectedStatus);
      this.filteredRowsData = this.rowsData.filter((row) => {
        const matchesStatus = this.selectedStatus
          ? row.status === this.selectedStatus
          : true;
        const matchesDate = this.selectedDate
          ? new Date(row.createdAt).toDateString() ===
            new Date(this.selectedDate).toDateString()
          : true;
        return matchesStatus && matchesDate;
      });
    },
    updateSelectedDate(newValue) {
      this.selectedDate = newValue;
      this.filterOrders();
    },
  },
};
</script>

<style scoped>
.orders {
  width: 80vw;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
}

.actions {
  display: flex;
  align-items: center;
}
</style>
