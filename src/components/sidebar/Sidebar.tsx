import React, { ReactElement } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactElement;
  href: string;
  subItems?: MenuItem[];
}

interface SidebarProps {
  logo: {
    src: string;
    alt: string;
  };
  menuItems: MenuItem[];
  className?: string;
}

const Sidebar = ({ logo, menuItems, className = '' }: SidebarProps) => {
  return (
    <aside className={`w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${className}`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <img src={logo.src} alt={logo.alt} className="h-8" />
      </div>

      {/* Menu Items */}
      <nav className="mt-6 px-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-4">
            <a
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </a>

            {item.subItems && item.subItems.length > 0 && (
              <div className="ml-6 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={subItem.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {subItem.icon}
                    <span>{subItem.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 