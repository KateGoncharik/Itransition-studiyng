import { useEffect, useState, type JSX } from "react";

import { getToken } from "../get-token";
import { User, UserComponent } from "../components/user";
import { getAllUsers } from "../requests/get-all-users";
import { getAuthorizedUser } from "../requests/get-authorized-user";

const Main = (): JSX.Element | undefined => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    void getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);
  if (getToken()) {
    console.log(getAuthorizedUser());
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
