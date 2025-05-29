import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationDropdown from "../header/NotificationDropdown";
import UserDropdown from "../header/UserDropdown";

interface LogoProps {
  src: string;
  darkModeSrc?: string;
  alt: string;
  href?: string;
}

interface AppHeaderProps {
  logo: LogoProps;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserDropdown?: boolean;
  customRightComponent?: React.ReactNode;
  onSidebarToggle?: () => void;
  children?: ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  logo,
  showSearch = true,
  showNotifications = true,
  showUserDropdown = true,
  customRightComponent,
  onSidebarToggle,
  children
}) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onSidebarToggle?.();
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sidebar Toggle Button */}
          <button
            onClick={handleToggle}
            className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white">
                  <span className="absolute right-0 h-full w-full rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white"></span>
                </span>
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white"></span>
                <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white"></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span className="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white"></span>
                <span className="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white"></span>
              </span>
            </span>
          </button>

          {/* Logo */}
          <Link to={logo.href || "/"}>
            <img
              className="dark:hidden"
              src={logo.src}
              alt={logo.alt}
            />
            {logo.darkModeSrc && (
              <img
                className="hidden dark:block"
                src={logo.darkModeSrc}
                alt={logo.alt}
              />
            )}
          </Link>
        </div>

        {children}
      </div>
    </header>
  );
};

export default AppHeader;
