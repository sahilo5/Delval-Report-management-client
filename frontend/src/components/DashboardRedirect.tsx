import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ROLE_DASHBOARD_MAP } from "../utils/navigation";

export const DashboardRedirect = () => {
    const { isAuthenticated, userRole, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated || !userRole) {
        return <Navigate to="/login" replace />;
    }

    const destination = ROLE_DASHBOARD_MAP[userRole];

    if (destination && destination !== "/unauthorized") {
        return <Navigate to={destination} replace />;
    }

    return <Navigate to="/unauthorized" replace />;
};
