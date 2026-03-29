import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "nuxt-vuefire", "nuxt-studio"],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "dark-plus",
            dark: "material-theme",
            sepia: "nord",
          },
        },
      },
    },
  },

  vuefire: {
    // Replace with your Firebase project config from the Firebase console
    config: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    },
  },

  colorMode: {
    preference: "dark",
  },

  fonts: {
    families: [{ name: "Syne", weights: [400, 700, 800] }, { name: "DM Sans" }, { name: "Caveat", weights: [400, 700] }],
  },

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Environment-specific overrides
  $production: {
    studio: false,
  },

  compatibilityDate: "2024-04-03",
});
