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
      :rowsData="orders.records"
      :metadata="orders.meta"
      :onPageChange="handlePageChange"
    >
      <template #id="{ data }">
        <TextLink :text="data.id" :path="`/orders/${data.id}`" />
      </template>
      <template #status="{ data }">
        <OrderStatus :status="getStatusText(data.status)" />
      </template>
      <template #created="{ data }">
        <DateFormatter :date="data.created" :showBoth="true" />
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useOrdersStore } from "@/store/orders/orders.store.js";
import { formatDateTime } from "@/helpers/date.helper.js";

export default {
  name: "Orders",
  data() {
    return {
      selectedDate: null,
      selectedStatus: null,
    };
  },

  computed: {
    ...mapState(useOrdersStore, ["orders", "orderStatus"]),
    headLabels: () => [
      { header: "Order No.", field: "id" },
      { header: "Created at", field: "created" },
      { header: "Product Name", field: "product_name" },
      { header: "Quantity", field: "quantity" },
      { header: "Price", field: "price" },
      { header: "Status", field: "status" },
    ],
    orderStatusOptions() {
      return this.orderStatus.records.map((status) => ({
        label: status.status,
        value: status.id,
      }));
    },
    filterQuery() {
      let conditions = [];
      if (this.selectedStatus) {
        conditions.push(`status='${this.selectedStatus}'`);
      }
      if (this.selectedDate) {
        const formattedDate = this.formatDate(this.selectedDate);
        conditions.push(`created='${formattedDate}'`);
      }
      return conditions.length > 0 ? `(${conditions.join(" && ")})` : "";
    },
  },
  methods: {
    ...mapActions(useOrdersStore, ["getOrders", "getOrderStatus"]),
    handlePageChange(page) {
      this.fetchOrders(page);
    },
    updateSelectedStatus(newValue) {
      this.selectedStatus = newValue;
      this.fetchOrders();
    },
    updateSelectedDate(newValue) {
      this.selectedDate = newValue;
      this.fetchOrders();
    },
    formatDate(date) {
      return date ? date.toISOString().split("T")[0] : "";
    },
    getStatusText(statusId) {
      const status = this.orderStatus.records.find((s) => s.id === statusId);
      return status ? status.status : "Unknown";
    },
    async fetchOrders(page = 1) {
      const params = new URLSearchParams();
      if (this.filterQuery) {
        params.append("filter", this.filterQuery);
      }
      params.append("page", page.toString());
      params.append("perPage", 5);
      await this.getOrders(params);
    },
  },
  async created() {
    await this.getOrderStatus();
    await this.fetchOrders();
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
