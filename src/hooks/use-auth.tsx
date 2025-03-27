
import { useState, useEffect, createContext, useContext } from "react";
import { userService, UserSession } from "@/services/user-service";

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; name: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await userService.login(email, password);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; name: string; password: string }) => {
    setIsLoading(true);
    try {
      await userService.register(userData);
      const session = userService.getCurrentUser();
      setUser(session);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
