import { Admin, ListGuesser, Resource } from "react-admin";
import { FC } from "react";
import dataProviderWithAuth from "@/providers/data-provider";
// TODO forms
// TODO update users table - add role (isAdmin)
const AdminComponent: FC = () => (
  <Admin
    title={"Admin page"}
    dataProvider={dataProviderWithAuth}
    basename="/admin"
  >
    <Resource name="users" list={ListGuesser} />
    <Resource name="templates" list={ListGuesser} />
  </Admin>
);

export default AdminComponent;
