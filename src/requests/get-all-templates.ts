import { getUrl } from "./get-url.ts";
import {
  TemplatePreviewType,
  TemplatePreviewSchema,
} from "./schemas/templates-schema.ts";

export const getAllTemplates = async (): Promise<TemplatePreviewType[]> => {
  try {
    const response = await fetch(getUrl("templates"));

    if (!response.ok) {
      throw new Error("No server response");
    }

    return TemplatePreviewSchema.array().parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
