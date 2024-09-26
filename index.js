import { updateUsersTable } from "./src/table.js";
import { app } from "./src/app.js";
import { create20Records } from "./src/faker.js";

document.body.append(app.getNode());

const users = await create20Records(42, "Belarus");
console.log(users);
updateUsersTable(users);
