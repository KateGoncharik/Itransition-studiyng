import { FC } from "react";
export type User = {
  id?: number;
  password?: string;
  username: string;
  email?: string;
};
export const UserComponent: FC<{ user: User }> = ({ user }) => {
  console.log("user", user);
  return <>Name: {user.username}</>;
};
