<template>
  <section class="py-24 animate-fade-up">
    <UContainer class="max-w-7xl">
      <div class="text-center mb-20">
        <h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3">Core Expertise</h2>
        <h2 class="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white">What I do</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="category in skills" :key="category.category" 
             class="glass-effect p-8 rounded-[3rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-white/20 dark:border-white/5 flex flex-col items-center text-center group">
          
          <div class="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br from-primary/20 to-transparent shadow-inner">
            <UIcon :name="getIcon(category.category)" class="w-10 h-10" />
          </div>

          <h3 class="text-2xl font-bold font-display mb-6 tracking-tight uppercase group-hover:text-primary transition-colors">
            {{ category.category }}
          </h3>
          
          <div class="flex flex-wrap justify-center gap-3">
            <UBadge 
              v-for="skill in category.skills" 
              :key="skill" 
              color="gray" 
              variant="solid"
              class="px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-white dark:bg-gray-950 shadow-md border border-gray-100 dark:border-gray-800 hover:border-primary-500 hover:text-primary transition-all cursor-default rounded-xl"
            >
              {{ skill }}
            </UBadge>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface SkillCategory {
  category: string
  skills: string[]
}

defineProps<{
  skills: SkillCategory[]
}>()

const getIcon = (category: string) => {
  const cat = category.toLowerCase()
  if (cat.includes('frontend')) return 'i-lucide-layout'
  if (cat.includes('backend')) return 'i-lucide-database'
  if (cat.includes('programming')) return 'i-lucide-code-2'
  if (cat.includes('devops')) return 'i-lucide-infinity'
  if (cat.includes('database')) return 'i-lucide-database'
  return 'i-lucide-wrench'
}
</script>
