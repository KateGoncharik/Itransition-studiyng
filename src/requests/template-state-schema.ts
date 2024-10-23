import { z } from "zod";

const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  isRequired: z.boolean(),
  isShown: z.boolean(),
  answerType: z.string(),
});
export const StoredTemplateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  user_id: z.number(),
  topic_id: z.number(),
  questions: z.array(QuestionSchema),
});

export type QuestionType = z.infer<typeof QuestionSchema>;
export type StoredTemplateType = z.infer<typeof StoredTemplateSchema>;
