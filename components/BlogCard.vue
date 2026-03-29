<template>
  <NuxtLink :to="post.path" class="block group h-full relative">
    <div class="futuristic-card glass-morphism rounded-3xl p-0 mb-8 flex flex-col group border border-gray-300/60 dark:border-white/[0.03] hover:border-primary-500/20 transition-all duration-500 break-inside-avoid shadow-sm hover:shadow-xl hover:shadow-primary-500/5 overflow-hidden">
      <!-- Cover Image -->
      <div class="relative overflow-hidden aspect-video w-full bg-gray-100 dark:bg-gray-800/50">
        <NuxtImg 
          v-if="post.cover" 
          :src="post.cover" 
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
          <UIcon name="i-lucide-image" class="w-12 h-12" />
        </div>
        
        <!-- Overlay for futuristic feel -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <!-- Content -->
      <div class="p-7 flex-grow flex flex-col">
        <!-- Tags -->
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in post.tags" 
            :key="tag" 
            class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-primary-500/5 text-primary-600 dark:text-primary-400 border border-primary-500/10"
          >
            {{ tag }}
          </span>
        </div>

        <h3 class="text-xl md:text-2xl font-bold font-display mb-3 leading-tight group-hover:text-primary-500 transition-colors duration-300">
          {{ post.title }}
        </h3>
        
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {{ post.description }}
        </p>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 mt-auto">
          <div class="flex flex-col">
            <span class="text-[10px] uppercase tracking-wider text-gray-400">Published</span>
            <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">
              {{ formattedDate }}
            </span>
          </div>
          
          <div class="flex items-center gap-2 text-sm font-bold text-primary-500 group/link">
            <span>Read More</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <!-- Scanline effect -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] overflow-hidden rounded-3xl">
        <div class="w-full h-[1px] bg-primary-500 animate-[scanline_10s_linear_infinite]" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  post: any
}>()

const formattedDate = computed(() => {
  return new Date(props.post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})
</script>

<style scoped>
/* Redundant scanline keyframes and futuristic-card styles removed as they are global */
</style>
