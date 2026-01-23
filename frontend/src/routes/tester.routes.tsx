import type { AppRoute } from "./types";
import { Role } from "../auth/AuthContext";
import { TesterDashboard } from "../pages/dashboard/TesterDashboard";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const testerRoutes: AppRoute[] = [
    {
        element: <DashboardLayout />,
        roles: [Role.TESTER, Role.QA_ENGINEER, Role.ADMIN],
        children: [
            {
                path: "/tester/dashboard",
                element: <TesterDashboard />,
            },
        ],
    },
];
