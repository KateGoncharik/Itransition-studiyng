import { Component } from "../../component.js";
import { deleteUser } from "../app.js";

class TableComponent extends Component {
  constructor({ headers = [], users = [] }) {
    super({ tag: "table", className: "user-table" });

    const thead = new Component({ tag: "thead" });
    const headerRow = new Component({ tag: "tr" });

    headers.forEach((headerText) => {
      const th = new Component({ tag: "th", text: headerText });
      headerRow.append(th);
    });

    thead.append(headerRow);
    this.append(thead);

    const tbody = new Component({ tag: "tbody", className: "userTableBody" });
    users.forEach((user) => {
      const row = this.createUserRow(user);
      tbody.append(row);
    });

    this.append(tbody);
  }

  createUserRow(user) {
    const row = new Component({ tag: "tr" });

    const emailCell = new Component({ tag: "td", text: user.data().email });
    const statusCell = new Component({ tag: "td", text: user.data().status });

    const lastLogin = user.data().lastLogin
      ? new Date(user.data().lastLogin.seconds * 1000).toLocaleString()
      : "N/A";
    const lastLoginCell = new Component({ tag: "td", text: lastLogin });

    const deleteButton = new Component({ tag: "button", text: "Удалить" });
    deleteButton.setAttribute("data-id", user.id);
    deleteButton.addListener("click", () => this.deleteUser(user.id));

    const deleteCell = new Component({ tag: "td" });
    deleteCell.append(deleteButton);

    row.appendChildren([emailCell, statusCell, lastLoginCell, deleteCell]);

    return row;
  }

  deleteUser(userId) {
    console.log(`User with ID ${userId} will be deleted`);
    deleteUser(userId);
  }
}

export function renderUserTable(users) {
  const container = document.querySelector(".page-content");

  if (users) {
    const headers = ["Email", "Status", "Last Login", "Actions"];
    const userTable = new TableComponent({ headers, users });

    container.innerHTML = "";
    container.appendChild(userTable.getNode());
  } else {
    container.innerHTML = "";
    container.appendChild(new Component({ tag: "p", text: "No users" }));
  }
}
