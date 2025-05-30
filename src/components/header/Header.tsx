import React from 'react';
import SearchMain from './SearchMain';
import UserDropdown from './UserDropdown';
import NotificationBell from './NotificationBell';

interface HeaderProps {
  onSearch?: (results: any[]) => void;
  searchData?: any[];
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
  className?: string;
}

const Header = ({
  onSearch,
  searchData = [],
  user,
  notifications = [],
  className = ''
}: HeaderProps) => {
  return (
    <header className={`flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex-1 max-w-2xl">
        <SearchMain
          data={searchData}
          onSearch={onSearch}
          placeholder="Search or type command..."
          searchKeys={['name', 'description']}
        />
      </div>
      
      <div className="flex items-center gap-4">
        <NotificationBell notifications={notifications} />
        <UserDropdown user={user} />
      </div>
    </header>
  );
};

export default Header; 