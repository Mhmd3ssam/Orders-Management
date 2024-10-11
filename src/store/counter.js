import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const lang = ref("en");

  function increment() {
    count.value++;
  }

  function toggleLang() {
    lang.value = lang.value === "en" ? "ar" : "en";
  }


  return { count,lang, increment, toggleLang };
});
