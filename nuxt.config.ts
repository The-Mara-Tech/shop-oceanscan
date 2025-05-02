// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    '@pinia/nuxt'  // Add Pinia module
  ],
  nitro: {
    preset: 'firebase'
  }
})
