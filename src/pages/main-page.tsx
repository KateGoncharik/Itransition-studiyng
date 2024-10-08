import { useEffect, useState, type JSX } from "react";

import { getToken } from "../get-token";
import { User, UserComponent } from "../components/user";
import { requestAllUsers } from "../requests/request-all-users";
import { getAuthorizedUser } from "../requests/get-authorized-user";
// import { loginUser } from "./login-user";

const Main = (): JSX.Element | undefined => {
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
      {users.length > 0 &&
        users.map((user) => <UserComponent key={user.email} user={user} />)}
      {getToken() ? (
        <>Authorized user main page</>
      ) : (
        <>Not authorized user main page</>
      )}
    </>
  );
};
export default Main;
