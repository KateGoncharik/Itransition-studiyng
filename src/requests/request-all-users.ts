import { getUrl } from "./get-url.ts";
import { UserSchema, UserType } from "./user-schema.ts";

export const requestAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await fetch(getUrl("users"));

    if (!response.ok) {
      throw new Error("No server response");
    }

    return UserSchema.array().parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
