import Auth from "@/services/auth/auth.services";

import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
  }),
  getters: {},
  actions: {
    login: async function (obj) {
      this.isLoading = true;
      try {
        const { data } = await Auth.login(obj);
        this.token = data.data.token;
        this.user = data.data.user;

        window.$cookies.set("token", this.token, "2d");
        window.$cookies.set("user", JSON.stringify(this.user), "2d");
        await router.push({ name: "dashboard" });
      } catch (error) {
        console.log(error);

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
          const { data } = await Auth.getMe();

          window.$cookies.set("user", JSON.stringify(data.data.user), "2d");
          const user = window.$cookies.get("user");

          this.token = token;
          this.user = user;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    logoutAccount: async function () {
      try {
        this.isLoading = true;
        await Auth.logout();
        window.$cookies.remove("user");

        window.$cookies.remove("token");
        await router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
