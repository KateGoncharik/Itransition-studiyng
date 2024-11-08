import { StoredFormSchema, StoredFormType } from "./schemas/form-schema.ts";
import { getUrl } from "./get-url.ts";

export const getAllUserForms = async (
  userId: number,
): Promise<Array<StoredFormType>> => {
  try {
    const response = await fetch(getUrl(`users/${userId}/forms`), {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("No server response");
    }

    return StoredFormSchema.array().parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
