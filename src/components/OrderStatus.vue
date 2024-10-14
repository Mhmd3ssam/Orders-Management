<template>
  <Badge :value="status" :severity="severity" />
</template>

<script>
import Badge from "primevue/badge";

export default {
  name: "OrderStatus",
  components: {
    Badge,
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    severity() {
      switch (this.status.toLowerCase()) {
        case "pending":
          return "warn";
        case "paid":
          return "success";
        case "canceled":
          return "danger";
        default:
          return "info";
      }
    },
  },
};
</script>
