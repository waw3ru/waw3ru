<template>
  <section class="relative py-20 md:py-32 overflow-hidden animate-fade-up">
    <UContainer class="max-w-7xl relative z-10">
      <div class="glass-effect rounded-[3rem] p-8 md:p-16 border-white/20 dark:border-white/5 shadow-2xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-3xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white leading-[1.1]">
              Hi all, I'm <span class="text-primary italic">{{ name.split(' ')[0] }}</span> <span class="wave-emoji inline-block">👋</span>
            </h1>
            <div class="text-sm md:text-lg lg:text-xl font-display text-gray-500 dark:text-gray-400 font-bold mb-8 uppercase tracking-[0.15em] opacity-80">
              {{ title }}
            </div>
            <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-10 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {{ summary }}
            </p>
            
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-12">
              <UButton :to="github" target="_blank" color="gray" variant="solid" size="xl" class="rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-2 hover:rotate-6" data-rybbit-event="contact_click" data-rybbit-prop-platform="github" data-rybbit-prop-location="hero">
                <UIcon name="i-lucide-github" class="w-7 h-7" />
              </UButton>
              <UButton :to="linkedin" target="_blank" color="gray" variant="solid" size="xl" class="rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-2 hover:-rotate-6" data-rybbit-event="contact_click" data-rybbit-prop-platform="linkedin" data-rybbit-prop-location="hero">
                <UIcon name="i-lucide-linkedin" class="w-7 h-7" />
              </UButton>
              <UButton :to="twitter" target="_blank" color="gray" variant="solid" size="xl" class="rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-2 hover:rotate-6" data-rybbit-event="contact_click" data-rybbit-prop-platform="twitter" data-rybbit-prop-location="hero">
                <UIcon name="i-simple-icons-x" class="w-7 h-7" />
              </UButton>
              <UButton :to="'mailto:' + email" color="gray" variant="solid" size="xl" class="rounded-full w-14 h-14 flex items-center justify-center p-0 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-2 hover:rotate-6" data-rybbit-event="contact_click" data-rybbit-prop-platform="email" data-rybbit-prop-location="hero">
                <UIcon name="i-lucide-mail" class="w-7 h-7" />
              </UButton>
            </div>

            <div class="flex flex-wrap justify-center lg:justify-start gap-6">
              <UButton to="/blog" size="xl" color="primary" class="font-bold uppercase tracking-widest rounded-full px-10 py-4 shadow-2xl hover:shadow-primary-500/20 transition-all transform hover:-translate-y-1" data-rybbit-event="cta_click" data-rybbit-prop-label="read_blog" data-rybbit-prop-destination="/blog">
                Read my blog
              </UButton>
              <UButton to="/links" size="xl" color="gray" variant="ghost" class="font-bold uppercase tracking-widest rounded-full px-10 py-4 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:-translate-y-1" data-rybbit-event="cta_click" data-rybbit-prop-label="useful_links" data-rybbit-prop-destination="/links">
                Useful links
              </UButton>
            </div>
          </div>
          <div class="flex justify-center lg:justify-end hidden lg:flex">
            <div class="relative group">
              <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
              <NuxtImg :src="avatar" :alt="name" class="relative w-80 h-80 md:w-[28rem] md:h-[28rem] object-cover rounded-[4rem] border-8 border-white dark:border-gray-800 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:-rotate-3" />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  title: string
  summary: string
  avatar: string
  github: string
  twitter: string
  linkedin: string
  email: string
}>()
</script>

<style lang="scss" scoped>
@keyframes wave {
  0% { transform: rotate(0.0deg) }
  10% { transform: rotate(14.0deg) }  
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate(0.0deg) }  
  100% { transform: rotate(0.0deg) }
}
.wave-emoji {
  animation-name: wave;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
}
</style>
