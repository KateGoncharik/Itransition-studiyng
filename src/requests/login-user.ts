import { getUrl } from "./get-url";

type UserData = {
  username: string;
  password: string;
};
export const loginUser = (userData: UserData): Promise<void> => {
  return fetch(getUrl("login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }
      if (response.status === 404) {
        throw new Error("User not found");
      }
      if (!response.ok) {
        throw new Error("Some error occurred");
      }
      return response.json();
    })
    .then((data: { token: string }) => {
      const token = data.token;

      document.cookie = `token=${token}; path=/; max-age=3600`;

      console.log("Logged in successfully, token saved to cookies");
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
