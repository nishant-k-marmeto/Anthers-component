import React from 'react';

interface PageHeadingDescProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeadingDesc: React.FC<PageHeadingDescProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
};

export default PageHeadingDesc;