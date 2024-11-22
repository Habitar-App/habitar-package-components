import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorHelper?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, required, label, type, error, errorHelper, ...props }) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            error ? "border-red-500" : ""
          )}
          {...props}
        />

        {error && errorHelper && (
          <p className="ml-3 mt-1 text-xs text-red-700">{errorHelper}</p>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
