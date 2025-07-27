import { Navigate, useLocation } from "react-router";
import { ReactNode, useEffect, useState } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("accessToken")
    );

    useEffect(() => {
        // re-check token on every location change
        setIsAuthenticated(!!localStorage.getItem("accessToken"));
    }, [location]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
