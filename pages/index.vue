<template>
  <div v-if="cv" class="pb-24">
    <!-- Hero Section -->
    <HeroSection
      :name="cv.name"
      :title="cv.title"
      :summary="cv.summary"
      :avatar="cv.avatar"
      :github="cv.github"
      :twitter="cv.twitter"
      :linkedin="cv.linkedin"
      :email="cv.email"
    />

    <UContainer class="max-w-7xl mt-12 md:mt-24 space-y-32">
      <!-- Experience -->
      <ExperienceSection :experience="cv.experience" />

      <!-- Skills (What I do) -->
      <SkillsSection :skills="cv.skills" />

      <!-- Education -->
      <EducationSection :education="cv.education" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import EducationSection from "~/components/home/EducationSection.vue";
import ExperienceSection from "~/components/home/ExperienceSection.vue";
import HeroSection from "~/components/home/HeroSection.vue";
import SkillsSection from "~/components/home/SkillsSection.vue";

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

const { data: cv } = (await useAsyncData("cv-data", () => queryCollection("cv").first())) as { data: Ref<CV | null> };

useSeoMeta({
  title: "Home",
  description: cv.value?.tagline || "",
  ogTitle: "John (.W.) Wambugu | Senior Software Engineer",
  ogDescription: cv.value?.tagline || "",
});

useSchemaOrg([
  definePerson({
    name: cv.value?.name,
    image: cv.value?.avatar,
    jobTitle: cv.value?.title,
    description: cv.value?.summary,
    url: "https://waw3ru.onrender.com",
    sameAs: [cv.value?.github, cv.value?.linkedin, cv.value?.twitter].filter(Boolean) as string[],
  }),
]);
</script>

<style lang="scss" scoped>
// Page specific overrides if needed
</style>
