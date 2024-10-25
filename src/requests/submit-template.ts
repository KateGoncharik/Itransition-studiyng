import { getUrl } from "./get-url.ts";

export const submitTemplate = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch(getUrl("upload-template"), {
      method: "POST",

      body: formData,
    });
    // TODO fix error message
    if (!response.ok) {
      throw new Error("Some error ocurred");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
