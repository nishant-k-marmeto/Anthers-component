import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface SidebarState {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  breakpoint: number;
  sidebarWidth: {
    expanded: number;
    collapsed: number;
  };
}

export interface SidebarContextType extends SidebarState {
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
  resetSidebar: () => void;
  isMobile: boolean;
}

const defaultState: SidebarState = {
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,
  breakpoint: 768,
  sidebarWidth: {
    expanded: 290,
    collapsed: 90,
  },
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
  initialState?: {
    isExpanded?: boolean;
    activeItem?: string;
  };
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ 
  children,
  initialState = {}
}) => {
  const [state, setState] = useState<SidebarState>({
    ...defaultState,
    ...initialState,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < state.breakpoint;
      setIsMobile(mobile);
      if (!mobile && state.isMobileOpen) {
        setState(prev => ({ ...prev, isMobileOpen: false }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state.breakpoint, state.isMobileOpen]);

  // Save sidebar state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sidebarState', JSON.stringify({
        isExpanded: state.isExpanded,
        activeItem: state.activeItem,
      }));
    } catch (error) {
      console.warn('Failed to save sidebar state to localStorage:', error);
    }
  }, [state.isExpanded, state.activeItem]);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('sidebarState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setState(prev => ({
          ...prev,
          isExpanded: parsed.isExpanded,
          activeItem: parsed.activeItem,
        }));
      }
    } catch (error) {
      console.warn('Failed to load sidebar state from localStorage:', error);
    }
  }, []);

  const toggleSidebar = () => {
    setState(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
  };

  const toggleMobileSidebar = () => {
    setState(prev => ({ ...prev, isMobileOpen: !prev.isMobileOpen }));
  };

  const setIsHovered = (isHovered: boolean) => {
    setState(prev => ({ ...prev, isHovered }));
  };

  const setActiveItem = (activeItem: string | null) => {
    setState(prev => ({ ...prev, activeItem }));
  };

  const toggleSubmenu = (item: string) => {
    setState(prev => ({
      ...prev,
      openSubmenu: prev.openSubmenu === item ? null : item,
    }));
  };

  const resetSidebar = () => {
    setState(defaultState);
  };

  const value: SidebarContextType = {
    ...state,
    isMobile,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered,
    setActiveItem,
    toggleSubmenu,
    resetSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for sidebar dimensions
export const useSidebarDimensions = () => {
  const { isExpanded, isHovered, isMobileOpen, sidebarWidth } = useSidebar();
  
  const currentWidth = isExpanded || isHovered || isMobileOpen
    ? sidebarWidth.expanded
    : sidebarWidth.collapsed;

  return {
    width: currentWidth,
    expandedWidth: sidebarWidth.expanded,
    collapsedWidth: sidebarWidth.collapsed,
  };
};

// Custom hook for sidebar state persistence
export const useSidebarPersistence = () => {
  const { isExpanded, activeItem } = useSidebar();
  
  return {
    saveState: () => {
      try {
        localStorage.setItem('sidebarState', JSON.stringify({ isExpanded, activeItem }));
        return true;
      } catch (error) {
        console.warn('Failed to save sidebar state:', error);
        return false;
      }
    },
    loadState: () => {
      try {
        const savedState = localStorage.getItem('sidebarState');
        return savedState ? JSON.parse(savedState) : null;
      } catch (error) {
        console.warn('Failed to load sidebar state:', error);
        return null;
      }
    },
  };
};
