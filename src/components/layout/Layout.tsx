import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { MenuItem } from '../sidebar/Sidebar';

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
  menuItems = []
}) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
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
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 