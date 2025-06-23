// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  components: false,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['./src/assets/css/main.css'],
  watch: ['~/src'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/icon'
  ],
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL
    }
  },
})
