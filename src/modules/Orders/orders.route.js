export default {
  routes: [
    {
      path: "/orders",
      name: "orders-list",
      component: () => import("./Orders.vue"),
      meta: {
        title: "Orders",
      },
    },
    {
      path: "/orders/create",
      name: "order-create",
      component: () => import("./OrderForm.vue"),
      meta: {
        title: "Create Order",
      },
    },
    {
      path: "/orders/:id",
      name: "order-details",
      component: () => import("./OrderDetails.vue"),
      props: true,
      meta: {
        title: "Order Details",
      },
    },
  ],
};
