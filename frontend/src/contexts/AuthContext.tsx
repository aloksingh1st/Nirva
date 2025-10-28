import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMe } from "@/components/auth/sdk";

import { logout } from "@/components/auth/sdk";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock API functions
const mockApi = {
  login: async (email: string, password: string) => {
    const me: any = await getMe();

    console.log(me);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    if (email === "demo@nirva.dev" && password === "password") {
      return {
        user: {
          id: "1",
          email: "demo@nirva.dev",
          name: "Demo User",
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face",
        },
        token: "mock-jwt-token-" + Date.now(),
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (email: string, password: string, name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: Math.random().toString(36).substring(7),
        email,
        name,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face`,
      },
      token: "mock-jwt-token-" + Date.now(),
    };
  },

  resetPassword: async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In real app, this would send an email
    return { message: "Password reset email sent" };
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem("nirva_token");
    const storedUser = localStorage.getItem("nirva_user");

    const getUser = async () => {
      const loggedInUser = await getMe();
      console.log("Fetched user from backend:", loggedInUser);

      setUser(loggedInUser.user);
      return loggedInUser;
    };

    getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await mockApi.login(email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("nirva_token", response.token);
      localStorage.setItem("nirva_user", JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await mockApi.register(email, password, name);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("nirva_token", response.token);
      localStorage.setItem("nirva_user", JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("nirva_token");
    localStorage.removeItem("nirva_user");
    await logout();
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await mockApi.resetPassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
