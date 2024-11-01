import { z } from "zod";

export const StoredFormSchema = z.object({
  id: z.number(),
  template_id: z.number(),
  user_id: z.number(),
  custom_string1: z.union([z.string(), z.null()]),
  custom_string2: z.union([z.string(), z.null()]),
  custom_string3: z.union([z.string(), z.null()]),
  custom_string4: z.union([z.string(), z.null()]),

  custom_int1: z.union([z.number(), z.null()]),
  custom_int2: z.union([z.number(), z.null()]),
  custom_int3: z.union([z.number(), z.null()]),
  custom_int4: z.union([z.number(), z.null()]),

  custom_text1: z.union([z.string(), z.null()]),
  custom_text2: z.union([z.string(), z.null()]),
  custom_text3: z.union([z.string(), z.null()]),
  custom_text4: z.union([z.string(), z.null()]),

  custom_checkbox1: z.union([z.number(), z.null()]),
  custom_checkbox2: z.union([z.number(), z.null()]),
  custom_checkbox3: z.union([z.number(), z.null()]),
  custom_checkbox4: z.union([z.number(), z.null()]),
});

export const AnswersInFormSchema = z.object({
  custom_string1: z.string(),
  custom_string2: z.string(),
  custom_string3: z.string(),
  custom_string4: z.string(),

  custom_int1: z.union([z.number(), z.string()]),
  custom_int2: z.union([z.number(), z.string()]),
  custom_int3: z.union([z.number(), z.string()]),
  custom_int4: z.union([z.number(), z.string()]),

  custom_text1: z.string(),
  custom_text2: z.string(),
  custom_text3: z.string(),
  custom_text4: z.string(),

  custom_checkbox1: z.union([z.boolean(), z.string()]),
  custom_checkbox2: z.union([z.boolean(), z.string()]),
  custom_checkbox3: z.union([z.boolean(), z.string()]),
  custom_checkbox4: z.union([z.boolean(), z.string()]),
});

export type AnswerValueType = string | number | boolean;
export type AnswersInForm = z.infer<typeof AnswersInFormSchema>;
export type StoredFormType = z.infer<typeof StoredFormSchema>;
