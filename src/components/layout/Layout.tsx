import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { MenuItem } from '../sidebar/Sidebar';
import { FiHome, FiPieChart, FiBriefcase, FiMail, FiDollarSign, FiSettings, FiBook, FiMonitor, FiShoppingBag, FiPackage } from 'react-icons/fi';

const defaultMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <FiHome className="w-5 h-5" />,
    href: '/home'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <FiPieChart className="w-5 h-5" />,
    subItems: [
      {
        id: 'business',
        label: 'Business',
        icon: <FiBriefcase className="w-4 h-4" />,
        href: '/analytics/business'
      },
      {
        id: 'marketing',
        label: 'Marketing',
        icon: <FiMail className="w-4 h-4" />,
        href: '/analytics/marketing'
      },
      {
        id: 'finance',
        label: 'Finance',
        icon: <FiDollarSign className="w-4 h-4" />,
        href: '/analytics/finance'
      },
      {
        id: 'operations',
        label: 'Operations',
        icon: <FiSettings className="w-4 h-4" />,
        href: '/analytics/operations'
      }
    ]
  },
  {
    id: 'catalogue',
    label: 'Catalogue',
    icon: <FiBook className="w-5 h-5" />,
    href: '/catalogue'
  },
  {
    id: 'tech',
    label: 'Tech',
    icon: <FiMonitor className="w-5 h-5" />,
    href: '/tech'
  },
  {
    id: 'merchandise',
    label: 'Merchandise',
    icon: <FiShoppingBag className="w-5 h-5" />,
    href: '/merchandise'
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <FiPackage className="w-5 h-5" />,
    href: '/inventory'
  }
];

interface AppLayoutProps {
  children: React.ReactNode;
  searchData?: any[];
  onSearch?: (results: any[]) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  notifications?: {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
  }[];
  menuItems?: MenuItem[];
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  searchData = [],
  onSearch,
  user,
  notifications = [],
  menuItems = defaultMenuItems
}) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        logo={{
          src: "https://vision.anthers.com/images/logo/logo-anthers.png",
          alt: "Anthers Logo"
        }}
        menuItems={menuItems}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchData={searchData}
          onSearch={onSearch}
          user={user}
          notifications={notifications}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 