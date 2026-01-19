import React from "react";
import clsx from "clsx";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

const selectSizes: Record<NonNullable<SelectProps["inputSize"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, required, error, fullWidth = false, inputSize = "md", className, children, ...props }, ref) => (
    <div className={clsx("flex flex-col", fullWidth && "w-full")}>
      {label && (
        <label
          className={clsx(
            "mb-1 font-medium text-text-primary",
            required && "after:content-['*'] after:ml-0.5 after:text-danger"
          )}
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          "rounded-lg border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent",
          selectSizes[inputSize],
          error && "border-danger focus:ring-danger",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="mt-1 text-sm text-danger">{error}</span>}
    </div>
  )
);

Select.displayName = "Select";
