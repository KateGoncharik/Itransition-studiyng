import { getUrl } from "./get-url";

export function logoutUser(): Promise<void> {
  return fetch(getUrl("logout"), {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
