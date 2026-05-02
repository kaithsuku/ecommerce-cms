import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const categorySchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().optional().nullable()
});

export const productSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().optional().nullable(),
  price: z.coerce.number().nonnegative(),
  stock: z.coerce.number().int().nonnegative(),
  status: z.enum(["active", "draft", "archived"]).default("active"),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  category_id: z.string().optional().nullable()
});

export const orderStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"])
});

export function parseBody(schema, body) {
  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      ok: false,
      error: {
        error: "Validation failed",
        details: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      }
    };
  }

  return { ok: true, data: result.data };
}

