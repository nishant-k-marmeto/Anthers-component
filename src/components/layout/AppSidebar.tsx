import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

// Icons Components
const BoxCubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25L3 5.5V18.5L12 22.75L21 18.5V5.5L12 1.25ZM19.5 6.5L12 3.25L4.5 6.5L12 9.75L19.5 6.5ZM4.5 17.5L11.25 20.25V11.25L4.5 8.5V17.5ZM12.75 20.25L19.5 17.5V8.5L12.75 11.25V20.25Z" fill="currentColor"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 2V4H16V2H18V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H6V2H8ZM19 20V9H5V20H19ZM19 7H5V6H19V7ZM7 11H9V13H7V11ZM13 11H11V13H13V11ZM15 11H17V13H15V11ZM7 15H9V17H7V15ZM13 15H11V17H13V15ZM15 15H17V17H15V15Z" fill="currentColor"/>
  </svg>
);

const ChevronDownIcon = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15.5L4.5 8L5.5 7L12 13.5L18.5 7L19.5 8L12 15.5Z" fill="currentColor"/>
  </svg>
);

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 3H10V10H3V3ZM5 5V8H8V5H5ZM3 14H10V21H3V14ZM5 16V19H8V16H5ZM14 3H21V10H14V3ZM16 5V8H19V5H16ZM14 14H21V21H14V14ZM16 16V19H19V16H16Z" fill="currentColor"/>
  </svg>
);

const HorizontalDots = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12Z" fill="currentColor"/>
  </svg>
);

const defaultIcons = {
  BoxCubeIcon,
  CalendarIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontalDots,
  ListIcon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 7H21V9H3V7ZM3 11H21V13H3V11ZM3 15H21V17H3V15Z" fill="currentColor"/>
    </svg>
  ),
  PageIcon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 3H17L21 7V21H3V3H7ZM5 5V19H19V8L16 5H5ZM15 4H8V7H16V4H15ZM7 9H17V11H7V9ZM7 13H17V15H7V13ZM7 17H13V19H7V17Z" fill="currentColor"/>
    </svg>
  ),
  TableIcon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 3H21V21H3V3ZM5 5V11H11V5H5ZM13 5V11H19V5H13ZM19 13H13V19H19V13ZM11 19V13H5V19H11Z" fill="currentColor"/>
    </svg>
  ),
  UserCircleIcon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.0289 19.2447 15.8813 18.0001 17.2916C16.4085 15.8674 14.3052 15 12 15C9.69475 15 7.59147 15.8674 5.99991 17.2916C4.75534 15.8813 4 14.0289 4 12ZM12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z" fill="currentColor"/>
    </svg>
  ),
};

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

interface AppSidebarProps {
  menuItems?: NavItem[];
  otherMenuItems?: NavItem[];
  showLogo?: boolean;
  logo?: {
    expanded: {
      light: string;
      dark: string;
    };
    collapsed: string;
  };
  showWidget?: boolean;
  className?: string;
  children?: ReactNode;
}

const defaultMenuItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    subItems: [
      {
        name: 'Reports',
        path: '/analytics/reports',
        pro: true
      },
      {
        name: 'Real-time',
        path: '/analytics/realtime',
        new: true
      }
    ]
  }
];

const defaultOtherItems: NavItem[] = [
  {
    icon: <defaultIcons.BoxCubeIcon />,
    name: "UI Elements",
    path: "/ui-elements",
    subItems: [
      { name: "Buttons", path: "/buttons" },
      { name: "Forms", path: "/forms" },
    ],
  },
];

const AppSidebar: React.FC<AppSidebarProps> = ({
  menuItems = defaultMenuItems,
  otherMenuItems = defaultOtherItems,
  showLogo = true,
  logo = {
    expanded: {
      light: "/images/logo/logo.png",
      dark: "/images/logo/logo.png",
    },
    collapsed: "/images/logo/logo-icon.svg",
  },
  showWidget = true,
  className = "",
  children
}) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number; } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeItem, setActiveItem] = useState<string>('');
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? menuItems : otherMenuItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive, menuItems, otherMenuItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0
        ${isExpanded ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Sidebar content */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Logo */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" />
          </Link>

          <button
            onClick={toggleSidebar}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.21248 17.625 9.36248 17.4375C9.69998 17.1 9.69998 16.575 9.36248 16.2375L2.98748 9.75H19C19.45 9.75 19.825 9.375 19.825 8.925C19.825 8.475 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 lg:px-6">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4">
              <Link
                to={item.path}
                className={`flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
              
              {item.subItems && (
                <div className="mt-4 pl-7">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`flex items-center gap-3.5 py-2 text-sm font-medium duration-300 ease-in-out hover:text-primary ${
                        isActive(subItem.path) ? 'text-primary' : 'text-white/70'
                      }`}
                    >
                      <span>{subItem.name}</span>
                      {subItem.pro && (
                        <span className="rounded bg-primary px-2 py-1 text-xs font-medium text-white">PRO</span>
                      )}
                      {subItem.new && (
                        <span className="rounded bg-success px-2 py-1 text-xs font-medium text-white">NEW</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {children}
      </div>
    </aside>
  );
};

export default AppSidebar;
