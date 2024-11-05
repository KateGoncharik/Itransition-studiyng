import { UserSchema, UserType } from "./user-schema";
import { getUrl } from "./get-url";

export const isUserAuthorized = async (): Promise<UserType | string> => {
  const response = await fetch(getUrl("me"), {
    method: "GET",
    credentials: "include",
  });
  if (response.status === 400) {
    return "No token provided";
  } else if (response.status === 404) {
    return "No user with such credentials";
  } else if (response.status === 200) {
    return UserSchema.parse(await response.json());
  }
  throw new Error("Some error ocurred");
};
