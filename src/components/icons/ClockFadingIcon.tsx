import React from 'react';

export const ClockFadingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5" />
      <path 
        d="M12 7V12L15 15" 
        stroke="#6B7280" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M19 12C19 15.866 15.866 19 12 19" 
        stroke="#6B7280" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeDasharray="1 3" 
      />
    </svg>
  );
};

export default ClockFadingIcon;