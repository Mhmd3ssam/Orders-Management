<template>
  <FloatLabel variant="on">
    <label :for="id">{{ label }}</label>
    <Dropdown
      v-model="internalValue"
      :options="options"
      optionLabel="label"
      optionValue="value"
      @blur="onBlur"
      @change="updateValue"
      :class="{ 'p-invalid': isInvalid }"
      :placeholder="placeholder"
      :disabled="disabled"
      :id="id"
      showClear
      fluid
    />
  </FloatLabel>
  <small
    v-if="!!helperMessage"
    :id="id + '-helper'"
    :style="{ color: isInvalid ? 'red' : '' }"
    class="p-helpermessage"
  >
    {{ helperMessage }}
  </small>
</template>

<script>
import { ref, watch, computed } from "vue";
import Dropdown from "primevue/dropdown";
import FloatLabel from "primevue/floatlabel";

export default {
  name: "SelectInput",
  components: { Dropdown, FloatLabel },
  props: {
    modelValue: [String, Number],
    label: String,
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
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
      return touched.value && !internalValue.value && props.options.length > 0;
    });

    watch(internalValue, (newValue) => {
      emit("update:modelValue", newValue);
    });

    function updateValue(event) {
      internalValue.value = event.value;
      validateInput();
    }

    function onBlur() {
      touched.value = true;
      validateInput();
      emit("blur");
    }

    function validateInput() {
      const isValid = !(
        touched.value &&
        !internalValue.value &&
        props.options.length > 0
      );
      emit("validate", isValid);
    }

    return { internalValue, updateValue, onBlur, isInvalid };
  },
};
</script>

<style scoped>
.p-select {
  position: static;
  padding: 10px;
}
</style>
