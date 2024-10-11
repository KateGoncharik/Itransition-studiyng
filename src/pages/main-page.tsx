import { useEffect, useState, type JSX } from "react";

import { User, UserComponent } from "../components/user";
import { getAllUsers } from "../requests/get-all-users";
import { getAuthorizedUser } from "../requests/get-authorized-user";
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
  if (isAuthenticated) {
    console.log(getAuthorizedUser());
  }
  return (
    <>
      {isAuthenticated ? (
        <Typography
          component="h1"
          mb={1}
          mt={3}
          textAlign="center"
          variant="h4"
        >
          Authorized user main page
        </Typography>
      ) : (
        <Typography
          component="h1"
          mb={4}
          mt={7}
          textAlign="center"
          variant="h3"
        >
          Not authorized user main page
        </Typography>
      )}
      {users.length > 0 &&
        users.map((user) => <UserComponent key={user.email} user={user} />)}
    </>
  );
};
export default Main;
