import { useEffect, useState, type JSX } from "react";

import { User, UserComponent } from "../components/user";
import { getAllUsers } from "../requests/get-all-users";
import { Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";

const Main = (): JSX.Element | undefined => {
  const [users, setUsers] = useState<User[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    void getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Typography
          component="h1"
          mb={1}
          mt={3}
          textAlign="center"
          variant="h5"
        >
          Authorized user main page
        </Typography>
      ) : (
        <>
          <Typography
            component="h1"
            mb={4}
            mt={7}
            textAlign="center"
            variant="h4"
          >
            Not authorized user main page
          </Typography>
          <Typography component="h3" textAlign="center" variant="h5">
            Log in to create template
          </Typography>
        </>
      )}
      {users.length > 0 &&
        users.map((user) => <UserComponent key={user.email} user={user} />)}
    </>
  );
};
export default Main;
