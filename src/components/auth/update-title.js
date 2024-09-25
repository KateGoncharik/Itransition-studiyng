import { auth } from "../../../firebase-config.js";
import { getUserByEmail } from "../main/get-user-by-email.js";

export const updateTitle = async () => {
  const title = document.querySelector(".main-title");
  const userInAuth = auth.currentUser;
  const userInDB = await getUserByEmail(userInAuth.email);
  title.innerHTML = `Hello, ${userInDB.id}!`;
};
export const hideTitle = () => {
  const title = document.querySelector(".main-title");
  title.innerHTML = "";
};
