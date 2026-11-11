import { z } from "zod";

export const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  siteUrl: z.string().url(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    region: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  geo: z.object({ lat: z.number(), lng: z.number() }),
  hours: z.array(z.object({ days: z.string(), opens: z.string(), closes: z.string() })),
  socials: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    youtube: z.string().optional(),
  }),
});

const seoSchema = z.object({ title: z.string().optional(), description: z.string().optional() });

export const brandSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  website: z.string().optional(),
  logo: z.string().optional(),
  categories: z.array(z.string()),
  featured: z.boolean(),
  seo: seoSchema.optional(),
});

export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  seo: seoSchema.optional(),
});

export const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  images: z.array(z.string()).optional(),
  priceFrom: z.number().optional(),
  priceUnit: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  features: z.array(z.string()).optional(),
  description: z.string(),
  seo: seoSchema.optional(),
});

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string() }),
  z.object({ type: z.literal("h2"), text: z.string() }),
  z.object({ type: z.literal("ul"), items: z.array(z.string()) }),
]);

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  cover: z.string(),
  date: z.string(),
  author: z.string(),
  content: z.array(blockSchema),
  seo: seoSchema.optional(),
});

/** Parse with a build-failing error naming the file (and slug when available). */
export function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown, file: string, slug?: string): T {
  const r = schema.safeParse(data);
  if (r.success) return r.data;
  const issues = r.error.issues
    .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
  throw new Error(`[data] Invalid ${file}${slug ? ` (slug "${slug}")` : ""}:\n${issues}`);
}
