import { getUrl } from "./get-url.ts";
import {
  StoredTemplateSchema,
  StoredTemplateType,
} from "./template-state-schema.ts";

export const getTemplateById = async (
  id: number,
): Promise<StoredTemplateType> => {
  try {
    const response = await fetch(getUrl(`templates/${id}`));

    if (!response.ok) {
      throw new Error("No server response");
    }

    return StoredTemplateSchema.parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
