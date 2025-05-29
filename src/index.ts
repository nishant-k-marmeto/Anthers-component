// Export components
export { Button } from './components/Button';
export { Alert } from './components/alert';
export { Badge } from './components/badge';
export { Avatar } from './components/avatar';
export { ComponentCard } from './components/cards';
export { HeadingWithDescription } from './components/description';
export { Dropdown, DropdownItem } from './components/dropdown';
export { FaqSection } from './components/faq-section';
export { DateRangePicker } from './components/date range';
export * from './components/icons';
export * from './components/input';
export { Modal } from './components/modal';
export { Pagination } from './components/pagination';
export { ScrollToTop } from './components/scroll-to-top';
export { StepperParent } from './components/stepper-default';
export { Table, TableHeader, TableBody, TableRow, TableCell } from './components/table';
export { Switch } from './components/switch';
export { Toast } from './components/toast';

// Export layout components
export { default as AppLayout } from './components/layout/AppLayout';
export { default as AppHeader } from './components/layout/AppHeader';
export { default as AppSidebar } from './components/layout/AppSidebar';
export { default as SidebarWidget } from './components/layout/SidebarWidget';
export { default as Backdrop } from './components/layout/Backdrop';

// Export header components
export { default as HeaderHomePage } from './components/header/HeaderHomePage';
export { default as UserDropdown } from './components/header/UserDropdown';
export { default as NotificationDropdown } from './components/header/NotificationDropdown';

// Export context
export { SidebarProvider, useSidebar } from './context/SidebarContext';

// Export styles
export { initStyles } from './styles';