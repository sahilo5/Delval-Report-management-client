import type { AppRoute } from "./types";
import Login from "../pages/auth/Login";
import { Unauthorized } from "../pages/Unauthorized";

export const authRoutes: AppRoute[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
];
