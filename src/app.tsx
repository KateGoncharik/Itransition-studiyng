import { useEffect, useState, type JSX } from "react";

import { getToken } from "./get-token";
import { User, UserComponent } from "./components/user";
import { requestAllUsers } from "./request-all-users";
import { getAuthorizedUser } from "./get-authorized-user";
// import { loginUser } from "./login-user";

export const App = (): JSX.Element | undefined => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    void requestAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);
  if (getToken()) {
    console.log(getAuthorizedUser());
    // const userData = {
    //   username: "KateGu",
    //   password: "yourSecurePassword123",
    // };
    // loginUser(userData);
  }
  return (
    <>
      <>AAA </>
      {users.length > 0 &&
        users.map((user) => <UserComponent key={user.email} user={user} />)}
      {getToken() ? <>Authorized user main page</> : <>No user main page</>}
    </>
  );
};
