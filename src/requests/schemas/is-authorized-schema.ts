import { z } from "zod";

export const isAuthorizedSchema = z.object({
  isAuthorized: z.boolean(),
});

export type IsAuthorized = z.infer<typeof isAuthorizedSchema>;
