// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.scss"],

  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/css/_variables.scss";',
            },
        },
    },
},
  
  modules: ['nuxt-icon', 'nuxt-lodash'],
})
