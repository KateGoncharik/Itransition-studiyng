import { isUserAuthorized } from "@/requests/check-if-user-authorized";
import { UserType } from "@/requests/schemas/user-schema";

export const checkToken = async (logout: () => void): Promise<UserType> => {
  const authorized = await isUserAuthorized();
  if (authorized === "Token expired") {
    logout();
    throw new Error("Token expired");
  }
  if (authorized === "No token provided") {
    logout();
    throw new Error("No token provided");
  }
  if (typeof authorized === "string") {
    throw new Error("Invalid token info");
  }
  return authorized;
};
