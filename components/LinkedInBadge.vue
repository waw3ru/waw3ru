<template>
  <div class="linkedin-badge-container flex justify-center items-center w-full min-h-[300px]">
    <ClientOnly>
      <!-- LinkedIn Badge Container -->
      <div :key="colorMode.value" class="badge-wrapper animate-fade-in">
        <div
          class="badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="large"
          :data-theme="colorMode.value === 'dark' ? 'dark' : 'light'"
          data-type="HORIZONTAL"
          data-vanity="waw3ru"
          data-version="v1"
        >
          <a class="badge-base__link LI-simple-link" href="https://ke.linkedin.com/in/waw3ru?trk=profile-badge"> </a>
        </div>
      </div>

      <template #fallback>
        <div class="w-full h-64 flex items-center justify-center">
          <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const triggerLinkedInRender = () => {
  if ((window as any).LI && (window as any).LI.execute) {
    (window as any).LI.execute();
  } else if ((window as any).IN && (window as any).IN.parse) {
    (window as any).IN.parse();
  } else {
    // If global objects aren't ready, try to re-run the script logic
    // by finding the already loaded script and "nudging" it or re-appending
    const script = document.getElementById("linkedin-badge-script") as HTMLScriptElement;
    if (script) {
      // Re-triggering the script by adding it again is a last resort
      // but often the only way to catch new DOM elements for this specific script
      const newScript = document.createElement("script");
      newScript.id = "linkedin-badge-script-" + Date.now();
      newScript.src = script.src;
      newScript.async = true;
      document.body.appendChild(newScript);
    }
  }
};

const loadLinkedInScript = () => {
  const existingScript = document.getElementById("linkedin-badge-script");
  if (existingScript) {
    triggerLinkedInRender();
    return;
  }

  const script = document.createElement("script");
  script.id = "linkedin-badge-script";
  script.src = "https://platform.linkedin.com/badges/js/profile.js";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    triggerLinkedInRender();
  };
  document.body.appendChild(script);
};

onMounted(() => {
  setTimeout(() => {
    loadLinkedInScript();
  }, 200);
});

// Watch for color mode changes to re-trigger rendering
watch(
  () => colorMode.value,
  () => {
    // Give Vue/Nuxt time to update the DOM with the new theme attribute
    setTimeout(() => {
      triggerLinkedInRender();
    }, 300);
  },
);
</script>

<style scoped>
.linkedin-badge-container {
  @apply rounded-[3rem] overflow-hidden transition-all duration-500;
}

/* Ensure the badge fits well and stays centered */
.badge-wrapper {
  @apply flex justify-center w-full min-h-[300px];
}

:deep(.LI-profile-badge) {
  margin: 0 auto !important;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
  border-radius: 1.5rem !important;
  transition: all 0.5s ease-in-out;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
