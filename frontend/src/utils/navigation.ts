import { Role } from "../auth/AuthContext";

export const ROLE_DASHBOARD_MAP: Record<Role, string> = {
    [Role.ADMIN]: "/admin/dashboard",
    [Role.ASSEMBLY_ENGINEER]: "/assembly-engineer/dashboard",
    [Role.ASSEMBLER]: "/assembler/actuator/form", // Default assembler view
    [Role.TESTER]: "/tester/dashboard",
    [Role.QA_ENGINEER]: "/tester/dashboard", // QA shares tester view for now, update if specific QA dashboard exists
    // Roles without specific dashboards can route to unauthorized or a default
    [Role.USER]: "/unauthorized",
    [Role.PAINTING_ENGINEER]: "/unauthorized",
    [Role.PAINTER]: "/unauthorized",
    [Role.BLASTER]: "/unauthorized",
    [Role.NAME_PLATE_PRINTER]: "/unauthorized",
    [Role.FINISHER]: "/unauthorized",
};
