<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <p>Order ID: {{ id }}</p>
  </div>
</template>

<script>
export default {
  name: "OrderDetails",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.order-details {
}
</style>
