<template>
  <UContainer class="py-12 md:py-24 max-w-7xl animate-fade-up">
    <div class="max-w-3xl mb-16 relative">
      <h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-4 animate-fade-in">Digital Garden</h2>
      <h1 class="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold mb-6 tracking-tight leading-[1.1]">
        Technical <span class="text-primary-500 italic">Insights</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium opacity-90">
        Thoughts, tutorials, and deep dives into software engineering, architecture, and the future of web development.
      </p>
    </div>

    <!-- Masonry Layout using CSS Columns -->
    <div v-if="pending" class="columns-1 md:columns-2 lg:columns-3 gap-8">
      <!-- Skeletons -->
      <div v-for="i in 6" :key="i" class="break-inside-avoid mb-8">
        <div class="glass-effect rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 p-0">
          <USkeleton class="w-full aspect-video" />
          <div class="p-7">
            <div class="flex gap-2 mb-4">
              <USkeleton class="w-16 h-6 rounded-lg" />
              <USkeleton class="w-20 h-6 rounded-lg" />
            </div>
            <USkeleton class="w-3/4 h-8 mb-4" />
            <USkeleton class="w-full h-4 mb-2" />
            <USkeleton class="w-full h-4 mb-2" />
            <USkeleton class="w-2/3 h-4 mb-8" />
            <div class="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between">
              <USkeleton class="w-24 h-8" />
              <USkeleton class="w-20 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="posts?.length" class="columns-1 md:columns-2 lg:columns-3 gap-8">
      <BlogCard 
        v-for="(post, index) in posts" 
        :key="post.id" 
        :post="post" 
        class="animate-fade-up" 
        :style="{ animationDelay: `${(index + 1) * 100}ms` }" 
      />
    </div>

    <div v-else class="text-center py-24 glass-effect rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
      <UIcon name="i-lucide-file-text" class="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
      <p class="text-xl font-medium text-gray-500">No posts found yet. Check back soon!</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { data: posts, pending } = await useAsyncData("blog-posts", () => {
  return queryCollection("blog").order("publishedAt", "DESC").all();
});

useHead({
  title: "Blog",
  meta: [{ name: "description", content: "Thoughts, tutorials, and deep dives into software engineering." }],
});
</script>
