<template>
  <section class="py-24 animate-fade-up">
    <UContainer class="max-w-7xl">
      <div class="text-center mb-20">
        <h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">Academic Foundation</h2>
        <h2 class="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white">Education</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <UCard v-for="(edu, index) in education" :key="index" class="text-center glass-effect border-0 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[3rem] group">
          <div class="p-4">
            <div class="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <UIcon name="i-lucide-graduation-cap" class="w-12 h-12 text-primary" />
            </div>
            <h3 class="font-bold text-xl mb-3 font-display tracking-tight group-hover:text-primary transition-colors">{{ edu.degree }}</h3>
            <div class="text-primary font-bold mb-6 text-lg tracking-tight">{{ edu.institution }}</div>
            <div class="inline-block px-6 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 dark:border-gray-700">
              {{ edu.year }}
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Education {
  institution: string
  degree: string
  year: string
}

defineProps<{
  education: Education[]
}>()
</script>
