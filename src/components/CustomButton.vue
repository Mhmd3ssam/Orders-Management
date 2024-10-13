<template>
  <Button
    :label="label"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    :severity="severity"
    :to="!!to"
    :as="as"
    :size="size"
    fluid
    @click="handleClick"
  />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";

export default defineComponent({
  name: "CustomButton",
  components: {
    Button,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    severity: {
      type: String,
      default: null,
      validator: (value) =>
        ["secondary", "success", "info", "warning", "help", "danger"].includes(
          value
        ),
    },
    to: {
      type: [String, Object],
      default: null,
    },
    as: {
      type: String,
      validator: (value) => ["a", "success", "router-link"].includes(value),
    },
    size: {
      type: String,
      validator: (value) => ["small", "large"].includes(value),
    },
  },
  setup(props) {
    const router = useRouter();

    const handleClick = (event) => {
      if (props.to) {
        router.push(props.to);
      }
    };

    return {
      handleClick,
    };
  },
});
</script>
