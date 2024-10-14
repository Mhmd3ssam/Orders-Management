<template>
  <router-view />
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/store/auth/auth.store";
export default {
  async created() {
    await this.login({
      identity: "mohamedammar.essam95@gmail.com",
      password: "1234567890",
    });
  },

  methods: {
    ...mapActions(useAuthStore, ["login"]),
  },
};
</script>
