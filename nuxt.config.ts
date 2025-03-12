// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/globals.css"],
  build: {
    transpile: ["trpc-nuxt"],
  },

  compatibilityDate: "2025-03-12",
  modules: ["@nuxtjs/tailwindcss"],
});
