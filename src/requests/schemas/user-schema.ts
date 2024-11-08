import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  password: z.string(),
  username: z.string(),
  email: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
