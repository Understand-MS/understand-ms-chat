import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import appConfig from "@/config/appConfig";
import { AuthUser } from "@/models/AuthUser";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (provider: "google" | "facebook") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER: AuthUser = {
  id: "mock-user-1",
  name: "Demo User",
  provider: "google",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (appConfig.mockEnabled) {
      setUser(MOCK_USER);
      setIsLoading(false);
      return;
    }

    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        const principal = data?.clientPrincipal;
        if (principal) {
          setUser({
            id: principal.userId,
            name: principal.userDetails,
            provider: principal.identityProvider,
          });
        }
      })
      .catch(() => {
        // unauthenticated or endpoint unavailable
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (provider: "google" | "facebook") => {
    window.location.href = `/.auth/login/${provider}?post_login_redirect_uri=/`;
  };

  const logout = () => {
    window.location.href = "/.auth/logout";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
