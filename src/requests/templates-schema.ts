import { z } from "zod";

export const TemplateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  user_id: z.number(),
  topic_id: z.number(),
});

export type TemplateType = z.infer<typeof TemplateSchema>;
