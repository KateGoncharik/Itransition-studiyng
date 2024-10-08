import { getUrl } from "./get-url";
import { UserSchema, UserType } from "./user-schema";

export const getAuthorizedUser = async (): Promise<UserType> => {
  try {
    const response = await fetch(getUrl("me"), {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get authorized user");
    }

    return UserSchema.parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
