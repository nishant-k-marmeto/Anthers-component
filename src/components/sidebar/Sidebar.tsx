import React, { ReactElement, useState } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactElement;
  href?: string;
  subItems?: MenuItem[];
  isExpanded?: boolean;
}

interface SidebarProps {
  logo: {
    src: string;
    alt: string;
  };
  menuItems: MenuItem[];
  className?: string;
}

const MenuItemComponent: React.FC<{
  item: MenuItem;
  level?: number;
}> = ({ item, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(item.isExpanded || false);
  const hasSubItems = Boolean(item.subItems?.length);

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-4' : ''}`}>
      <a
        href={item.href || '#'}
        onClick={handleClick}
        className={`
          flex items-center justify-between px-3 py-2 rounded-lg
          ${level === 0 ? 'text-gray-700' : 'text-gray-600'}
          ${hasSubItems ? 'hover:bg-gray-100' : 'hover:bg-gray-100'}
          transition-colors duration-150 ease-in-out
          ${isExpanded ? 'bg-gray-100' : ''}
        `}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span className={`text-sm ${level === 0 ? 'font-medium' : ''}`}>
            {item.label}
          </span>
        </div>
        {hasSubItems && (
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'transform rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </a>
      {hasSubItems && isExpanded && item.subItems && (
        <div className="mt-1 space-y-1">
          {item.subItems.map((subItem) => (
            <MenuItemComponent
              key={subItem.id}
              item={subItem}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ logo, menuItems, className = '' }) => {
  return (
    <aside className={`w-64 h-screen bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="flex items-center justify-center border-gray-200">
        <img 
          src={logo.src} 
          alt={logo.alt} 
          className="h-fit"
        />
      </div>

      {/* Menu Title */}
      <div className="px-4 py-3">
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          MENU
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 