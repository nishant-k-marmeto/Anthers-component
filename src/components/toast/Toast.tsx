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

const show = (message: string) => {
  // Create a temporary div for the toast
  const toastContainer = document.createElement('div');
  toastContainer.style.position = 'fixed';
  toastContainer.style.bottom = '20px';
  toastContainer.style.left = '50%';
  toastContainer.style.transform = 'translateX(-50%)';
  toastContainer.style.zIndex = '9999';
  
  document.body.appendChild(toastContainer);

  // Render the toast
  const root = document.createElement('div');
  toastContainer.appendChild(root);
  root.innerHTML = `<div class="inline-flex items-center bg-[#454545] border border-[#454545] rounded-[4px] px-2 py-1 gap-1 text-white text-sm font-normal" style="padding: 4px 8px;">${message}</div>`;

  // Remove after 3 seconds
  setTimeout(() => {
    document.body.removeChild(toastContainer);
  }, 3000);
};

export { show };
export default Toast;
