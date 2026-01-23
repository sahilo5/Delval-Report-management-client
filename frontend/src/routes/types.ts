import type { ReactNode } from "react";
import type { Role } from "../auth/AuthContext";

export interface AppRoute {
    path?: string;
    element: ReactNode;
    roles?: Role[]; // If undefined, route is public (or protected by parent)
    children?: AppRoute[];
}
