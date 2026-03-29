<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Main app entry
useSeoMeta({
  titleTemplate: "%s | John (.W.) Wambugu",
  ogSiteName: "John (.W.) Wambugu",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@waw3ru",
})

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
})
</script>
