import { getUrl } from "./get-url.ts";

fetch(getUrl("register"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "KateGu",
    email: "kate@example2.com",
    password: "yourSecurePassword123",
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
