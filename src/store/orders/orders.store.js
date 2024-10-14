import { defineStore } from "pinia";
import { initializeState } from "@/helpers/store.helper";
import ordersServices from "@/services/orders/orders.services.js";
import orderStatusService from "@/services/orders/order.status.services.js";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: {
      records: [],
      meta: {},
      ...initializeState(),
    },
    orderStatus: {
      records: [],
      meta: {},
      ...initializeState(),
    },
  }),
  actions: {
    getOrders: async function (params) {
      this.orders.uiFlags = { ...this.orders.uiFlags, isLoading: true };
      try {
        const data = await ordersServices.getOrders(params);
        this.orders.records = data.data.items.reverse();
        this.orders.meta = {
          page: data.data.page,
          perPage: data.data.perPage,
          totalPages: data.data.totalPages,
          totalItems: data.data.totalItems,
        };
        return true;
      } catch (error) {
        console.log("err", error);
        return false;
      } finally {
        this.orders.uiFlags = { ...this.orders.uiFlags, isLoading: false };
      }
    },
    getOrderStatus: async function (params) {
      this.orderStatus.uiFlags = {
        ...this.orderStatus.uiFlags,
        isLoading: true,
      };
      try {
        const data = await orderStatusService.getStatus(params);
        this.orderStatus.records = data.data.items;
        this.orderStatus.meta = {
          page: data.data.page,
          perPage: data.data.perPage,
          totalPages: data.data.totalPages,
          totalItems: data.data.totalItems,
        };
        return true;
      } catch (error) {
        console.log("err", error);
        return false;
      } finally {
        this.orderStatus.uiFlags = {
          ...this.orderStatus.uiFlags,
          isLoading: false,
        };
      }
    },
  },
});
