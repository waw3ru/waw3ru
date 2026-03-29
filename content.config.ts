import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.string(),
        tags: z.array(z.string()),
        category: z.string(),
        cover: z.string(),
      }),
    }),
    cv: defineCollection({
      type: "data",
      source: "cv.json",
      schema: z.object({
        name: z.string(),
        title: z.string(),
        avatar: z.string(),
        tagline: z.string(),
        email: z.string(),
        location: z.string(),
        github: z.string(),
        twitter: z.string(),
        linkedin: z.string(),
        summary: z.string(),
        skills: z.array(z.any()),
        experience: z.array(z.any()),
        education: z.array(z.any()),
      }),
    }),
    links: defineCollection({
      type: "data",
      source: "links.json",
      schema: z.object({
        links: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            url: z.string(),
            platform: z.string(),
            publishedAt: z.string(),
            tags: z.array(z.string()),
          }),
        ),
      }),
    }),
    mediumLinks: defineCollection({
      type: "data",
      source: "medium-links.json",
      schema: z.object({
        links: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            url: z.string(),
            platform: z.string(),
            publishedAt: z.string(),
            tags: z.array(z.string()),
          }),
        ),
      }),
    }),
  },
});
