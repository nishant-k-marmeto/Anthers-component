import React, { useState, useRef, useEffect } from 'react';

interface UserDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    setIsOpen(false);
  }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-semibold text-gray-600">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Profile Settings
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Account Settings
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 