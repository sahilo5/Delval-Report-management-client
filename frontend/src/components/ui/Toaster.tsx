import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import clsx from "clsx";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

interface ToastContextValue {
    toast: (props: Omit<Toast, "id">) => void;
    dismiss: (id: string) => void;
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

/* -------------------------------------------------------------------------------------------------
 * Provider Component
 * -----------------------------------------------------------------------------------------------*/

export function Toaster({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const toast = useCallback(
        ({ type = "info", duration = 5000, ...props }: Omit<Toast, "id">) => {
            const id = generateId();
            const newToast = { id, type, duration, ...props };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    dismiss(id);
                }, duration);
            }
        },
        [dismiss]
    );

    return (
        <ToastContext.Provider value={{ toast, dismiss }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
}

/* -------------------------------------------------------------------------------------------------
 * UI Components
 * -----------------------------------------------------------------------------------------------*/

interface ToastContainerProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

interface ToastItemProps {
    toast: Toast;
    onDismiss: (id: string) => void;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-danger" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    info: <Info className="w-5 h-5 text-accent" />,
};

const borderColors = {
    success: "border-success/50",
    error: "border-danger/50",
    warning: "border-warning/50",
    info: "border-accent/50",
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
    return (
        <div
            className={clsx(
                "pointer-events-auto flex items-start w-full p-4 rounded-lg bg-surface shadow-lg border border-l-4 animate-in slide-in-from-right-full duration-300",
                borderColors[toast.type] || "border-border"
            )}
            role="alert"
        >
            <div className="flex-shrink-0 pt-0.5">{icons[toast.type]}</div>
            <div className="ml-3 w-0 flex-1">
                {toast.title && (
                    <p className="text-sm font-medium text-text-primary">{toast.title}</p>
                )}
                <p className={clsx("text-sm text-text-muted", toast.title && "mt-1")}>
                    {toast.message}
                </p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
                <button
                    className="inline-flex text-text-muted hover:text-text-primary focus:outline-none"
                    onClick={() => onDismiss(toast.id)}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
