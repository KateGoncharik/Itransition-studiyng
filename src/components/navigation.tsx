import { logoutUser } from "@/requests/logout-user";
import { Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { headerButtonStyles } from "./header-button-styles";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRedirectWithDelay } from "@/hooks/use-redirect-with-delay";
import { getAuthorizedUser } from "@/requests/get-authorized-user";

export const Navigation: FC = () => {
  const { isAuthenticated } = useAuth();
  const [isAdmin, setIsUserAdmin] = useState(false);
  useEffect(() => {
    const checkRole = async (): Promise<void> => {
      const user = await getAuthorizedUser();
      if (user.isAdmin === 1) {
        setIsUserAdmin(true);
      }
    };
    void checkRole();
  }, []);
  return (
    <Stack className="gap-2" direction={"row"}>
      <Button component={RouterLink} sx={headerButtonStyles} to={"/"}>
        <HomeIcon />
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
      {isAdmin && (
        <Button component={RouterLink} sx={headerButtonStyles} to={"/admin"}>
          Admin page
        </Button>
      )}
      {isAuthenticated && (
        <Button component={RouterLink} sx={headerButtonStyles} to={"/profile"}>
          Profile
        </Button>
      )}
      {!isAuthenticated && (
        <Button
          component={RouterLink}
          sx={headerButtonStyles}
          to={"/registration"}
        >
          <PersonAddIcon />
        </Button>
      )}
      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <Button component={RouterLink} sx={headerButtonStyles} to={"/login"}>
          <LoginIcon />
        </Button>
      )}
    </Stack>
  );
};

const LogoutButton: FC = () => {
  const { logout } = useAuth();

  const redirect = useRedirectWithDelay();
  const handleLogout = (): void => {
    logoutUser().then(
      () => {
        logout();
        redirect("/login", 0);
      },
      () => {},
    );
  };
  return (
    <Button onClick={handleLogout} sx={headerButtonStyles}>
      <LogoutIcon />
    </Button>
  );
};
