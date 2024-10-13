<template>
  <div class="flex-wrapper">
    <h2 class="text-2xl font-bold mb-6 text-center">Create New Order</h2>
    <form class="form">
      <div>
        <TextInput
          v-model="order.productName"
          label="Product Name"
          id="product-name"
          :helperMessage="errors.productName"
          @validate="validateProductName"
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
          :options="[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]"
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
import useVuelidate from "@vuelidate/core";
import Button from "primevue/button";

export default {
  name: "OrderForm",
  components: {
    Button,
  },
  setup() {
    const order = ref({
      productName: "",
      quantity: null,
      price: null,
      status: null,
    });

    const statusOptions = [
      { label: "Pending", value: "Pending" },
      { label: "Paid", value: "Paid" },
      { label: "Canceled", value: "Canceled" },
    ];

    const rules = {
      productName: { required, minLength: minLength(3) },
      quantity: { required, minValue: minValue(1) },
      price: { required, minValue: minValue(0) },
      status: { required },
    };

    const v$ = useVuelidate(rules, order);
    const submitted = ref(false);

    const errors = ref({
      productName: "",
      quantity: "",
      price: "",
      status: "",
    });

    const validateProductName = (isValid) => {
      if (!isValid) {
        errors.value.productName = "Product name is required ";
      } else {
        errors.value.productName = "";
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
        if (v$.value.productName.$invalid) {
          errors.value.productName = "Product name is required.";
        }

        if (v$.value.price.$invalid) {
          errors.value.price = "Price is required.";
        }
        if (v$.value.quantity.$invalid) {
          errors.value.quantity = "Quantity must be at least 1.";
        }

        if (v$.value.status.$invalid) {
          errors.value.status = "Order status is required.";
        }
        return;
      }

      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        submissionMessage.value = "Order created successfully!";
        order.value = {
          productName: null,
          quantity: null,
          price: null,
          status: null,
        };
        submitted.value = false;
        v$.value.$reset();
        errors.value = {
          productName: "",
          quantity: "",
          price: "",
          status: "",
        };
      }, 2000);
    };

    return {
      order,
      statusOptions,
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
