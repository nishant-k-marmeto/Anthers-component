import React from 'react';

interface ToastProps {
  children: React.ReactNode;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({ children, className = '' }) => (
  <div
    className={`inline-flex items-center bg-[#454545] border border-[#454545] rounded-[4px] px-2 py-1 gap-1 text-white text-sm font-normal ${className}`}
    style={{ paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, gap: 4 }}
  >
    {children}
  </div>
);

export default Toast;
