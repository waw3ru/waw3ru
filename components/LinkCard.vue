<template>
  <div class="futuristic-card glass-morphism rounded-3xl p-7 mb-8 flex flex-col group border border-gray-300/60 dark:border-white/[0.03] hover:border-primary-500/20 transition-all duration-500 break-inside-avoid shadow-sm hover:shadow-xl hover:shadow-primary-500/5">
    <!-- Platform Icon & Badge -->
    <div class="flex items-center justify-between mb-6">
      <div class="p-3 rounded-2xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
        <UIcon :name="platformIcon" class="w-6 h-6" />
      </div>
      <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
        {{ link.platform }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex-grow">
      <h3 class="text-xl font-bold font-display mb-3 leading-tight group-hover:text-primary-500 transition-colors duration-300">
        {{ link.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {{ link.description }}
      </p>
    </div>

    <!-- Tags -->
    <div v-if="link.tags?.length" class="flex flex-wrap gap-2 mb-8">
      <span 
        v-for="tag in link.tags" 
        :key="tag" 
        class="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-primary-500/5 text-primary-600 dark:text-primary-400 border border-primary-500/10"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 mt-auto">
      <div class="flex flex-col">
        <span class="text-[10px] uppercase tracking-wider text-gray-400">Published</span>
        <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">
          {{ formattedDate }}
        </span>
      </div>
      
      <NuxtLink
        :to="link.url"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors group/link"
        data-rybbit-event="external_link_click"
        :data-rybbit-prop-title="link.title"
        :data-rybbit-prop-url="link.url"
        :data-rybbit-prop-platform="link.platform"
      >
        <span>Read More</span>
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
      </NuxtLink>
    </div>

    <!-- Scanline effect (subtle) -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] overflow-hidden rounded-3xl">
      <div class="w-full h-[1px] bg-primary-500 animate-[scanline_10s_linear_infinite]" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: {
    title: string
    description: string
    url: string
    platform: string
    publishedAt: string
    tags?: string[]
  }
}>()

const platformIcon = computed(() => {
  const p = props.link.platform.toLowerCase()
  if (p.includes('medium')) return 'i-lucide-book-open'
  if (p.includes('hashnode')) return 'i-lucide-newspaper'
  if (p.includes('dev.to') || p.includes('devto')) return 'i-lucide-terminal'
  if (p.includes('github')) return 'i-lucide-github'
  if (p.includes('twitter') || p.includes('x')) return 'i-simple-icons-x'
  if (p.includes('youtube')) return 'i-lucide-youtube'
  if (p.includes('linkedin')) return 'i-lucide-linkedin'
  return 'i-lucide-link-2'
})

const formattedDate = computed(() => {
  return new Date(props.link.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})
</script>

<style scoped>
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}
</style>
