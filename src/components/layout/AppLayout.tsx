import React, { ReactNode } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import Backdrop from './Backdrop';

interface LogoProps {
  src: string;
  darkModeSrc?: string;
  alt: string;
  href?: string;
}

interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
  subItems?: Array<{
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }>;
}

interface AppLayoutProps {
  children?: ReactNode;
  logo?: LogoProps;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserDropdown?: boolean;
  customHeaderComponent?: ReactNode;
  customSidebarContent?: ReactNode;
  className?: string;
  menuItems?: NavItem[];
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  logo = {
    src: '/logo.svg',
    alt: 'Logo'
  },
  showSearch = true,
  showNotifications = true,
  showUserDropdown = true,
  customHeaderComponent,
  customSidebarContent,
  className = '',
  menuItems,
}) => {
  const { isExpanded, isHovered, isMobileOpen, toggleSidebar } = useSidebar();

  return (
    <div className={`flex h-screen overflow-hidden ${className}`}>
      <AppSidebar menuItems={menuItems}>
        {customSidebarContent}
      </AppSidebar>

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <AppHeader
          logo={logo}
          showSearch={showSearch}
          showNotifications={showNotifications}
          showUserDropdown={showUserDropdown}
          onSidebarToggle={toggleSidebar}
        >
          {customHeaderComponent}
        </AppHeader>

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>

      <Backdrop />
    </div>
  );
};

export default AppLayout;
