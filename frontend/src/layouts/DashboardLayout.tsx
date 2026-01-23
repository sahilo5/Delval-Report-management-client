import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { Role } from '../auth/AuthContext';
import {
    Settings,
    LogOut,
    Menu,
    User,
    Wrench,
    ClipboardList,
    CheckCircle,
    Shield
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import clsx from 'clsx';

interface SidebarItem {
    to: string;
    icon: React.ElementType;
    label: string;
    roles: Role[];
}

const sidebarItems: SidebarItem[] = [
    {
        to: '/admin/dashboard',
        icon: Shield,
        label: 'Admin Overview',
        roles: [Role.ADMIN]
    },
    {
        to: '/assembly-engineer/dashboard',
        icon: Wrench,
        label: 'Assembly Management',
        roles: [Role.ASSEMBLY_ENGINEER, Role.ADMIN]
    },
    {
        to: '/assembler/actuator/form',
        icon: ClipboardList,
        label: 'Assembler Tasks',
        roles: [Role.ASSEMBLER, Role.ASSEMBLY_ENGINEER, Role.ADMIN]
    },
    {
        to: '/tester/dashboard',
        icon: CheckCircle,
        label: 'Quality Testing',
        roles: [Role.TESTER, Role.QA_ENGINEER, Role.ADMIN]
    },
];

export function DashboardLayout() {
    const { userRole, username, logout } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredItems = sidebarItems.filter(item =>
        userRole && item.roles.includes(userRole)
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transform-none",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-primary">ERP System</span>
                </div>

                <nav className="p-4 space-y-1">
                    {filteredItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{username}</p>
                            <p className="text-xs text-gray-500 truncate">{userRole}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        fullWidth
                        onClick={handleLogout}
                        className="justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
