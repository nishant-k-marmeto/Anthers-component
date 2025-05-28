import { useState, useEffect, useRef } from "react";
import { format, subDays, isAfter, startOfDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiX, FiArrowRight } from "../icons";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface DateRangePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onRangeSelect?: (range: DateRange) => void;
  className?: string;
  initialRange?: DateRange;
  position?: "top" | "bottom" | "left" | "right";
}

const presets = [
  { label: "Today", days: 0 },
  { label: "Last 7 Days", days: 7 },
  { label: "Last 30 Days", days: 30 },
  { label: "Last 90 Days", days: 90 },
  { label: "Custom", days: null },
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  isOpen,
  onClose,
  onRangeSelect,
  className = "",
  initialRange,
  position = "bottom",
}) => {
  // State for managing selected preset and date range
  const [selectedPreset, setSelectedPreset] = useState<string>("Today");
  const [customRange, setCustomRange] = useState<DateRange>(
    initialRange || {
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    }
  );
  const pickerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current && 
        !pickerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle preset selection
  const handlePresetSelect = (preset: { label: string; days: number | null }) => {
    setSelectedPreset(preset.label);
    
    if (preset.days !== null) {
      const endDate = new Date();
      const startDate = subDays(endDate, preset.days);
      
      const newRange = {
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };
      
      setCustomRange(newRange);
      onRangeSelect?.(newRange);
    }
  };

  // Handle custom date changes
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setCustomRange((prev) => {
      const newRange = { ...prev, [name]: value };
      
      // Ensure end date is not before start date
      if (
        name === "endDate" && 
        isAfter(startOfDay(new Date(prev.startDate)), startOfDay(new Date(value)))
      ) {
        return { ...prev, endDate: prev.startDate };
      }
      
      // Ensure start date is not after end date
      if (
        name === "startDate" && 
        isAfter(startOfDay(new Date(value)), startOfDay(new Date(prev.endDate)))
      ) {
        return { ...prev, startDate: prev.endDate };
      }
      
      onRangeSelect?.(newRange);
      return newRange;
    });
  };

  // Handle applying the selected range
  const handleApply = () => {
    onRangeSelect?.(customRange);
    onClose();
  };

  // Determine position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top": return "bottom-full mb-2";
      case "left": return "right-0 mr-2";
      case "right": return "left-0 ml-2";
      case "bottom":
      default: return "top-full mt-2";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={pickerRef}
          className={`absolute ${getPositionClasses()} z-50 ${className}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-72 sm:w-80">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-base font-medium text-gray-700 dark:text-gray-200 flex items-center">
                <FiCalendar className="mr-2 text-blue-500" />
                Select Date Range
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close date picker"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Presets */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      selectedPreset === preset.label
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => handlePresetSelect(preset)}
                    aria-pressed={selectedPreset === preset.label}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Inputs */}
            <div className="p-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={customRange.startDate}
                    onChange={handleCustomChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    aria-label="Start date"
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 relative flex items-center justify-center">
                    <FiArrowRight className="absolute text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-1 rounded-full" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={customRange.endDate}
                    onChange={handleCustomChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    aria-label="End date"
                  />
                </div>
              </div>
              
              {/* Selected Range Display */}
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
                <span className="font-semibold">Selected Range:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {format(new Date(customRange.startDate), "MMM dd, yyyy")} — {format(new Date(customRange.endDate), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DateRangePicker;