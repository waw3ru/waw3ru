<template>
  <section class="py-8 border-b border-gray-200 dark:border-gray-800 last:border-0 animate-fade-up">
    <h2 v-if="title" class="text-2xl font-display font-bold mb-6 text-gray-900 dark:text-gray-100">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
