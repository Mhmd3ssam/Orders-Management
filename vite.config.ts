import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import Components from "unplugin-vue-components/vite";

// font
import webfontDownload from "vite-plugin-webfont-dl";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      VueDevTools(),
      Components({
        resolvers: [PrimeVueResolver()],
      }),
      webfontDownload(
        [
          "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          "https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap",
        ],
        {
          injectAsStyleTag: true,
          minifyCss: true,
          async: true,
          cache: true,
          proxy: false,
        }
      ),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    define: {
      "import.meta.env": {
        ...env,
      },
    },
    base: "/",
    build: {
      target: "esnext",
      outDir: "dist",
      assetsDir: "",
      sourcemap: mode === "development",
      minify: mode !== "development",
    },

    optimizeDeps: {
      include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
    },
  };
});
