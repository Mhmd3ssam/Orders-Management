<template>
  <div class="order-details">
    <div class="order_card">
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
          >
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span class="text-surface-700 dark:text-surface-0">{{
              item.label
            }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
    <Card class="order_card">
      <template #title> Order Details </template>
      <template #content>
        <p class="m-0">Product Name: {{ order.record.product_name || "-" }}</p>
        <p class="m-0">Price : {{ order.record.price || "-" }}</p>
        <p class="m-0">Quantity: {{ order.record.quantity || "-" }}</p>
        <p class="m-0">
          Status: <OrderStatus :status="getStatusText(order.record.status)" />
        </p>
        <p class="m-0">
          Created at:
          <DateFormatter :date="order.record.created" />
        </p>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import { mapState, mapActions } from "pinia";
import { useOrdersStore } from "@/store/orders/orders.store.js";

export default {
  name: "OrderDetails",
  components: {
    Card,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      home: {
        icon: "pi pi-home",
        route: "/orders",
      },
      items: [{ label: "Orders", route: "/orders" }],
    };
  },
  computed: {
    ...mapState(useOrdersStore, ["order", "orderStatus"]),
  },
  methods: {
    ...mapActions(useOrdersStore, ["getOrder", "getOrderStatus"]),
    getStatusText(statusId) {
      const status = this.orderStatus.records.find((s) => s.id === statusId);
      return status ? status.status : "Unknown";
    },
  },
  async created() {
    await this.getOrder(this.id);
    await this.getOrderStatus();
    console.log("order", this.order);
  },
};
</script>

<style scoped>
.order-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: antiquewhite;
}
.order_card {
  width: 40%;
}
.p-breadcrumb {
  background-color: transparent;
  padding: 10px;
}
</style>
