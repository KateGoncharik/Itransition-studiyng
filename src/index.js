// DOM elements
const guideList = document.querySelector(".guides");

// setup users
const setupUsers = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const user = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${user.name} </div>
          <div class="collapsible-body white"> ${user.name} TODO </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view users</h5>';
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
