import { Admin, Resource } from "react-admin";
import { FC } from "react";
import dataProviderWithAuth from "@/providers/data-provider";
import { TemplatesList } from "./templates-list";

import { CustomLayout } from "./layout";
import { CustomDashboard } from "./dashboard";
import { UserList } from "./users";
import { FormsList } from "./forms";
// TODO update users table - add role (isAdmin)
const AdminComponent: FC = () => (
  <Admin
    dataProvider={dataProviderWithAuth}
    basename="/admin"
    layout={CustomLayout}
    dashboard={CustomDashboard}
  >
    <Resource name="users" list={UserList} />
    <Resource name="templates" list={TemplatesList} />
    <Resource name="forms" list={FormsList} />
  </Admin>
);

export default AdminComponent;
