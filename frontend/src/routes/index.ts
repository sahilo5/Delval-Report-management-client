import type { AppRoute } from "./types";
import { authRoutes } from "./auth.routes";
import { assemblyEngineerRoutes } from "./assemblyEngineer.routes";
import { assemblerRoutes } from "./assembler.routes";
import { testerRoutes } from "./tester.routes";
import { adminRoutes } from "./admin.routes";

export const appRoutes: AppRoute[] = [
    ...authRoutes,
    ...assemblyEngineerRoutes,
    ...assemblerRoutes,
    ...testerRoutes,
    ...adminRoutes,
];
