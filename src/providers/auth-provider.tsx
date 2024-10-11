import { createContext, useState, FC, ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (): void => setIsAuthenticated(true);
  const logout = (): void => setIsAuthenticated(false);
  // TODO get auth info from cookies
  // TODO avoid multiple logins - check token in db, how to refresh?

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
