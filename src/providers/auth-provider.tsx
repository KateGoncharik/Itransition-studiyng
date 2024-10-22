import { useState, FC, ReactNode, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { isUserAuthorized } from "@/requests/check-if-user-authorized";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
  // TODO avoid multiple logins - check token in db, how to refresh?
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
