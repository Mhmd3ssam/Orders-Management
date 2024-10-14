<template>
  <FloatLabel variant="on">
    <label :for="id">{{ label }}</label>
    <InputText
      v-model="internalValue"
      @blur="onBlur"
      @input="updateValue"
      :size="size"
      :invalid="isInvalid"
      :id="id"
      :disabled="disabled"
      fluid
      type="email"
    />
  </FloatLabel>
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
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";

export default {
  name: "EmailInput",
  components: { InputText, FloatLabel },
  props: {
    modelValue: String,
    label: String,
    size: {
      type: String,
      validator: (value) => ["small", "large"].includes(value),
    },
    error: Boolean,
    helperMessage: String,
    id: String,
    disabled: Boolean,
  },
  emits: ["update:modelValue", "blur", "validate"],
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue);
    const touched = ref(false);

    const isInvalid = computed(() => {
      return touched.value && !isValidEmail(internalValue.value);
    });

    watch(internalValue, (newValue) => {
      emit("update:modelValue", newValue);
    });

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function updateValue(event) {
      internalValue.value = event.target.value;
      validateInput();
    }

    function onBlur() {
      touched.value = true;
      validateInput();
      emit("blur");
    }

    function validateInput() {
      const isValid = isValidEmail(internalValue.value);
      emit("validate", isValid);
    }

    return { internalValue, updateValue, onBlur, isInvalid };
  },
};
</script>

<style scoped>
.p-floatlabel label {
  left: auto;
  padding-inline: 10px;
}

.p-inputtext {
  padding: 20px;
}
</style>
