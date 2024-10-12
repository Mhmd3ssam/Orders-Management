import { createRouter, createWebHistory } from "vue-router";
import ordersRoute from "@/modules/Orders/orders.route.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        default: () => import("@/modules/Orders/WrapperOrders.vue"),
      },
      redirect: { name: "orders-list" },
      children: [...ordersRoute.routes],
    },
  ],
});

export default router;
