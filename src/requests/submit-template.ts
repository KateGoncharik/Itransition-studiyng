import { getUrl } from "./get-url.ts";

export const submitTemplate = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch(getUrl("upload-template"), {
      method: "POST",

      body: formData,
    });

    if (!response.ok) {
      throw new Error("No server response");
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
