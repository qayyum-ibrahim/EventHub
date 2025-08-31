// Mock Authentication Context
import { User } from "@/types";
import { createContext, useState } from "react";
import { mockUser } from "@/data/mockData";

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with a logged-in user for demo purposes
  const [user, setUser] = useState<User | null>(mockUser);
  const [token, setToken] = useState<string | null>("mock-token");
  const [isLoading, setIsLoading] = useState(false);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;