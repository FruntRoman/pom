// src/features/auth/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import type { Account } from "@/types/auth";
import { mockAuthService } from "@/mocks/auth.service";
import { mockUsers } from "@/mocks/users";

type AuthState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "auth"; account: Account };

type AuthContextType = {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserPassword: (username: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({ status: "guest" });

  const login = async (username: string, password: string) => {
    setState({ status: "loading" });
    const res = await mockAuthService.login(username, password);
    setState({ status: "auth", account: res.account });
  };

  const logout = async () => {
    await mockAuthService.logout();
    setState({ status: "guest" });
  };

  const updateUserPassword = async (username: string, newPassword: string) => {
    // перевіряємо чи користувач існує
    const user = mockUsers[username];
    if (!user) throw new Error("User not found");

    // змінюємо пароль в моках
    user.password = newPassword;

    // якщо адмін міняє свій пароль, оновлюємо state
    if (state.status === "auth" && state.account.id === user.account.id) {
      setState({ status: "auth", account: { ...state.account } });
    }

    // симулюємо асинхронний запит
    return new Promise<void>((res) => setTimeout(res, 300));
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
