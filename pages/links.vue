<template>
  <UContainer class="py-16 md:py-32 max-w-7xl animate-fade-up">
    <!-- Header Section -->
    <div class="max-w-4xl mb-16 relative">
      <div class="absolute -top-12 -left-12 w-32 h-32 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none" />
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 tracking-tight">
        Useful <span class="text-primary-500">Links</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
        A curated collection of digital artifacts, technical insights, and creative resources discovered across the web.
      </p>
    </div>

    <!-- Filter Bar -->
    <div class="mb-12 p-8 glass-morphism rounded-[2rem] border border-gray-300/60 dark:border-white/5 relative overflow-hidden backdrop-blur-xl">
      <div class="absolute top-0 right-0 p-4 opacity-10">
        <UIcon name="i-lucide-filter" class="w-16 h-16" />
      </div>
      
      <div class="flex flex-col gap-6 relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-8 h-[1px] bg-primary-500" />
          <span class="text-xs font-bold uppercase tracking-[0.3em] text-primary-500">Filter by Technology</span>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button
            v-for="tag in allTags"
            :key="tag"
            class="group relative px-6 py-2.5 rounded-xl transition-all duration-300 overflow-hidden"
            :class="[
              selectedTag === tag 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                : 'bg-white/5 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-gray-800/60 border border-white/10'
            ]"
            @click="toggleTag(tag)"
          >
            <span class="relative z-10 font-bold text-sm tracking-wide">{{ tag }}</span>
            <div v-if="selectedTag === tag" class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-50" />
          </button>
          
          <button
            v-if="selectedTag"
            class="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm"
            @click="selectedTag = null"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Masonry Layout -->
    <div v-if="filteredLinks.length" class="columns-1 md:columns-2 lg:columns-3 gap-8">
      <LinkCard
        v-for="(link, index) in filteredLinks"
        :key="link.url"
        :link="link"
        class="animate-fade-up"
        :style="{ animationDelay: `${(index + 1) * 100}ms` }"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-32 glass-morphism rounded-[3rem] border-2 border-dashed border-white/10">
      <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center mb-6 border border-white/5 relative">
        <div class="absolute inset-0 rounded-full border border-primary-500/20 animate-ping" />
        <UIcon name="i-lucide-search" class="w-10 h-10 text-gray-400" />
      </div>
      <h3 class="text-2xl font-bold mb-2">No fragments found</h3>
      <p class="text-gray-500 max-w-xs text-center">Try adjusting your filters to find what you're looking for.</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
interface Link {
  title: string;
  description: string;
  url: string;
  platform: string;
  publishedAt: string;
  tags: string[];
}

const { data: staticLinksRecord } = await useAsyncData("static-links", () => queryCollection("links").first());
const { data: mediumLinksRecord } = await useAsyncData("medium-links", () => queryCollection("mediumLinks").first());

const allLinks = computed(() => {
  const staticItems = Array.isArray(staticLinksRecord.value?.links) ? staticLinksRecord.value!.links : [];
  const mediumItems = Array.isArray(mediumLinksRecord.value?.links) ? mediumLinksRecord.value!.links : [];
  const merged = [...staticItems, ...mediumItems];
  return merged.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
});

const selectedTag = ref<string | null>(null);

const allTags = computed(() => {
  const tags = new Set<string>();
  allLinks.value.forEach((link) => {
    link.tags?.forEach((tag: any) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

const filteredLinks = computed(() => {
  if (!selectedTag.value) return allLinks.value;
  return allLinks.value.filter((link) => link.tags?.includes(selectedTag.value!));
});

function toggleTag(tag: string) {
  if (selectedTag.value === tag) {
    selectedTag.value = null;
  } else {
    selectedTag.value = tag;
  }
}

useHead({
  title: "Useful Links",
  meta: [{ name: "description", content: "A curated list of articles, resources, and insights." }],
});
</script>
