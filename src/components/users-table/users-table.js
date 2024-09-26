import { Component } from "../../../component.js";

const createUserRow = (user) => {
  const row = new Component({ tag: "tr" });

  const idCell = new Component({ tag: "td", text: user.id });
  const randomIdCell = new Component({ tag: "td", text: user.randomId });

  const telephoneCell = new Component({ tag: "td", text: user.telephone });
  const locationCell = new Component({
    tag: "td",
    text: user.address,
  });

  const nameCell = new Component({ tag: "td", text: user.fullName });

  row.appendChildren([
    idCell,
    randomIdCell,
    nameCell,
    locationCell,
    telephoneCell,
  ]);

  return row;
};

export const createUsersTable = (users) => {
  const table = new Component({ tag: "table", className: "users-table" });
  const thead = new Component({ tag: "thead", className: "thead-light" });
  const headerRow = new Component({ tag: "tr" });

  ["id", "rabdomId", "name", "location", "telephone"].forEach((headerText) => {
    const th = new Component({ tag: "th", text: headerText });
    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);

  const tbody = new Component({
    tag: "tbody",
    className: "users-table-body",
  });
  users.forEach((user) => {
    const row = createUserRow(user);
    tbody.append(row);
  });

  table.append(tbody);
  return table;
};

export const updateUsersTable = (users) => {
  const container = document.querySelector(".table-container");
  const userTable = createUsersTable(users);

  container.innerHTML = "";
  container.appendChild(userTable.getNode());
};
