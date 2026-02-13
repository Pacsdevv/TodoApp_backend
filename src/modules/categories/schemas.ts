import z from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "The name must be at least 2 characters long")
      .max(100, "The name cannot exceed 100 characters"),
    description: z
      .string()
      .max(500, "The description cannot exceed 500 characters")
      .optional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, {
        message: "The color must be a valid hex code such as: #RRGGBB",
      })
      .optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "The name must be at least 2 characters long")
      .max(100, "The name cannot exceed 100 characters")
      .optional(),
    description: z
      .string()
      .max(500, "The description cannot exceed 500 characters")
      .optional(),
    color: z
      .string()
      .regex(
        /^#[0-9A-Fa-f]{6}$/,
        "The color must be a valid hex code such as: #RRGGBB"
      )
      .optional(),
  }),
});
