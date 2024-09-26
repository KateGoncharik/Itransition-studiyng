import { Component } from "../component.js";
import { createInitialRecords } from "./faker.js";
import { updateUsersTable } from "./components/users-table/users-table.js";
import { createMenu } from "./components/menu/menu.js";

export const startApp = async () => {
  document.body.append(
    new Component(
      { className: "app" },
      new Component(
        { className: "wrapper" },
        createMenu(),
        new Component({ className: "table-container" })
      )
    ).getNode()
  );

  const users = await createInitialRecords(42, "France");
  updateUsersTable(users);
};
