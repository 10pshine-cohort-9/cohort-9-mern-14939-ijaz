import { z } from "zod";

export const createNoteSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
  })
  .strict();

export const updateNoteSchema = createNoteSchema.partial().strict().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Request body cannot be empty; at least one field is required" },
);

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
