import type { AppRoute } from "./types";
import { Role } from "../auth/AuthContext";
import { AssemblerDashboard } from "../pages/dashboard/AssemblerDashboard";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const assemblerRoutes: AppRoute[] = [
    {
        element: <DashboardLayout />,
        roles: [Role.ASSEMBLER, Role.ASSEMBLY_ENGINEER, Role.ADMIN],
        children: [
            {
                path: "/assembler/actuator/form",
                element: <AssemblerDashboard />,
            },
        ],
    },
];
