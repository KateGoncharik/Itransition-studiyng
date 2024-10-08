import { z } from "zod";

// Определение схемы пользователя
export const UserSchema = z.object({
  id: z.number().optional(),
  password: z.string().optional(),
  username: z.string(),
  email: z.string().optional(),
});

// Использование z.infer для автоматической типизации
export type UserType = z.infer<typeof UserSchema>;
