import { Admin, Resource } from "react-admin";
import { FC, useEffect, useState } from "react";
import dataProviderWithAuth from "@/providers/data-provider";
import { TemplatesList } from "./templates-list";

import { CustomLayout } from "./layout";
import { CustomDashboard } from "./dashboard";
import { UserList } from "./users";
import { FormsList } from "./forms";
import { getAuthorizedUser } from "@/requests/get-authorized-user";
import { useRedirectWithDelay } from "@/hooks/use-redirect-with-delay";
import { CircularProgress, Stack } from "@mui/material";

const AdminComponent: FC = () => {
  const [isAdmin, setIsUserAdmin] = useState(false);
  const redirect = useRedirectWithDelay();

  useEffect(() => {
    const checkRole = async (): Promise<void> => {
      const user = await getAuthorizedUser();
      if (user.isAdmin === 1) {
        setIsUserAdmin(true);
      } else {
        redirect("/", 0);
      }
    };
    void checkRole();
  });
  return isAdmin ? (
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
  ) : (
    <Stack margin="auto">
      <CircularProgress />
    </Stack>
  );
};

export default AdminComponent;
