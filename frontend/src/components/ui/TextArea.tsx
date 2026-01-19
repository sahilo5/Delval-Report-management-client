import React from "react";
import clsx from "clsx";

export type TextAreaSize = "sm" | "md" | "lg";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  inputSize?: TextAreaSize;
  fullWidth?: boolean;
}

const textAreaSizes: Record<TextAreaSize, string> = {
  sm: "h-20 px-3 text-sm",
  md: "h-28 px-4 text-base",
  lg: "h-36 px-6 text-lg",
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      <textarea
        ref={ref}
        className={clsx(
          "rounded-lg border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent",
          textAreaSizes[inputSize],
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

TextArea.displayName = "TextArea";
