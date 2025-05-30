import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional classes
  type?: string; // If needed
  loading?: boolean; // Loading state
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-neutral-700 text-white shadow-theme-xs hover:bg-neutral-600 disabled:bg-neutral-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  };

  // Spinner for loading state
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-lg transition";
  const disabledClasses = (disabled || loading) ? "cursor-not-allowed opacity-50" : "";

  return (
    <button
      className={twMerge(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabledClasses,
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>{children}</span>
        </>
      ) : (
        <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
