// const guideList = document.querySelector(".guides");
// const loggedOutLinks = document.querySelectorAll(".logged-out");
// const loggedInLinks = document.querySelectorAll(".logged-in");

// const setupUI = (user) => {
//   if (user) {
//     loggedInLinks.forEach((item) => (item.style.display = "block"));
//     loggedOutLinks.forEach((item) => (item.style.display = "none"));
//   } else {
//     loggedInLinks.forEach((item) => (item.style.display = "none"));
//     loggedOutLinks.forEach((item) => (item.style.display = "block"));
//   }
// };

// const setupUsers = (data) => {
//   if (data.length) {
//     let html = "";
//     data.forEach((doc) => {
//       const user = doc.data();

//       const li = `
//         <li>
//           <div class="collapsible-header grey lighten-4"> ${user.email} </div>
//           <div class="collapsible-body white"> ${user.lastLogin} </div>
//         </li>
//       `;
//       html += li;
//     });
//     guideList.innerHTML = html;
//   } else {
//     guideList.innerHTML = '<h5 class="center-align">Login to view users</h5>';
//   }
// };
