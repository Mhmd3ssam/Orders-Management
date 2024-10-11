import { createI18n } from "vue-i18n";
import { watch } from 'vue';

import ar from "@/locale/ar";
import en from "@/locale/en";

const messages = {
  en,
  ar,
};

export function setupI18n(store) {
  const i18n = createI18n({
    legacy: false,
    locale: store.lang, 
    fallbackLocale: "en",
    globalInjection: true,
    messages,
  });

  watch(() => store.lang, (newLang) => {
    i18n.global.locale.value = newLang;
  });

  return i18n;
}