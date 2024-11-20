import { Admin, Resource } from "react-admin";
import { FC, useEffect, useState } from "react";
import dataProviderWithAuth from "@/providers/data-provider";
import { TemplatesList } from "./templates-list";

import { CustomLayout } from "./layout";
import { CustomDashboard } from "./dashboard";
import { UserList } from "./users";
import { FormsList } from "./forms";
import { useRedirectWithDelay } from "@/hooks/use-redirect-with-delay";
import { Stack } from "@mui/material";
import { EditUsers } from "./edit-users";
import { isUserAuthorized } from "@/requests/check-if-user-authorized";

const AdminComponent: FC = () => {
  const [isAdmin, setIsUserAdmin] = useState(false);
  const redirect = useRedirectWithDelay();

  useEffect(() => {
    const checkRole = async (): Promise<void> => {
      const user = await isUserAuthorized();
      if (typeof user === "string") {
        setIsUserAdmin(false);
        redirect("/", 0);
      }
      if (typeof user === "string") {
        return;
      }
      if (user.isAdmin === 1) {
        setIsUserAdmin(true);
      }
    };
    void checkRole();
  }, [redirect]);
  return isAdmin ? (
    <Admin
      dataProvider={dataProviderWithAuth}
      basename="/admin"
      layout={CustomLayout}
      dashboard={CustomDashboard}
    >
      <Resource name="users" edit={EditUsers} list={UserList} />
      <Resource name="templates" list={TemplatesList} />
      <Resource name="forms" list={FormsList} />
    </Admin>
  ) : (
    <Stack margin="2% auto" textAlign="center">
      No access
    </Stack>
  );
};

export default AdminComponent;
