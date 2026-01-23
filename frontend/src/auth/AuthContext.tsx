import React, { createContext, useState, useEffect, type ReactNode } from "react";

// Matches backend Role enum

export const Role = {
    USER: "USER",
    ASSEMBLY_ENGINEER: "ASSEMBLY_ENGINEER",
    ASSEMBLER: "ASSEMBLER",
    TESTER: "TESTER",
    PAINTING_ENGINEER: "PAINTING_ENGINEER",
    PAINTER: "PAINTER",
    BLASTER: "BLASTER",
    NAME_PLATE_PRINTER: "NAME_PLATE_PRINTER",
    FINISHER: "FINISHER",
    QA_ENGINEER: "QA_ENGINEER",
    ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

interface AuthState {
    accessToken: string | null;
    username: string | null;
    userRole: Role | null;
    isAuthenticated: boolean;
    loading: boolean;
}

interface LoginResponse {
    accessToken: string;
    username: string;
    userRole: Role;
    tokenType?: string;
}

interface AuthContextType extends AuthState {
    login: (data: LoginResponse) => void;
    logout: () => void;
    updateToken: (newToken: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        accessToken: null,
        username: null,
        userRole: null,
        isAuthenticated: false,
        loading: true,
    });

    useEffect(() => {
        // Initialize from localStorage
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("userRole") as Role;
        const user = localStorage.getItem("username");

        if (token && role && user && Object.values(Role).includes(role as Role)) {
            setState({
                accessToken: token,
                userRole: role as Role,
                username: user,
                isAuthenticated: true,
                loading: false,
            });
        } else {
            // Clear invalid session data if role is invalid
            if (role && !Object.values(Role).includes(role as Role)) {
                localStorage.removeItem("userRole");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
            }
            setState((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    const login = (data: LoginResponse) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userRole", data.userRole);

        setState({
            accessToken: data.accessToken,
            username: data.username,
            userRole: data.userRole,
            isAuthenticated: true,
            loading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");

        setState({
            accessToken: null,
            username: null,
            userRole: null,
            isAuthenticated: false,
            loading: false,
        });
    };

    const updateToken = (newToken: string) => {
        localStorage.setItem("accessToken", newToken);
        setState(prev => ({ ...prev, accessToken: newToken }));
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
};
