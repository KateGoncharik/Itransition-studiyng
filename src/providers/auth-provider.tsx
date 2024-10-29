import { useState, FC, ReactNode, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { isUserAuthorized } from "@/requests/check-if-user-authorized";
import Lottie from "react-lottie";
import animationData from "../lotties/Animation - 1730189897623.json";
import { Stack, Typography } from "@mui/material";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const checkResult = await isUserAuthorized();
      setIsAuthenticated(checkResult.isAuthorized);
      setLoading(false);
    };

    void checkAuth();
  }, []);

  const login = (): void => setIsAuthenticated(true);
  const logout = (): void => setIsAuthenticated(false);
  // TODO how to refresh token?
  if (loading) {
    return (
      <Stack margin="2% auto" display="flex" gap={2} alignItems="center">
        <Typography component="h1" variant="h4">
          Sorry, our server with free access is sleeping...
        </Typography>
        <Typography component="h4" variant="h5">
          We will wake him up in a minute!
        </Typography>
        <Typography component="h5" variant="h6">
          If nothing happens after a minute - refresh the page.
        </Typography>

        <Lottie options={defaultOptions} height={300} width={300} />
      </Stack>
    );
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
