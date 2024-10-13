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
import FloatLabel from "primevue/FloatLabel";

export default {
  name: "TextInput",
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
      return touched.value && internalValue.value.length === 0;
    });

    watch(internalValue, (newValue) => {
      emit("update:modelValue", newValue);
    });

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
      const isValid = !(touched.value && internalValue.value.length === 0);
      emit("validate", isValid);
    }

    return { internalValue, updateValue, onBlur, isInvalid };
  },
};
</script>

<style>
.p-floatlabel label {
  left: auto;
  padding-inline: 10px;
}

.p-inputtext {
  padding: 20px;
}
</style>
