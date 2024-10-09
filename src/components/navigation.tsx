import { deleteToken, isUserAuthorised } from "@/token";
import { logoutUser } from "@/requests/logout-user";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const headerButtonStyles = {
  "&:hover": {
    bgcolor: "primary.contrastText",
    color: "primary.main",
    transition: "0.7s",
  },
  color: "primary.contrastText",
  transition: "0.7s",
};

export const Navigation: FC = () => {
  return (
    <Stack className="gap-2" direction={"row"}>
      <Button component={RouterLink} sx={headerButtonStyles} to={"/"}>
        Main
      </Button>
      <Button
        component={RouterLink}
        sx={headerButtonStyles}
        to={"/registration"}
      >
        Registration
      </Button>
      <Button component={RouterLink} sx={headerButtonStyles} to={"/login"}>
        Login
      </Button>
      {isUserAuthorised() && <LogoutButton />}
    </Stack>
  );
};

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const handleLogout = (): void => {
    logoutUser();
    deleteToken();
    navigate("/login");
  };
  return (
    <Button onClick={handleLogout} sx={headerButtonStyles}>
      Logout
    </Button>
  );
};
