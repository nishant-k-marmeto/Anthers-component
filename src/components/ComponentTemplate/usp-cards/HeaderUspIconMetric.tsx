import React, { useState, memo } from 'react';
import Badge from '../../badge/Badge';
import { DropdownItem } from '../../dropdown/DropdownItem';
import { Dropdown } from '../../dropdown/Dropdown';
import { MoreDotIcon, IoSparklesOutline } from '../../icons';

interface HeaderUspIconMetricProps {
    /** Icon component to display */
    Icon: React.ReactNode;
    /** Title of the metric */
    title: string;
    /** Value to display */
    value: number | string;
    /** Percentage change (positive or negative) */
    percentageChange: number;
    /** Whether the change is positive (up) or negative (down) */
    isPositive?: boolean;
    /** Whether to show the AI insights tool */
    showAIInsights?: boolean;
}

const HeaderUspIconMetric = memo(({
    Icon,
    title,
    value,
    percentageChange,
    isPositive = true,
    showAIInsights = false
}: HeaderUspIconMetricProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Format the percentage to 2 decimal places and remove negative sign
    const formattedPercentage = Math.abs(percentageChange).toFixed(2);
    
    // Determine sign symbol based on whether the change is positive
    const signSymbol = isPositive ? "+" : "-";
    
    // Determine badge color based on positive/negative change
    const badgeColor = isPositive ? 'success' : 'error';

    const toggleDropdown = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);

    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-white/[0.03] md:p-6">
            <div className="flex justify-between items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105 dark:bg-gray-800">
                    {Icon}
                </div>
                <div className="relative inline-block dark:text-white">
                    <button 
                        className="dropdown-toggle p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                        onClick={toggleDropdown}
                        aria-label="More options"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                    >
                        <MoreDotIcon />
                    </button>
                    <Dropdown
                        isOpen={isOpen}
                        onClose={closeDropdown}
                        className="w-44 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full px-3 py-2 text-sm font-medium text-left text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        >
                            View More
                        </DropdownItem>

                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full px-3 py-2 text-sm font-medium text-left text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        >
                            Download Report
                        </DropdownItem>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full px-3 py-2 text-sm font-medium text-left text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        >
                            Delete
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className="mt-5">
                <div className="space-y-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </span>
                    <div className="flex items-center gap-2">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                            {value}
                        </h4>
                        <Badge 
                            color={badgeColor}
                            startIcon={<span className="font-medium">{signSymbol}</span>}
                            size="sm"
                        >
                            <span aria-label={`${formattedPercentage}% ${isPositive ? 'increase' : 'decrease'}`}>
                                {formattedPercentage}%
                            </span>
                        </Badge>
                    </div>
                </div>
            </div>
            
            {/* AI Insights Tool */}
            {showAIInsights && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-500 cursor-pointer hover:text-brand-600 transition-colors dark:text-brand-400 dark:hover:text-brand-300">
                    <IoSparklesOutline className="w-4 h-4" />
                    <span>Get Insights with AI</span>
                </div>
            )}
        </div>
    );
});

HeaderUspIconMetric.displayName = 'HeaderUspIconMetric';

export default HeaderUspIconMetric;


/**
 * HeaderUspIconMetric Component
 * 
 * A reusable metric card that displays a key performance indicator with an icon, 
 * a title, a value, and a percentage change indicator.
 * 
 * Features:
 * - Shows positive or negative trends with "+" or "-" symbols
 * - Includes a dropdown menu for additional actions
 * - Optional AI insights tool feature
 * - Fully responsive with proper dark mode support
 * - Accessible with proper ARIA attributes
 * 
 * Example Usage:
 * ```tsx
 * import HeaderUspIconMetric from './components/common/HeaderUspIconMetric';
 * import { CreditCardIcon } from '../../icons';
 * 
 * const DashboardMetrics = () => {
 *   return (
 *     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *       <HeaderUspIconMetric
 *         Icon={<CreditCardIcon className="w-6 h-6 text-blue-600" />}
 *         title="Total Revenue"
 *         value="$24,780"
 *         percentageChange={12.5}
 *         isPositive={true}
 *         showAIInsights={true}
 *       />
 *       
 *       <HeaderUspIconMetric
 *         Icon={<UserIcon className="w-6 h-6 text-purple-600" />}
 *         title="New Customers"
 *         value={1234}
 *         percentageChange={7.2}
 *         isPositive={true}
 *       />
 *       
 *       <HeaderUspIconMetric
 *         Icon={<ShoppingBagIcon className="w-6 h-6 text-red-600" />}
 *         title="Refunds"
 *         value="$1,245"
 *         percentageChange={3.8}
 *         isPositive={false}
 *         showAIInsights={true}
 *       />
 *     </div>
 *   );
 * };
 * ```
 * 
 * Props:
 * - Icon: React.ReactNode - Icon component to display
 * - title: string - Title of the metric
 * - value: number | string - Value to display (can be formatted as needed)
 * - percentageChange: number - Percentage change to display
 * - isPositive: boolean - Whether the change is positive (up) or negative (down)
 * - showAIInsights: boolean - Whether to show the AI insights tool (defaults to false)
 */
