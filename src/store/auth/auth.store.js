import auth from "@/services/auth/auth.services";

import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false
  }),
  getters: {},
  actions: {
    login: async function (obj) {
      this.isLoading = true;
      try {
        const { data } = await auth.login(obj);
        console.log("data", data)
        this.token = data.token;
        this.user = data.admin.email;
        this.isAuthenticated = true 

        window.$cookies.set("token", this.token, "2d");
        window.$cookies.set("user", JSON.stringify(this.user), "2d");
        await router.push({ name: "orders-list" });
    
      } catch (error) {
        console.log(error);
        this.isAuthenticated = false 
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
          const data = await auth.getMe();
          window.$cookies.set("user", JSON.stringify(data.data.admin.email), "2d");
          window.$cookies.set("token", JSON.stringify(data.data.token), "2d");

          const user = window.$cookies.get("user");
          const token = window.$cookies.get("token");
          
          this.token = token;
          this.user = user;
          this.isAuthenticated = true 
        }
      } catch (error) {
        console.log(error);
        this.isAuthenticated = false 
      } finally {
        this.isLoading = false;
      }
    },
  },
});
