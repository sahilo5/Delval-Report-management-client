import type { AppRoute } from "./types";
import { Role } from "../auth/AuthContext";
import { AssemblyDashboard } from "../pages/dashboard/AssemblyDashboard";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const assemblyEngineerRoutes: AppRoute[] = [
    {
        element: <DashboardLayout />,
        roles: [Role.ASSEMBLY_ENGINEER, Role.ADMIN],
        children: [
            {
                path: "/assembly-engineer/dashboard",
                element: <AssemblyDashboard />,
            },
        ],
    },
];
