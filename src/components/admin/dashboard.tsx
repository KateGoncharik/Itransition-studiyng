import { Typography } from "@mui/material";
import { FC } from "react";

export const CustomDashboard: FC = () => {
  return (
    <>
      <Typography component="h1" variant="h2" margin="1" textAlign="center">
        Admin page
      </Typography>
      <Typography component="h4" variant="h5" margin="1" textAlign="center">
        Here you can only view all users, templates and forms data
      </Typography>
      <Typography component="h6" variant="h6" textAlign="center">
        ...because author made this admin part in a couple of hours
      </Typography>
    </>
  );
};
