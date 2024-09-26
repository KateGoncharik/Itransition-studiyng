import { Component } from "../component.js";
import { create20Records } from "./faker.js";
import { updateUsersTable } from "./components/users-table/users-table.js";

export const startApp = async () => {
  document.body.append(
    new Component(
      {},
      new Component(
        { className: "wrapper", text: "Main" },
        new Component({ className: "table-container" })
      )
    ).getNode()
  );

  const users = await create20Records(42, "France");
  updateUsersTable(users);
};
