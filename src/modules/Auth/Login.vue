<template>
  <div class="flex-wrapper">
    <h1>Orders Management</h1>
    <form @submit.prevent="handleLogin" class="form">
      <div>
        <EmailInput
          v-model="email"
          label="Email"
          id="email"
          @validate="validateEmail"
          :helperMessage="emailError"
        />
      </div>
      <div>
        <TextInput
          v-model="password"
          label="Password"
          id="password"
          type="password"
          @validate="validatePassword"
          :helperMessage="passwordError"
        />
      </div>
      <Button type="submit" label="Login" />
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth/auth.store";
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref("");
    const password = ref("");
    const emailError = ref("");
    const passwordError = ref("");

    const validateEmail = (isValid) => {
      emailError.value = isValid ? "" : "Please enter a valid email address";
    };

    const validatePassword = (isValid) => {
      passwordError.value = isValid ? "" : "Password is required";
    };

    const handleLogin = async () => {
      if (email.value && password.value) {
        try {
          await authStore.login({
            identity: email.value,
            password: password.value,
          });
          router.push({ name: "orders-list" });
        } catch (error) {
          console.error("Login failed:", error);
        }
      } else {
        validateEmail(email.value);
        validatePassword(password.value);
      }
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      validateEmail,
      validatePassword,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.flex-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80vw;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80vw;
}
</style>
