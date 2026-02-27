import { z } from "zod";

export const createTodoSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, "Title is required").max(255),
      description: z.string().max(500).optional(),
      completed: z.boolean().optional(),
      category_id: z.number().int().positive().optional(),
    })
    .strict(),
});

export const updateTodoSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, "Title is required").max(255).optional(),
      description: z.string().max(500).optional(),
      completed: z.boolean().optional(),
      category_id: z.number().int().positive().optional().nullable(),
    })
    .strict(),
});
