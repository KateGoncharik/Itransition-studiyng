import { getUrl } from "./get-url.ts";
import { TemplateType, TemplateSchema } from "./templates-schema.ts";

export const getAllTemplates = async (): Promise<TemplateType[]> => {
  try {
    const response = await fetch(getUrl("templates"));

    if (!response.ok) {
      throw new Error("No server response");
    }

    return TemplateSchema.array().parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
