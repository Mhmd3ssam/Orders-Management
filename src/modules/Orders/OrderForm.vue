<template>
  <div class="flex-wrapper">
    <h2 class="text-2xl font-bold mb-6 text-center">Create New Order</h2>
    <form class="form">
      <div>
        <TextInput
          v-model="order.product_name"
          label="Product Name"
          id="product_name"
          :helperMessage="errors.product_name"
          @validate="validateproduct_name"
        />
      </div>
      <div>
        <NumberInput
          v-model="order.price"
          label="Price"
          id="price"
          :min="0"
          :step="1"
          prefix="$"
          :helperMessage="errors.price"
          @validate="validatePrice"
        />
      </div>
      <div>
        <CounterInput
          v-model="order.quantity"
          label="Quantity"
          id="quantity"
          :min="0"
          :max="100"
          :step="1"
          :helperMessage="errors.quantity"
          @validate="validateQuantity"
        />
      </div>
      <div>
        <SelectInput
          v-model="order.status"
          label="Select order status"
          id="status"
          :options="orderStatusOptions"
          :helperMessage="errors.status"
          @validate="validateStatus"
        />
      </div>
      <div class="flex-wrapper">
        <CustomButton
          icon="pi pi-check"
          label="Save Order"
          severity="contrast"
          size="large"
          :loading="addOrder.isCreating"
          @click="handleSubmit"
        />
        <CustomButton
          label="Back"
          :to="{ name: 'orders-list' }"
          severity="secondary"
          size="large"
        />
      </div>
    </form>
    <div v-if="submissionMessage" class="mt-4 text-center text-green-600">
      {{ submissionMessage }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { required, minValue, minLength } from "@vuelidate/validators";
import { useOrdersStore } from "@/store/orders/orders.store.js";
import useVuelidate from "@vuelidate/core";
import Button from "primevue/button";
import { mapState, mapActions } from "pinia";
import { useRouter } from "vue-router";

export default {
  name: "OrderForm",
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const order = ref({
      product_name: "",
      quantity: null,
      price: null,
      status: null,
    });
    const rules = {
      product_name: { required, minLength: minLength(3) },
      quantity: { required, minValue: minValue(1) },
      price: { required, minValue: minValue(0) },
      status: { required },
    };

    const v$ = useVuelidate(rules, order);
    const submitted = ref(false);
    const errors = ref({
      product_name: "",
      quantity: "",
      price: "",
      status: "",
    });
    const validateProductName = (isValid) => {
      if (!isValid) {
        errors.value.product_name = isValid
          ? ""
          : "Product name is required and must be at least 3 characters long.";
      } else {
        errors.value.product_name = "";
      }
    };

    const validatePrice = (isValid) => {
      if (!isValid) {
        errors.value.price =
          "Price is required and must be a non-negative number.";
      } else {
        errors.value.price = "";
      }
    };

    const validateQuantity = (isValid) => {
      if (!isValid) {
        errors.value.quantity = "Quantity is required ";
      } else {
        errors.value.quantity = "";
      }
    };

    const validateStatus = (isValid) => {
      if (!isValid) {
        errors.value.status = "Please select order status";
      } else {
        errors.value.status = "";
      }
    };

    const loading = ref(false);
    const submissionMessage = ref("");

    const handleSubmit = async () => {
      submitted.value = true;
      v$.value.$touch();

      if (v$.value.$invalid) {
        validateProductName(!v$.value.product_name.$invalid);
        validatePrice(!v$.value.price.$invalid);
        validateQuantity(!v$.value.quantity.$invalid);
        validateStatus(!v$.value.status.$invalid);
        return;
      }

      loading.value = true;
      try {
        const orderData = {
          product_name: order.value.product_name,
          quantity: order.value.quantity,
          price: order.value.price,
          status: order.value.status,
        };

        const result = await useOrdersStore().addOrder(orderData);

        if (result.isCreated) {
          submissionMessage.value = "Order created successfully!";
          router.push({ name: "orders-list" });
        } else {
          submissionMessage.value = "Failed to create order. Please try again.";
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        submissionMessage.value =
          "An error occurred while creating the order. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    return {
      order,
      v$,
      errors,
      loading,
      submissionMessage,
      handleSubmit,
      validateProductName,
      validatePrice,
      validateQuantity,
      validateStatus,
    };
  },
  computed: {
    ...mapState(useOrdersStore, ["orderStatus", "addOrder"]),
    orderStatusOptions() {
      return this.orderStatus.records.map((status) => ({
        label: status.status,
        value: status.id,
      }));
    },
  },
  methods: {
    ...mapActions(useOrdersStore, ["getOrderStatus", "addOrder"]),
  },
  async created() {
    await this.getOrderStatus();
    console.log("addOrder", this.addOrder.uiFlags);
  },
};
</script>

<style scoped>
.flex-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80vw;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80vw;
}
</style>
