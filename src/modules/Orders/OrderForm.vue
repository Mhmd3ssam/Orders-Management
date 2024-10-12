<template>
  <div class="order-form">
    <h1>Create / Edit Order</h1>
    <form @submit.prevent="submitOrder">
      <div>
        <label for="order-title">Order Title</label>
        <input v-model="order.title" id="order-title" type="text" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  data() {
    return {
      order: {
        title: "",
      },
    };
  },
  methods: {
    submitOrder() {
      console.log("Order submitted:", this.order);
    },
  },
};
</script>

<style scoped>
.order-form {
}
</style>
