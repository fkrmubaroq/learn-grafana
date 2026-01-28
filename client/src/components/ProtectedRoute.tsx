import { Navigate } from "react-router-dom";
import { isUserRegistered } from "../utils/userStorage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Component untuk protect routes - hanya bisa diakses jika user sudah terdaftar
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isUserRegistered()) {
    return <Navigate to="/username-entry" replace />;
  }

  return <>{children}</>;
}
