import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/provider/RotaAutenticada";

export const ProtectedRoute = () => {
    const { token } = useAuth();
  
    if (!token) {
      return <Navigate to="/cadastro" />;
    }
    return <Outlet />;
  };