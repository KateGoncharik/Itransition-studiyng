import { getUrl } from "./get-url";
import { deleteToken } from "../token";

export function logoutUser(): void {
  fetch(getUrl("logout"), {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      deleteToken();
      console.log("Logged out successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
