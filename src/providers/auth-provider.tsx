import { isUserAuthorised } from "@/token";
import { useState, FC, ReactNode } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const savedToken = isUserAuthorised();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(savedToken);

  const login = (): void => setIsAuthenticated(true);
  const logout = (): void => setIsAuthenticated(false);
  // TODO avoid multiple logins - check token in db, how to refresh?

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
