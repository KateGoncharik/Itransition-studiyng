import { Component } from "../../../component.js";

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getUserByEmail } from "../main/get-user-by-email.js";
import { auth, db } from "../../../firebase-config.js";
import { updateTitle } from "./update-title.js";
import { renderRegistrationPage } from "./registration-page.js";
import { formatEmail } from "./format-email.js";

export const loginForm = new Component({
  tag: "form",
  className: "w-50 m-auto mt-3",
});
loginForm.setAttribute("id", "login-form ");

const emailInput = new Component({
  tag: "input",
  className: "login-email form-control",
  text: "",
});
emailInput.setAttribute("type", "email");
emailInput.setAttribute("id", "login-email");
emailInput.setAttribute("required", true);

const emailLabel = new Component({
  tag: "label",
  className: "",
  text: "Email address",
});
emailLabel.setAttribute("for", "login-email");

const emailField = new Component(
  { tag: "div", className: "form-group" },
  emailLabel,
  emailInput
);

const passwordInput = new Component({
  tag: "input",
  className: "login-password form-control",
  text: "",
});
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("id", "login-password");
passwordInput.setAttribute("required", true);

const passwordLabel = new Component({
  tag: "label",
  className: "",
  text: "Your password",
});
passwordLabel.setAttribute("for", "login-password");

const passwordField = new Component(
  { tag: "div", className: "form-group" },
  passwordLabel,
  passwordInput
);

const submitButton = new Component({
  tag: "button",
  className: "btn btn-primary mt-2",
  text: "Submit",
});

const errorField = new Component({
  className: "error-field opacity-0 text-danger",
});
const registrationButton = new Component({
  className: "btn text-info border-none",
  text: "account",
});
registrationButton.addListener("click", (e) => {
  e.preventDefault();
  renderRegistrationPage();
});
loginForm.appendChildren([
  emailField,
  passwordField,
  errorField,
  new Component(
    { className: "", text: "New here? Create your " },
    registrationButton
  ),
  submitButton,
]);

loginForm.addListener("submit", async (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector(".login-email");
  const loginPassword = document.querySelector(".login-password");

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, "users", formatEmail(email));

    const userInDB = await getDoc(userDocRef);

    if (!userInDB.exists()) {
      return;
    }

    updateTitle();

    const userDoc = doc(db, "users", formatEmail(email));
    await updateDoc(userDoc, {
      lastLogin: serverTimestamp(),
    }).catch((error) => {
      console.error("Error while updating last login: ", error);
    });
    const user = await getUserByEmail(email);
    if (user.status === "blocked") {
      auth.signOut();
    }
  } catch (error) {
    const errorField = document.querySelector(".error-field");
    errorField.classList.remove("opacity-0");
    errorField.classList.add("opacity-100");
    errorField.innerHTML = error.message;
    console.error("Error during login:", error.message);
  }
});

export function renderLoginPage() {
  const container = document.querySelector(".page-content");

  container.innerHTML = "";
  container.appendChild(
    new Component(
      { className: "login-page" },
      new Component({ tag: "h1", text: "Login", className: "text-center m-3" }),
      loginForm
    ).getNode()
  );
}
