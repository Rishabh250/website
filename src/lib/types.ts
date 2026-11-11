import type { z } from "zod";
import type { siteSchema, brandSchema, categorySchema, productSchema, blockSchema, postSchema } from "./schema";

export type Site = z.infer<typeof siteSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = Omit<z.infer<typeof productSchema>, "images" | "sizes" | "features"> & {
  images: string[];
  sizes: string[];
  features: string[];
};
export type Block = z.infer<typeof blockSchema>;
export type Post = z.infer<typeof postSchema>;
