import { Component } from "../component.js";
import { renderUserTable } from "./main/users-table.js";
import { nav } from "./nav.js";

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

auth.onAuthStateChanged((user) => {
  if (user) {
    unsubscribeFromUsers = db.collection("users").onSnapshot((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc);
      });

      renderUserTable(users);
    });

    db.collection("users")
      .get()
      .then((snapshot) => {
        renderUserTable(snapshot.docs);
      });
  } else {
    if (unsubscribeFromUsers) {
      unsubscribeFromUsers();
      unsubscribeFromUsers = null;
    }

    renderUserTable([]);
  }
});

export const deleteUser = (userId) => {
  db.collection("users")
    .doc(userId)
    .delete()
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user: ", error);
    });
};
