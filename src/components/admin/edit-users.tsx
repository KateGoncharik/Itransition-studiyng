import { FC } from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

export const EditUsers: FC = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="isAdmin" />
      </SimpleForm>
    </Edit>
  );
};
