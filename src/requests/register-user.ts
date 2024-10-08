import { getUrl } from "./get-url";
export const registerUser = ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): void => {
  fetch(getUrl("register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("User with these credentials already exists");
      }
      if (!response.ok) {
        throw new Error("Some error occurred");
      }
      return response.json();
    })
    .then((data) => {
      console.log("New user registered:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
