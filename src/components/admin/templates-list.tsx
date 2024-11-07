import { FC } from "react";
import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export const TemplatesList: FC = () => (
  <List
    sx={{
      width: { lg: "50%", md: "70%", sm: "85%", xs: "95%" },
    }}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <ReferenceField source="user_id" reference="users" />
      <ReferenceField source="topic_id" reference="topics" />
    </Datagrid>
  </List>
);
