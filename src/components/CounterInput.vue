<template>
  <div class="flex-auto">
    <FloatLabel variant="on">
      <label :for="id" class="font-bold block mb-2">{{ label }}</label>
      <InputNumber
        v-model="internalValue"
        @blur="onBlur"
        @input="updateValue"
        :invalid="isInvalid"
        :id="id"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        :mode="mode"
        :prefix="prefix"
        :suffix="suffix"
        :minFractionDigits="minFractionDigits"
        :maxFractionDigits="maxFractionDigits"
        fluid
        showButtons
        buttonLayout="horizontal"
        class="counter-input"
        style="border-radius: 0%"
      >
        <template #incrementbuttonicon class="buttons">
          <span class="pi pi-plus" />
        </template>
        <template #decrementbuttonicon>
          <span class="pi pi-minus buttons" />
        </template>
      </InputNumber>
    </FloatLabel>
  </div>
  <small
    v-if="!!helperMessage"
    :id="id"
    :style="{ color: isInvalid ? 'red' : '' }"
    class="p-helpermessage"
  >
    {{ helperMessage }}
  </small>
</template>

<script>
import { ref, watch, computed } from "vue";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";

export default {
  name: "CounterInput",
  components: { InputNumber, FloatLabel },
  props: {
    modelValue: Number,
    label: String,
    helperMessage: String,
    id: String,
    disabled: Boolean,
    min: Number,
    max: Number,
    step: Number,
    mode: {
      type: String,
      default: "decimal",
      validator: (value) => ["decimal", "currency"].includes(value),
    },
    prefix: String,
    suffix: String,
    minFractionDigits: Number,
    maxFractionDigits: Number,
  },
  emits: ["update:modelValue", "blur", "validate"],
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue);
    const touched = ref(false);

    const isInvalid = computed(() => {
      return (
        touched.value &&
        (internalValue.value === null || internalValue.value === undefined)
      );
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        internalValue.value = newValue;
      }
    );

    function updateValue(event) {
      internalValue.value = event.value;
      emit("update:modelValue", event.value);
      validateInput();
    }

    function onBlur() {
      touched.value = true;
      validateInput();
      emit("blur");
    }

    function validateInput() {
      const isValid = !(touched.value && !!internalValue.value === false);
      emit("validate", isValid);
    }

    return { internalValue, updateValue, onBlur, isInvalid };
  },
};
</script>

<style scoped>
.p-inputnumber {
  display: inline-flex;
  position: static;
}
.buttons {
  border-radius: 0;
}
</style>
