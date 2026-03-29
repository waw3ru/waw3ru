<template>
  <div
    v-if="cv"
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-body relative overflow-x-hidden transition-colors duration-500"
  >
    <!-- Background Decorative Blobs -->
    <div class="bg-blob top-[-10%] left-[-10%] animate-float pointer-events-none"></div>
    <div
      class="bg-blob bottom-[10%] right-[-10%] animate-float pointer-events-none"
      style="animation-delay: -5s; background: radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)"
    ></div>
    <div class="bg-blob top-[40%] right-[20%] animate-float pointer-events-none" style="animation-delay: -10s; width: 300px; height: 300px; opacity: 0.1"></div>

    <!-- Floating Glass Header -->
    <header class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl transition-all duration-500 ease-in-out">
      <nav class="glass-effect rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl border-white/20 dark:border-white/10">
        <div class="font-signature text-2xl md:text-3xl font-bold tracking-tight text-primary hover:scale-105 transition-transform duration-300">
          <NuxtLink to="/">&lt;J.W. /&gt;</NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-10">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-xs font-black uppercase tracking-[0.2em] hover:text-primary transition-all relative py-1 group"
            :exact-active-class="'text-primary'"
            data-rybbit-event="nav_link_click"
            :data-rybbit-prop-label="item.label"
            :data-rybbit-prop-path="item.path"
            data-rybbit-prop-source="desktop_header"
          >
            {{ item.label }}
            <span
              class="absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-300 pointer-events-none"
              :class="route.path === item.path ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </NuxtLink>
        </div>

        <!-- Actions: Theme & Mobile -->
        <div class="flex items-center gap-2">
          <ClientOnly>
            <UButton color="gray" variant="ghost" aria-label="Toggle Theme" class="rounded-full hover:bg-primary/10 transition-colors" @click="toggleColorMode">
              <UIcon :name="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" class="w-5 h-5" />
            </UButton>
          </ClientOnly>

          <UButton color="gray" variant="ghost" class="md:hidden rounded-full hover:bg-primary/10" @click="isMenuOpen = true">
            <UIcon name="i-lucide-menu" class="w-6 h-6" />
          </UButton>
        </div>
      </nav>
    </header>

    <!-- Fancy Mobile Menu Overlay -->
    <USlideover
      v-model="isMenuOpen"
      side="right"
      :ui="{
        width: 'max-w-xs',
        background: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl',
      }"
    >
      <div class="p-8 flex flex-col h-full relative overflow-hidden">
        <!-- Decoration in drawer -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>

        <div class="flex items-center justify-between mb-16 relative z-10">
          <div class="font-signature text-3xl font-bold text-primary">&lt;J.W. /&gt;</div>
          <UButton color="gray" variant="ghost" icon="i-lucide-x" class="rounded-full" @click="isMenuOpen = false" />
        </div>

        <div class="flex flex-col gap-10 relative z-10">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-4xl font-display font-extrabold hover:text-primary transition-all transform hover:translate-x-2"
            active-class="text-primary translate-x-2"
            data-rybbit-event="nav_link_click"
            :data-rybbit-prop-label="item.label"
            :data-rybbit-prop-path="item.path"
            data-rybbit-prop-source="mobile_menu"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <div class="mt-auto pt-10 border-t border-gray-200 dark:border-gray-800 relative z-10">
          <div class="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Let's Connect</div>
          <div class="flex gap-4">
            <UButton
              :to="cv.github"
              target="_blank"
              color="gray"
              variant="soft"
              icon="i-lucide-github"
              class="rounded-full w-12 h-12 flex items-center justify-center p-0"
              data-rybbit-event="contact_click"
              data-rybbit-prop-platform="github"
              data-rybbit-prop-location="mobile_menu"
            />
            <UButton
              :to="cv.linkedin"
              target="_blank"
              color="gray"
              variant="soft"
              icon="i-lucide-linkedin"
              class="rounded-full w-12 h-12 flex items-center justify-center p-0"
              data-rybbit-event="contact_click"
              data-rybbit-prop-platform="linkedin"
              data-rybbit-prop-location="mobile_menu"
            />
            <UButton
              :to="cv.twitter"
              target="_blank"
              color="gray"
              variant="soft"
              icon="i-simple-icons-x"
              class="rounded-full w-12 h-12 flex items-center justify-center p-0"
              data-rybbit-event="contact_click"
              data-rybbit-prop-platform="twitter"
              data-rybbit-prop-location="mobile_menu"
            />
            <UButton
              :to="'mailto:' + cv.email"
              color="gray"
              variant="soft"
              icon="i-lucide-mail"
              class="rounded-full w-12 h-12 flex items-center justify-center p-0"
              data-rybbit-event="contact_click"
              data-rybbit-prop-platform="email"
              data-rybbit-prop-location="mobile_menu"
            />
          </div>
        </div>
      </div>
    </USlideover>

    <main class="flex-grow flex flex-col pt-32 pb-20">
      <slot />
    </main>

    <!-- Reach Out Section - Enhanced with glassmorphism -->
    <section class="py-20 md:py-32 relative overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 dark:bg-primary/10 -skew-y-3 transform origin-right"></div>
      <UContainer class="max-w-5xl relative z-10">
        <div
          class="glass-effect rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border-white/20 dark:border-white/5 shadow-2xl animate-fade-up"
        >
          <div class="flex-1 text-center md:text-left">
            <h2 class="text-5xl md:text-6xl font-display font-black mb-6 tracking-tight">Reach Out <span class="text-primary italic">to me!</span></h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-10 font-light leading-relaxed">
              Discuss a project or just want to say hi? My Inbox is open for all.
            </p>

            <div class="flex flex-col gap-4 mb-10">
              <div class="text-xl font-bold flex items-center justify-center md:justify-start gap-3 text-gray-800 dark:text-gray-200">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UIcon name="i-lucide-map-pin" class="w-6 h-6 text-primary" />
                </div>
                {{ cv.location }}
              </div>
              <div class="flex items-center justify-center md:justify-start gap-4">
                <span class="flex h-3 w-3 relative">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span class="text-sm font-black uppercase tracking-widest text-gray-500">Available for Opportunities</span>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <UButton
                :to="cv.github"
                target="_blank"
                color="gray"
                variant="solid"
                size="lg"
                class="rounded-full w-16 h-16 flex items-center justify-center p-0 hover:bg-primary-500 hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:rotate-6 hover:shadow-2xl dark:hover:bg-primary-500 dark:bg-gray-800 bg-white shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
                data-rybbit-event="contact_click"
                data-rybbit-prop-platform="github"
                data-rybbit-prop-location="reach_out"
              >
                <UIcon name="i-lucide-github" class="w-8 h-8" />
              </UButton>
              <UButton
                :to="cv.linkedin"
                target="_blank"
                color="gray"
                variant="solid"
                size="lg"
                class="rounded-full w-16 h-16 flex items-center justify-center p-0 hover:bg-primary-500 hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:-rotate-6 hover:shadow-2xl dark:hover:bg-primary-500 dark:bg-gray-800 bg-white shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
                data-rybbit-event="contact_click"
                data-rybbit-prop-platform="linkedin"
                data-rybbit-prop-location="reach_out"
              >
                <UIcon name="i-lucide-linkedin" class="w-8 h-8" />
              </UButton>
              <UButton
                :to="cv.twitter"
                target="_blank"
                color="gray"
                variant="solid"
                size="lg"
                class="rounded-full w-16 h-16 flex items-center justify-center p-0 hover:bg-primary-500 hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:rotate-6 hover:shadow-2xl dark:hover:bg-primary-500 dark:bg-gray-800 bg-white shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
                data-rybbit-event="contact_click"
                data-rybbit-prop-platform="twitter"
                data-rybbit-prop-location="reach_out"
              >
                <UIcon name="i-simple-icons-x" class="w-8 h-8" />
              </UButton>
              <UButton
                :to="'mailto:' + cv.email"
                color="gray"
                variant="solid"
                size="lg"
                class="rounded-full w-16 h-16 flex items-center justify-center p-0 hover:bg-primary-500 hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl dark:hover:bg-primary-500 dark:bg-gray-800 bg-white shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
                data-rybbit-event="contact_click"
                data-rybbit-prop-platform="email"
                data-rybbit-prop-location="reach_out"
              >
                <UIcon name="i-lucide-mail" class="w-8 h-8" />
              </UButton>
            </div>
          </div>
          <div class="flex-1 flex justify-center">
            <div class="relative group">
              <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-colors duration-700 animate-pulse"></div>
              <NuxtImg
                :src="cv.avatar"
                :alt="cv.name"
                class="relative w-80 h-80 object-cover rounded-[3rem] border-4 border-white dark:border-gray-800 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <footer class="py-20 bg-gray-50 dark:bg-gray-900 text-center relative z-10 transition-colors">
      <div class="mb-12 opacity-30 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent w-4/5 mx-auto"></div>

      <p class="text-2xl md:text-2xl font-display font-black mb-6 text-gray-800 dark:text-gray-200 tracking-tight">
        Crafted with way too much
        <span class="text-primary italic">caffeine</span> ☕️
      </p>

      <div
        class="inline-flex flex-wrap justify-center items-center gap-4 px-8 py-3 rounded-full glass-effect border border-white/20 dark:border-white/5 shadow-xl hover:shadow-primary-500/5 transition-all duration-500"
      >
        <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">&copy; {{ new Date().getFullYear() }}</span>
        <span class="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/20"></span>
        <span class="text-[10px] font-black uppercase tracking-widest text-primary/80">Stalking my code? I like your style 😏💻</span>
      </div>

      <p class="mt-8 text-[9px] text-gray-400 font-medium uppercase tracking-[0.2em] opacity-50">All Rights Reserved (and some wrongs too) 🤫</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();
const isMenuOpen = ref(false);

interface CV {
  name: string;
  title: string;
  avatar: string;
  tagline: string;
  email: string;
  location: string;
  github: string;
  twitter: string;
  linkedin: string;
  summary: string;
  skills: any[];
  experience: any[];
  education: any[];
}

const { data: cv } = (await useAsyncData("cv-nav", () => queryCollection("cv").first())) as { data: Ref<CV | null> };

const navItems = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Links", path: "/links" },
];

const toggleColorMode = () => {
  const newMode = colorMode.preference === "dark" ? "light" : "dark";
  colorMode.preference = newMode;
  if ((window as any).rybbit) {
    (window as any).rybbit.event("theme_changed", { to_mode: newMode });
  }
};
</script>
