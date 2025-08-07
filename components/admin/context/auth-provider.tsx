"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/services";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  exp: number;
  profile: {
    id: string;
    full_name: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: {
    identifier: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Di dalam useEffect AuthProvider
  useEffect(() => {
    let refreshTimeout: NodeJS.Timeout;

    const startTokenRefresh = (exp: number) => {
      const currentTime = Math.floor(Date.now() / 1000);
      const delay = Math.max((exp - currentTime - 60) * 1000, 0); // 60 detik sebelum expired

      refreshTimeout = setTimeout(async () => {
        try {
          await authService.refreshToken();
          console.log("Token refreshed before expiration");
          // Setelah refresh, ambil ulang exp dari token baru
          const currentUser = await authService.getCurrentUser();
          if (currentUser && currentUser.exp) {
            startTokenRefresh(currentUser.exp);
          }
        } catch (error) {
          console.error("Auto refresh failed:", error);
          handleLogout();
        }
      }, delay);
    };

    // Mulai refresh jika user login dan punya exp
    if (user && user.exp) {
      startTokenRefresh(user.exp);
    }

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [user]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      // Cek session dari cookies (tidak dari localStorage)
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials: {
    identifier: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      if (result) {
        const { accessToken, refreshToken, ...userData } = result;
        setUser(userData); 
      } else {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      }
      router.push("/admin/dashboard"); 
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authChannel = new BroadcastChannel("auth_channel");

    authChannel.onmessage = (event) => {
      if (event.data === "logout") {
        handleLogout();
      }
    };

    return () => {
      authChannel.close();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push("/admin/sign-in");

      // Beri tahu tab lain
      const authChannel = new BroadcastChannel("auth_channel");
      authChannel.postMessage("logout");
      authChannel.close();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// HOC untuk protected routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/admin/sign-in");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};
