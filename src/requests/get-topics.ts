import { getUrl } from "./get-url";
import { TopicSchema, AllTopicsType } from "./topic-schema";

export const getTopics = async (): Promise<AllTopicsType> => {
  try {
    const response = await fetch(getUrl("topics"));
    if (!response.ok) {
      throw new Error("No server response");
    }

    return TopicSchema.parse(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Some error ocurred");
    }
    throw error;
  }
};
