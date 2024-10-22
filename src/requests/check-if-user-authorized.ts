import { getUrl } from "./get-url";
import { IsAuthorized, isAuthorizedSchema } from "./is-authorized-schema";

export const isUserAuthorized = async (): Promise<IsAuthorized> => {
  const response = await fetch(getUrl("auth/check"), {
    method: "GET",
    credentials: "include",
  });
  return isAuthorizedSchema.parse(await response.json());
};
