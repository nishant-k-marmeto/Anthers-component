import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SwitchProps {
  /** Text label displayed next to the switch */
  label: string;
  /** Whether the switch is checked by default */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Function called when the switch state changes */
  onChange?: (checked: boolean) => void;
  /** Color theme of the switch ('blue' or 'gray') */
  color?: "blue" | "gray";
  /** Additional CSS classes */
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue", // Default to blue color
  className = "",
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const trackClasses = twMerge(
    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
    isChecked
      ? "bg-blue-600"
      : "bg-gray-200", // Blue version
    disabled && (isChecked
      ? "bg-gray-800"
      : "bg-gray-200"), // Gray version
    className
  );

  const labelClasses = twMerge(
    "ml-3 text-sm",
    disabled ? "text-gray-400" : "text-gray-700"
  );

  const thumbClasses = twMerge(
    "inline-block h-4 w-4 transform rounded-full bg-white transition",
    isChecked ? "translate-x-6" : "translate-x-1",
    disabled && "bg-gray-100 pointer-events-none"
  );

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${labelClasses}`}
      onClick={handleToggle} // Toggle when the label itself is clicked
    >
      <div className="relative">
        <div
          className={trackClasses}
        ></div>
        <div
          className={thumbClasses}
        ></div>
      </div>
      {label}
    </label>
  );
};

export default Switch;
