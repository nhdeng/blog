import { defineCollection,z } from 'astro:content';

const schema = z.object({
  isDraft: z.boolean(),
  sortOrder: z.number().optional(),
  title: z.string(),
  desc: z.string(),
  tags: z.array(z.string()),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  author: z.string().default('dengnanhao'),
  footnote: z.string().optional(),
  publishDate: z.string(),
  authorContact: z.string().email().default('dengnanhao@163.com'),
})

const blogCollection = defineCollection({
  schema,
});
export const collections = {
    'blog': blogCollection,
};