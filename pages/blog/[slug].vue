<template>
  <article v-if="post" class="pb-12 md:pb-24 animate-fade-up">
    <!-- Hero Header -->
    <div class="relative w-full h-[40vh] md:h-[60vh] bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <NuxtImg 
        v-if="post.cover" 
        :src="post.cover" 
        :alt="post.title"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      
      <UContainer class="relative h-full flex flex-col justify-end pb-12 z-10">
        <div class="max-w-3xl">
          <div class="flex flex-wrap items-center gap-3 mb-6">
            <UBadge color="gray" variant="solid" class="bg-white/10 backdrop-blur text-white border-white/20">
              {{ new Date(post.publishedAt).toLocaleDateString() }}
            </UBadge>
            <div class="hidden sm:flex flex-wrap gap-2">
              <UBadge v-for="tag in post.tags" :key="tag" color="primary" variant="subtle" class="bg-primary-500/20 text-primary-200 backdrop-blur border-none font-medium">
                {{ tag }}
              </UBadge>
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4 drop-shadow-lg">
            {{ post.title }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 font-light drop-shadow">
            {{ post.description }}
          </p>
        </div>
      </UContainer>
    </div>

    <!-- Content -->
    <UContainer class="mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <!-- Main Content -->
        <main class="lg:col-span-3 prose prose-lg dark:prose-invert prose-img:rounded-xl prose-a:text-primary max-w-none">
          <ContentRenderer :value="post" />
        </main>
        
        <!-- Sidebar -->
        <aside class="space-y-8">
          <UCard class="sticky top-24 pt-4 border-none shadow-none ring-1 hidden lg:block">
            <h3 class="font-display font-bold text-xl mb-4">Topics</h3>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="tag in post.tags" :key="tag" color="gray" variant="subtle" size="md">
                {{ tag }}
              </UBadge>
            </div>
          </UCard>
        </aside>
      </div>

      <!-- Other Posts -->
      <div class="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
        <h2 class="text-3xl font-display font-bold mb-8">Related Reads</h2>
        <div v-if="relatedPosts?.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogCard v-for="related in relatedPosts" :key="related.id" :post="related" />
        </div>
      </div>
    </UContainer>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()

// Fetch main post based on slug (which is matching the path for Nuxt Content v3)
// Wait, nuxt content next API has the path match the original path it was sourced from without extension
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () => {
  return queryCollection('blog').path(`/blog/${route.params.slug}`).first()
})

// Fetch related posts excluding current via stem (slug)
const { data: relatedPosts } = await useAsyncData(`related-${route.params.slug}`, () => {
  return queryCollection('blog')
    .where('stem', '<>', route.params.slug as string)
    .limit(3)
    .all()
})

useSeoMeta({
  title: post.value?.title || "Blog Post",
  description: post.value?.description || "",
  ogTitle: post.value?.title,
  ogDescription: post.value?.description,
  ogImage: post.value?.cover,
  articlePublishedTime: post.value?.publishedAt,
  author: "John (.W.) Wambugu",
})

useSchemaOrg([
  defineArticle({
    headline: post.value?.title,
    description: post.value?.description,
    image: post.value?.cover,
    datePublished: post.value?.publishedAt,
    author: [
      {
        name: "John (.W.) Wambugu",
        url: "https://waw3ru.vercel.app",
      },
    ],
  }),
])
</script>
