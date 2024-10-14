<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth/auth.store";

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(async () => {
      const isAuthenticated = await authStore.checkAuth();
      console, l;
      router.push({ name: "orders-list" });
      if (isAuthenticated) {
        router.push({ name: "orders-list" });
      } else {
        router.push({ name: "login" });
      }
    });
  },
};
</script>
