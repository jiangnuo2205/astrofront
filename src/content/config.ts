// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional()
  })
});

export const collections = {
  'news': newsCollection,
};