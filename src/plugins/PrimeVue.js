import { definePreset, palette } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
// import { useThemeStore } from "../stores/connect/theme/theme.store"; // Import the theme store
// import { useCompanySettingsStore } from "../stores/connect/administration/company.settings.store";
// import { useAuthStore } from "../stores/auth/auth.store";

const primary = palette("#007bff");

export default {
  install: async function (app) {
    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              ...primary,
            },
          },
        }),

        options: {
          prefix: "p",
          darkModeSelector: "dark-theme",
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    });

    // Access the store within Vue app context for one-time execution
    // const themes = useThemeStore();
    // const companySettings = useCompanySettingsStore();
    // const account = useAuthStore();
    // await account.checkAuth();
    // const activeCompanyId = account.companies.find(
    //   (company) => company.is_default,
    // )?.id;
    // await companySettings.show(activeCompanyId);
    // themes.changeThemeColor(companySettings.record.system_color); // Call the store's method to change the theme color
    // Register the ripple directive globally
    app.directive("ripple", Ripple);
  },
};
