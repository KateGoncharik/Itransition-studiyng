import { getUrl } from "./get-url";

fetch(getUrl("login"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "KateGu",
    password: "yourSecurePassword123",
  }),
})
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Invalid password");
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
  });
