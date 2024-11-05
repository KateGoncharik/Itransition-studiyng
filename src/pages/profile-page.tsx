import { useEffect, useState, type JSX } from "react";

import { Button, Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";

import { Link, useNavigate } from "react-router-dom";
import { User } from "@/components/user";
import { getAllUserForms } from "@/requests/get-all-user-forms";
import { StoredFormType } from "@/requests/form-schema";
import { checkToken } from "@/providers/check-token";

const Profile = (): JSX.Element | undefined => {
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState<null | User>(null);
  const [forms, setForms] = useState<Array<StoredFormType>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserAndHisForms = async (): Promise<void> => {
      if (!isAuthenticated) {
        navigate("/");
        return;
      }
      const authorized = await checkToken(logout);

      const forms = await getAllUserForms(authorized.id);
      // TODO handle no forms case
      setForms(forms);
      setUser(authorized);
    };
    void getUserAndHisForms();
  }, [isAuthenticated, navigate, logout]);

  return (
    <Stack gap={2} textAlign="center">
      <Typography component="h1" mt={3} variant="h4">
        Profile
      </Typography>
      {user && (
        <Typography component="h1" mt={3} variant="h4">
          {user?.username}
        </Typography>
      )}
      {forms && (
        <>
          <Typography component="h1" mt={3} variant="h4">
            Forms, that you filled out:
          </Typography>
          {forms.map((form) => (
            <Link key={form.id} to={`/forms/${form.id}`}>
              <Button>{form.id}</Button>
            </Link>
          ))}
        </>
      )}
    </Stack>
  );
};
export default Profile;
