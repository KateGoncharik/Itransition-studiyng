// let unsubscribeFromUsers = null; // Переменная для хранения ссылки на слушателя

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     unsubscribeFromUsers = db.collection("users").onSnapshot((snapshot) => {
//       const users = [];
//       snapshot.forEach((doc) => {
//         users.push(doc);
//       });

//       setupUsers(users);
//     });

//     db.collection("users")
//       .get()
//       .then((snapshot) => {
//         setupUsers(snapshot.docs);
//       });

//     setupUI(user);
//   } else {
//     if (unsubscribeFromUsers) {
//       unsubscribeFromUsers();
//       unsubscribeFromUsers = null;
//     }

//     setupUI();
//     setupUsers([]);
//   }
// });

// // signup
// const signupForm = document.querySelector("#signup-form");
// signupForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = signupForm["signup-email"].value;
//   const password = signupForm["signup-password"].value;

//   auth.createUserWithEmailAndPassword(email, password).then(async (cred) => {
//     await db.collection("users").doc(cred.user.uid).set({
//       email: email,
//       status: "active",
//       lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//     const modal = document.querySelector("#modal-signup");
//     M.Modal.getInstance(modal).close();
//     signupForm.reset();
//   });
// });

// // logout
// const logout = document.querySelector("#logout");
// logout.addEventListener("click", (e) => {
//   e.preventDefault();
//   auth.signOut();
// });

// login
// const loginForm = document.querySelector("#login-form");
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = loginForm["login-email"].value;
//   const password = loginForm["login-password"].value;

//   auth.signInWithEmailAndPassword(email, password).then((cred) => {
//     const modal = document.querySelector("#modal-login");
//     M.Modal.getInstance(modal).close();
//     loginForm.reset();
//   });
// });

// const deleteUser = (userId) => {
//   db.collection("users")
//     .doc(userId)
//     .delete()
//     .then(() => {
//       console.log("User deleted successfully");
//     })
//     .catch((error) => {
//       console.error("Error deleting user: ", error);
//     });
// };
