import { Stack, Typography } from "@mui/material";
import { FC } from "react";
export type User = {
  id?: number;
  password?: string;
  username: string;
  email?: string;
};
export const UserComponent: FC<{ user: User }> = ({ user }) => {
  return (
    <Stack>
      <Typography component="p" mb={1}>
        Name: {user.username}
        Email: {user.email}
      </Typography>
    </Stack>
  );
};
