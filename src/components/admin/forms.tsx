import { FC } from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const FormsList: FC = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="user_id" reference="users" />
      <ReferenceField source="template_id" reference="templates" />
      <TextField source="custom_string1" />
      <TextField source="custom_string2" />
      <TextField source="custom_string3" />
      <TextField source="custom_string4" />
      <TextField source="custom_int1" />
      <TextField source="custom_int2" />
      <TextField source="custom_int3" />
      <TextField source="custom_int4" />
      <TextField source="custom_text1" />
      <TextField source="custom_text2" />
      <TextField source="custom_text3" />
      <TextField source="custom_text4" />
      <NumberField source="custom_checkbox1" />
      <TextField source="custom_checkbox2" />
      <TextField source="custom_checkbox3" />
      <TextField source="custom_checkbox4" />
      <DateField source="date" />
    </Datagrid>
  </List>
);
