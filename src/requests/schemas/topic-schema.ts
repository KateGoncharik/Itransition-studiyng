import { z } from "zod";

export const TopicSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
);

export type AllTopicsType = z.infer<typeof TopicSchema>;
