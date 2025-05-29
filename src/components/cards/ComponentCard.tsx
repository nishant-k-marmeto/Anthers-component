import React, { ReactNode, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ComponentCardProps {
  title: string;
  children: ReactNode;
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  className?: string; // Additional custom classes for styling
  status?: ReactNode;
  desc?: string; // Description text
}

const ComponentCard: FC<ComponentCardProps> = ({
  title,
  children,
  startIcon,
  endIcon,
  className = "",
  status,
  desc = "",
}) => {
  // Base classes for main container
  const containerClasses = twMerge(
    "rounded-2xl border border-gray-200 bg-white",
    className
  );

  // Base classes for header title
  const titleClasses = twMerge(
    "text-base font-medium text-gray-800"
  );

  // Base classes for description
  const descClasses = twMerge(
    "mt-1 text-sm text-gray-500"
  );

  // Base classes for body container
  const bodyClasses = twMerge(
    "p-4 border-t border-gray-100 sm:p-6"
  );

  return (
    <div className={containerClasses}>
      {/* Card Header */}
      <div className="px-6 py-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            <h3 className={titleClasses}>{title}</h3>
            {endIcon && <span className="flex items-center">{endIcon}</span>}
          </div>
          {status && (
            <div>
              <span className="flex items-center">{status}</span>
            </div>
          )}
        </div>
        {desc && <p className={descClasses}>{desc}</p>}
      </div>

      {/* Card Body */}
      <div className={bodyClasses}>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
