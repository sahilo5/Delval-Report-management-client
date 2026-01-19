import React from "react";
import clsx from "clsx";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  inputSize?: InputSize; // renamed from 'size'
  fullWidth?: boolean;
}

const inputSizes: Record<InputSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, inputSize = "md", fullWidth = false, className, ...props }, ref) => (
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
      <input
        ref={ref}
        className={clsx(
          "rounded-lg border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent",
          inputSizes[inputSize],
          error && "border-danger focus:ring-danger",
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
      {error && <span className="mt-1 text-sm text-danger">{error}</span>}
    </div>
  )
);

Input.displayName = "Input";
