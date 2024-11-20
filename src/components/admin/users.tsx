import { FC } from "react";
import { Datagrid, EmailField, List, TextField } from "react-admin";

export const UserList: FC = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="isAdmin" />
    </Datagrid>
  </List>
);
