import { Component } from "../component.js";
import { auth, db } from "../firebase-config.js";
import { createMainPage } from "./components/main/main-page.js";
import { getUserByEmail } from "./components/main/get-user-by-email.js";
import { renderUserTable } from "./components/main/users-table.js";
import { nav } from "./components/nav/nav.js";
import { updateNavButtons } from "./components/nav/update-nav-buttons.js";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { renderLoginPage } from "./components/auth/login-page.js";
import { formatEmail } from "./components/auth/format-email.js";

export const app = new Component(
  {},
  new Component(
    { className: "wrapper container-fluid" },
    nav,
    new Component({
      className: "page-content container-fluid",
    })
  )
);

let unsubscribeFromUsers = null;

auth.onAuthStateChanged(async (user) => {
  if (user) {
    // auth.signOut();
    const userDocRef = doc(db, "users", formatEmail(user.email));

    const ssss = await getDoc(userDocRef);
    console.log(userDocRef);

    if (!ssss.exists()) {
      auth.signOut();
      const errorField = document.querySelector(".error-field");
      errorField.classList.remove("opacity-0");
      errorField.classList.add("opacity-100");
      errorField.innerHTML = `No user with email ${user.email} found. Register first`;
      return;
    }

    const userInDB = await getUserByEmail(user.email);
    const isUserBlocked = userInDB.status === "blocked";
    if (isUserBlocked) {
      updateNavButtons(false);
      renderLoginPage();
      return;
    }
    const usersCollection = collection(db, "users");
    unsubscribeFromUsers = onSnapshot(usersCollection, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc);
      });
      createMainPage();
      renderUserTable(users);
    });
    getDocs(usersCollection).then((snapshot) => {
      renderUserTable(snapshot.docs);
    });
    updateNavButtons(true);
  } else {
    if (unsubscribeFromUsers) {
      unsubscribeFromUsers();
      unsubscribeFromUsers = null;
    }

    updateNavButtons(false);
    renderLoginPage();
  }
});
