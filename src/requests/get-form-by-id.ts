import { StoredFormSchema, StoredFormType } from "./schemas/form-schema.ts";
import { getUrl } from "./get-url.ts";

export const getFormById = async (formId: number): Promise<StoredFormType> => {
  try {
    const response = await fetch(getUrl(`forms/${formId}`), {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("No server response");
    }

    return StoredFormSchema.parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
