import type { AppRoute } from "./types";
import { Role } from "../auth/AuthContext";
import { AdminDashboard } from "../pages/dashboard/AdminDashboard";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const adminRoutes: AppRoute[] = [
    {
        element: <DashboardLayout />,
        roles: [Role.ADMIN],
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />,
            },
        ],
    },
];
