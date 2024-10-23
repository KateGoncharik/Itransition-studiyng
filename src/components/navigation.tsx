import { logoutUser } from "@/requests/logout-user";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

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
  const { isAuthenticated } = useAuth();
  return (
    <Stack className="gap-2" direction={"row"}>
      <Button component={RouterLink} sx={headerButtonStyles} to={"/"}>
        Main
      </Button>
      {isAuthenticated && (
        <Button
          component={RouterLink}
          sx={headerButtonStyles}
          to={"/constructor"}
        >
          Constructor
        </Button>
      )}

      {!isAuthenticated && (
        <Button
          component={RouterLink}
          sx={headerButtonStyles}
          to={"/registration"}
        >
          Registration
        </Button>
      )}
      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <Button component={RouterLink} sx={headerButtonStyles} to={"/login"}>
          Login
        </Button>
      )}
    </Stack>
  );
};

const LogoutButton: FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = (): void => {
    logoutUser().then(
      () => {
        logout();
        navigate("/login");
      },
      () => {},
    );
  };
  return (
    <Button onClick={handleLogout} sx={headerButtonStyles}>
      Logout
    </Button>
  );
};
