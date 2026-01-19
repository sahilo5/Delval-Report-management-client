import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/* ----------------------------------
   Base styles (shared across variants)
----------------------------------- */
const baseStyles =
  "inline-flex items-center justify-center rounded-lg font-medium " +
  "transition-colors duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

/* ----------------------------------
   Size styles
----------------------------------- */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/* ----------------------------------
   Variant styles (theme-driven)
----------------------------------- */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90 focus:ring-primary",

  secondary:
    "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary",

  success:
    "bg-success text-white hover:bg-success/90 focus:ring-success",

  warning:
    "bg-warning text-white hover:bg-warning/90 focus:ring-warning",

  danger:
    "bg-danger text-white hover:bg-danger/90 focus:ring-danger",

  ghost:
    "bg-transparent text-text-primary hover:bg-slate-100 focus:ring-slate-300",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
}
