import clsx from "clsx";
import React from "react";

export type BadgeVariant =
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    text?: string;
    variant?: BadgeVariant;
    children?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    info: "bg-accent/10 text-accent border-accent/20",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
};

export function Badge({
    text,
    variant = "neutral",
    className,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {text || children}
        </span>
    );
}

export default Badge;
