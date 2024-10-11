import "./style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { setupI18n } from "@/plugins/I18n";
import { useCounterStore } from "@/store/counter.js";
import InitApp from "./plugins";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
const store = useCounterStore();
const i18n = setupI18n(store);

app.use(i18n);
app.use(InitApp);

app.mount("#app");
