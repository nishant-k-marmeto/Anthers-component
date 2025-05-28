import { Link } from "react-router-dom";

interface InsightCardProps {
  /** Icon component to display */
  icon: React.ReactNode;
  /** Main title of the card */
  title: string;
  /** Description text below title */
  description: string;
  /** Text to display on the action button */
  buttonText: string;
  /** URL to navigate to when clicked */
  linkTo: string;
  /** Optional background color for the icon container */
  iconBgColor?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional className for additional styling */
  className?: string;
  /** Optional trend value to display (+12%, -5%, etc.) */
  trendValue?: string;
  /** Optional trend direction ('up' | 'down' | 'neutral') */
  trendDirection?: 'up' | 'down' | 'neutral';
  /** Optional data visualization component */
  visualElement?: React.ReactNode;
  /** Card variant - 'default' or 'data' for analytics style */
  variant?: 'default' | 'data';
}

export const InsightCard = ({
  icon,
  title,
  description,
  buttonText,
  linkTo,
  iconBgColor = "bg-emerald-50",
  onClick,
  className = "",
  trendValue,
  trendDirection,
  visualElement,
  variant = 'default',
}: InsightCardProps) => {
  
  // Return data visualization focused card
  if (variant === 'data') {
    return (
      <div 
        className={`rounded-xl border border-gray-200/80 bg-white p-6
          shadow-sm backdrop-blur-sm transition-all duration-300
          hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px]
          dark:border-gray-800/80 dark:bg-gray-900/30 dark:hover:border-gray-700
          ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Header with icon and trend */}
          <div className="flex items-center justify-between mb-4">
            <div className={`size-10 rounded-lg ${iconBgColor} flex items-center justify-center`}>
              <div className="relative z-10">
                {icon}
              </div>
            </div>
            
            {trendValue && (
              <div className={`px-2 py-1 rounded-md text-xs font-medium
                ${trendDirection === 'up' ? 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400' : 
                  trendDirection === 'down' ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' : 
                  'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
              >
                {trendValue}
              </div>
            )}
          </div>
          
          {/* Title and description */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          </div>
          
          {/* Visualization area */}
          {visualElement ? (
            <div className="my-3 h-24 w-full">
              {visualElement}
            </div>
          ) : (
            <div className="my-3 h-24 w-full bg-gray-50 rounded-lg dark:bg-gray-800/50 flex items-center justify-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div 
                    key={i}
                    className={`w-1.5 rounded-t-sm ${
                      iconBgColor.includes('emerald') ? 'bg-emerald-400' :
                      iconBgColor.includes('blue') ? 'bg-blue-400' :
                      iconBgColor.includes('purple') ? 'bg-purple-400' :
                      iconBgColor.includes('pink') ? 'bg-pink-400' :
                      iconBgColor.includes('amber') ? 'bg-amber-400' :
                      'bg-gray-400'
                    } dark:opacity-80`}
                    style={{ 
                      height: `${15 + Math.random() * 40}px`,
                      opacity: 0.6 + (i * 0.05)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Button */}
          <Link 
            to={linkTo}
            onClick={onClick}
            className="mt-auto inline-flex w-full items-center justify-center rounded-lg 
              border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium 
              text-gray-800 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900
              active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200/50 focus:ring-offset-1
              dark:border-gray-700/80 dark:bg-gray-800/50 dark:text-gray-200 
              dark:hover:bg-gray-800/80 dark:hover:text-white dark:focus:ring-gray-700/50"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    );
  }
  
  // Return default card
  return (
    <div 
      className={`rounded-xl border border-gray-200/80 bg-white p-6
        shadow-sm backdrop-blur-sm transition-all duration-300
        hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px]
        dark:border-gray-800/80 dark:bg-gray-900/30 dark:hover:border-gray-700
        ${className}`}
    >
      <div className="flex flex-col gap-5">
        {/* Icon Section - Enhanced with subtle shadow and glow */}
        <div className={`size-14 rounded-xl ${iconBgColor} flex items-center justify-center
          shadow-sm relative overflow-hidden group-hover:shadow-inner
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent`}>
          <div className="relative z-10">
            {icon}
          </div>
        </div>

        {/* Content Section - Improved typography and spacing */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight">
            {title}
          </h3>
          <p className="text-sm/relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action Button - More refined with subtle animation */}
        <Link 
          to={linkTo}
          onClick={onClick}
          className="mt-auto inline-flex w-full items-center justify-center rounded-lg 
            border border-gray-200 bg-white/90 px-4 py-2.5 text-sm font-medium 
            text-gray-800 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900
            active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200/50 focus:ring-offset-1
            dark:border-gray-700/80 dark:bg-gray-800/50 dark:text-gray-200 
            dark:hover:bg-gray-800/80 dark:hover:text-white dark:focus:ring-gray-700/50"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

// Usage example:
/**
 * InsightCard Component Usage Examples
 * ------------------------------------
 * 
 * The InsightCard component comes in two variants:
 * 1. Default - A standard card for general insights and actions
 * 2. Data - Analytics-focused card with trend indicators and data visualization
 * 
 * Below are examples of how to use each variant with different options.
 */

/**
 * Example 1: Basic default card
 * -----------------------------
 * 
 * import { FiTrendingUp } from 'react-icons/fi';
 * import { InsightCard } from '../components/common/InsightCards';
 * 
 * <InsightCard
 *   icon={<FiTrendingUp className="size-6 text-emerald-600" />}
 *   title="Acquisition Trends"
 *   description="Track customer acquisition metrics and sources"
 *   buttonText="View Insights"
 *   linkTo="/insights/acquisition"
 *   iconBgColor="bg-emerald-50"
 * />
 */

/**
 * Example 2: Default card with custom onclick handler
 * --------------------------------------------------
 * 
 * import { FiUsers } from 'react-icons/fi';
 * 
 * <InsightCard
 *   icon={<FiUsers className="size-6 text-blue-600" />}
 *   title="User Engagement"
 *   description="Analyze user behavior patterns and engagement levels"
 *   buttonText="Explore Data"
 *   linkTo="/insights/users"
 *   iconBgColor="bg-blue-50"
 *   onClick={() => {
 *     // Custom action before navigation
 *     console.log('Card clicked');
 *     // You can add analytics tracking, state updates, etc.
 *   }}
 * />
 */

/**
 * Example 3: Data visualization card with trend indicator
 * ------------------------------------------------------
 * 
 * import { FiDollarSign } from 'react-icons/fi';
 * 
 * <InsightCard
 *   variant="data"
 *   icon={<FiDollarSign className="size-5 text-emerald-600" />}
 *   title="Revenue Growth"
 *   description="Monthly revenue growth rate across all channels"
 *   buttonText="View Details"
 *   linkTo="/insights/revenue"
 *   iconBgColor="bg-emerald-50"
 *   trendValue="+12.5%"
 *   trendDirection="up"
 * />
 */

/**
 * Example 4: Data card with custom visualization element
 * -----------------------------------------------------
 * 
 * import { FiActivity } from 'react-icons/fi';
 * 
 * // A custom visualization component
 * const LineChart = () => (
 *   <svg viewBox="0 0 100 40" className="w-full h-full">
 *     <path
 *       d="M0,20 L10,15 L20,25 L30,10 L40,20 L50,15 L60,30 L70,25 L80,15 L90,20 L100,10"
 *       fill="none"
 *       stroke="#db2777"
 *       strokeWidth="2"
 *       strokeLinecap="round"
 *     />
 *   </svg>
 * );
 * 
 * <InsightCard
 *   variant="data"
 *   icon={<FiActivity className="size-5 text-pink-600" />}
 *   title="Conversion Rate"
 *   description="Visitor to customer conversion percentage"
 *   buttonText="View Details"
 *   linkTo="/insights/conversion"
 *   iconBgColor="bg-pink-50"
 *   trendValue="+3.7%"
 *   trendDirection="up"
 *   visualElement={<LineChart />}
 * />
 */

/**
 * Example 5: Data card with negative trend
 * ---------------------------------------
 * 
 * import { FiPieChart } from 'react-icons/fi';
 * 
 * <InsightCard
 *   variant="data"
 *   icon={<FiPieChart className="size-5 text-purple-600" />}
 *   title="Churn Rate"
 *   description="Monthly customer churn rate analysis"
 *   buttonText="View Details"
 *   linkTo="/insights/churn"
 *   iconBgColor="bg-purple-50"
 *   trendValue="-2.3%"
 *   trendDirection="down"
 * />
 */
