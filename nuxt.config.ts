import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "nuxt-vuefire", "nuxt-studio", "@nuxtjs/seo"],

  site: {
    url: "https://waw3ru.onrender.com",
    name: "John (.W.) Wambugu",
    description: "Senior Software Engineer specializing in building scalable web applications and digital experiences.",
    defaultLocale: "en",
    ogImage: "/og-image.png",
  },

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
    families: [{ name: "Outfit", weights: [400, 600, 700, 800, 900] }, { name: "Inter", weights: [400, 500, 600, 700] }, { name: "Caveat", weights: [400, 700] }],
  },

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          src: "https://app.rybbit.io/api/script.js",
          "data-site-id": "5e26bf8298ec",
          defer: true,
        },
      ],
    },
  },

  // Environment-specific overrides
  $production: {
    studio: false,
  },

  compatibilityDate: "2024-04-03",
});
