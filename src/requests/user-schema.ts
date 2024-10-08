import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  password: z.string().optional(),
  username: z.string(),
  email: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
