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
    addOrder: {
      ...initializeState(),
    },
    order: {
      record: {},
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
    addOrder: async function (data) {
      this.addOrder.uiFlags = { ...this.addOrder.uiFlags, isCreating: true };
      try {
        const response = await ordersServices.addOrder(data);
        if (response && response.data) {
          return {
            isCreated: true,
            data: response.data,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          isCreated: false,
        };
      } finally {
        this.addOrder.uiFlags = { ...this.addOrder.uiFlags, isCreating: false };
      }
    },
    getOrder: async function (orderId) {
      this.order.uiFlags.isLoading = true;
      try {
        const data = await ordersServices.getOrder(orderId);
        this.order.record = data.data;
        return true;
      } catch (error) {
        return false;
      } finally {
        this.order.uiFlags.isLoading = false;
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
