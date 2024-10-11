import router from "@/router";
import PrimeInit from "./PrimeVue";
import VueDatePicker from "./DatePicker";

import { VsxIcon } from "vue-iconsax";
import Tooltip from "primevue/tooltip";

import VueCookies from "vue-cookies";
import axiosClient from "@/helpers/http.helper";



export default {
  install: function (app) {
    app.use(router);
    app.use(VueCookies);
    PrimeInit.install(app);
    // component
    app.component("VueDatePicker", VueDatePicker);
    app.component("VsxIcon", VsxIcon);

    window.axios = axiosClient;
    app.directive("tooltip", Tooltip);
  },
};
