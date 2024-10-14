import { createRouter, createWebHistory } from "vue-router";
import ordersRoute from "@/modules/Orders/orders.route.js";
import { useAuthStore } from "@/store/auth/auth.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/modules/Auth/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      component: () => import("@/modules/Orders/WrapperOrders.vue"),
      redirect: { name: "orders-list" },
      meta: {
        requiresAuth: true,
      },
      children: [...ordersRoute.routes],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log("authStore", authStore)
  console.log("to", to)
  console.log("next", next)

  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "orders-list" });
  } else {
    next();
  }
});

export default router;
