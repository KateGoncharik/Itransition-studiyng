import { Component } from "../../component.js";

export const loginForm = new Component({
  tag: "form",
  className: "",
  text: "",
});
loginForm.setAttribute("id", "login-form");

const emailInput = new Component({
  tag: "input",
  className: "login-email",
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
  { tag: "div", className: "input-field" },
  emailInput,
  emailLabel
);

const passwordInput = new Component({
  tag: "input",
  className: "login-password",
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
  { tag: "div", className: "input-field" },
  passwordInput,
  passwordLabel
);

const loginButton = new Component({
  tag: "button",
  className: "",
  text: "Login",
});

loginForm.appendChildren([emailField, passwordField, loginButton]);

loginForm.addListener("submit", async (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector(".login-email");
  const loginPassword = document.querySelector(".login-password");

  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const signInMethods = await auth.fetchSignInMethodsForEmail(email);

    if (signInMethods.length === 0) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (cred) => {
          await db.collection("users").doc(cred.user.uid).set({
            email: email,
            status: "active",
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      console.log("User registered and logged in");
    } else {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("User logged in");
    }
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
});
