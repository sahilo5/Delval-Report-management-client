import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { DashboardRedirect } from "./components/DashboardRedirect";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardRedirect />} />

            {appRoutes.map((route, index) => {
                const { path, element, roles, children } = route;

                // Wrapper for layout/protection
                const RouteElement = roles && roles.length > 0 ? (
                    <ProtectedRoute allowedRoles={roles}>
                        {element}
                    </ProtectedRoute>
                ) : (
                    element
                );

                if (children) {
                    return (
                        <Route key={index} path={path} element={RouteElement}>
                            {children.map((child, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={child.path}
                                    element={child.element}
                                />
                            ))}
                        </Route>
                    );
                }

                return <Route key={index} path={path} element={RouteElement} />;
            })}

            {/* Fallback 404 */}
            <Route path="*" element={<div className="p-8 text-center text-xl">404 - Page Not Found</div>} />
        </Routes>
    );
};
