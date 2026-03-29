<template>
  <section class="py-24 animate-fade-up">
    <UContainer class="max-w-7xl">
      <div class="text-center mb-20">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4 uppercase text-gray-900 dark:text-white">Experience</h2>
        <div class="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="space-y-12 max-w-5xl mx-auto">
        <div v-for="(job, index) in experience" :key="index" class="relative group">
          <!-- Timeline line -->
          <div v-if="index !== experience.length - 1" class="absolute left-4 md:left-8 top-16 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 group-hover:bg-primary/30 transition-colors duration-500"></div>
          
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-12">
            <!-- Period Column -->
            <div class="relative pt-2">
              <div class="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                <div class="w-8 h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-primary flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                </div>
                <div class="text-sm font-bold uppercase tracking-widest text-primary dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-500">
                  {{ job.period }}
                </div>
              </div>
            </div>

            <!-- Content Column -->
            <UCard class="glass-effect border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-[2rem] overflow-hidden">
              <div class="p-2 md:p-4">
                <div class="flex flex-col mb-6">
                  <h3 class="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                    {{ job.role }}
                  </h3>
                  <div class="text-gray-600 dark:text-gray-400 font-semibold text-lg flex items-center gap-2">
                    <UIcon name="i-lucide-building-2" class="w-5 h-5 text-primary/70" />
                    {{ job.company }}
                  </div>
                </div>
                
                <p class="text-base text-gray-600 dark:text-gray-400 mb-8 font-normal leading-relaxed italic opacity-80">
                  {{ job.description }}
                </p>

                <ul class="grid grid-cols-1 gap-4">
                  <li v-for="(highlight, hIndex) in job.highlights" :key="hIndex" class="flex gap-4 text-sm md:text-base">
                    <div class="mt-1 flex-shrink-0">
                      <UIcon name="i-lucide-check-circle-2" class="w-5 h-5 text-primary" />
                    </div>
                    <span class="text-gray-700 dark:text-gray-300 font-medium leading-snug">{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Job {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

defineProps<{
  experience: Job[]
}>()
</script>
