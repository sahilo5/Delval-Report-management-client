import React from "react";
import clsx from "clsx";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex items-center space-x-2">
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          "h-4 w-4 rounded border-border bg-surface text-primary focus:ring-2 focus:ring-accent",
          className
        )}
        {...props}
      />
      {label && <span className="text-text-primary">{label}</span>}
      {error && <span className="ml-2 text-sm text-danger">{error}</span>}
    </div>
  )
);

Checkbox.displayName = "Checkbox";
