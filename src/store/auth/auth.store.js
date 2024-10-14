import auth from "@/services/auth/auth.services";

import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    login: async function (obj) {
      this.isLoading = true;
      try {
        const { data } = await auth.login(obj);
        this.token = data.token;
        this.isAuthenticated = true;

        window.$cookies.set("token", this.token, "2d");
        await router.push({ name: "orders-list" });
      } catch (error) {
        console.log(error);
        this.isAuthenticated = false;
        return error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
    checkAuth: async function () {
      this.isLoading = true;
      try {
        const token = window.$cookies.get("token");
        if (token) {
          const { data } = await auth.getMe();
          window.$cookies.set("token", data.token, "2d");
          this.isAuthenticated = true;
          return true;
        }
      } catch (error) {
        console.log(error);
        this.isAuthenticated = false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
