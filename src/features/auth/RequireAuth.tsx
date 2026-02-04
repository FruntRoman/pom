// src/features/auth/RequireAuth.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuth();

  if (state.status === "loading") return <div>Loading...</div>;
  if (state.status === "guest") return <Navigate to="/login" />;

  return children;
};
