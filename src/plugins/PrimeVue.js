import { definePreset, palette } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";

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
    app.directive("ripple", Ripple);
  },
};
