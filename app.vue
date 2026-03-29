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
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
  twitterSite: "@waw3ru",
  twitterImage: "/og-image.png",
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
