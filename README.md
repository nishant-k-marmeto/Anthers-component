# Anthers Components

A collection of reusable frontend components built with React, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install anthers-components
```

## Setup

### 1. Import the CSS

Add this to your main CSS file:

```css
@import 'anthers-components/dist/styles.css';
```

Or in your JavaScript/TypeScript entry file:

```js
import 'anthers-components/dist/styles.css'; // Import the component styles
```

### 2. For Tailwind CSS Users

Add the component paths to your `tailwind.config.js` content array:

```js
module.exports = {
  content: [
    // Your existing content paths
    "./node_modules/anthers-components/dist/**/*.{js,jsx,ts,tsx}"
  ],
  // ...rest of your config
}
```

For the best experience with minimal configuration, extend our preset:

```js
module.exports = {
  presets: [
    require('anthers-components/tailwind.preset')
  ],
  content: [
    // Your content paths
    "./node_modules/anthers-components/dist/**/*.{js,jsx,ts,tsx}"
  ],
  // Any additional customization
}
```

### 3. For Non-Tailwind Users

The components will work without Tailwind because all necessary styles are included in the CSS file. Just import the styles as shown in step 1.

## Usage

```jsx
import { Button, FaqSection } from 'anthers-components';
import 'anthers-components/dist/styles.css'; // Important: Import the styles

function App() {
  return (
    <div>
      <Button variant="primary" size="md">Click Me</Button>
    </div>
  );
}
```

## Available Components

### Button

```jsx
<Button 
  variant="primary" // 'primary', 'secondary', 'outline'
  size="md" // 'sm', 'md', 'lg'
  onClick={() => console.log('Button clicked')}
  disabled={false}
>
  Button Text
</Button>
```

### Modal

A flexible modal component that supports fullscreen mode and customizable close button.

```jsx
import { Modal } from 'anthers-components';

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      showCloseButton={true}
      isFullscreen={false}
      className="max-w-2xl mx-auto p-6"
    >
      <h2>Modal Title</h2>
      <p>Modal content goes here...</p>
    </Modal>
  );
};
```

You can customize the Modal with these props:

```jsx
<Modal
  isOpen={boolean}          // Controls modal visibility
  onClose={() => {}}       // Function called when modal should close
  showCloseButton={true}   // Show/hide the close button (default: true)
  isFullscreen={false}     // Toggle fullscreen mode (default: false)
  className="custom-class" // Additional CSS classes
>
  {/* Modal content */}
</Modal>
```

### FaqSection

A reusable FAQ section component that displays collapsible questions and answers.

```jsx
import { FaqSection } from 'anthers-components';

const MyPage = () => {
  const faqItems = [
    {
      question: "How do I get started?",
      answer: "Simply sign up for an account and follow the onboarding process."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers."
    }
  ];

  return (
    <FaqSection 
      faqs={faqItems}
      title="Common Questions"
      bgColor="bg-gray-50"
    />
  );
};
```

You can customize the appearance with these props:

```jsx
<FaqSection
  faqs={faqItems}
  title="Frequently Asked Questions"
  className="my-custom-class"
  titleClassName="text-3xl font-bold"
  bgColor="bg-blue-50"
  maxWidth="max-w-3xl"
/>
```

### AppHeader

A flexible and customizable header component with support for logo, search, notifications, and user dropdown.

```jsx
import { AppHeader } from 'anthers-components';

// Basic usage
const MyPage = () => {
  return (
    <AppHeader 
      logo={{
        src: "/path/to/logo.png",
        alt: "Company Logo"
      }}
    />
  );
};

// Advanced usage with all features
const MyCustomPage = () => {
  return (
    <AppHeader 
      logo={{
        src: "/path/to/logo.png",
        alt: "Company Logo"
      }}
      showSearch={true}
      showNotifications={true}
      showUserDropdown={true}
      onSidebarToggle={() => console.log('Sidebar toggled')}
    />
  );
};

// With custom right component
const MyCustomHeaderPage = () => {
  return (
    <AppHeader 
      logo={{
        src: "/path/to/logo.png",
        alt: "Company Logo"
      }}
      customRightComponent={
        <div className="flex items-center gap-4">
          <button>Custom Button</button>
          <div>Custom Content</div>
        </div>
      }
    />
  );
};
```

Props available:

```typescript
interface AppHeaderProps {
  logo: {
    src: string;   // Path to the logo image
    alt: string;   // Alt text for the logo
  };
  showSearch?: boolean;           // Show search bar (default: true)
  showNotifications?: boolean;    // Show notifications dropdown (default: true)
  showUserDropdown?: boolean;     // Show user dropdown (default: true)
  customRightComponent?: React.ReactNode;  // Custom component for right side
  onSidebarToggle?: () => void;  // Callback when sidebar toggle is clicked
}
```

Features:
- Responsive design with mobile-first approach
- Customizable logo with proper accessibility attributes
- Optional search bar with keyboard shortcut (⌘/Ctrl + K)
- Optional notification dropdown
- Optional user dropdown
- Support for custom right-side components
- Sidebar toggle integration
- Clean and modern design with Tailwind CSS
- Proper keyboard navigation and accessibility

### AppLayout

A flexible and customizable layout component that combines AppHeader, Sidebar, and content area.

```jsx
import { AppLayout } from 'anthers-components';

// Basic usage with router
const App = () => {
  return (
    <AppLayout 
      logo={{
        src: "/path/to/logo.png",
        alt: "Company Logo"
      }}
    />
  );
};

// Custom usage with children
const CustomApp = () => {
  return (
    <AppLayout 
      logo={{
        src: "/path/to/logo.png",
        alt: "Company Logo"
      }}
      showSearch={false}
      showNotifications={true}
      showUserDropdown={true}
      className="custom-layout-class"
    >
      <div>Your custom content here</div>
    </AppLayout>
  );
};

// Advanced usage with custom components
const AdvancedApp = () => {
  return (
    <AppLayout 
      logo={{
        src: "/path/to/logo.png",
        alt: "Company Logo"
      }}
      customHeaderComponent={<YourCustomHeader />}
      customSidebarContent={<YourCustomSidebar />}
    >
      <YourCustomContent />
    </AppLayout>
  );
};
```

Props available:

```typescript
interface AppLayoutProps {
  logo: {
    src: string;   // Path to the logo image
    alt: string;   // Alt text for the logo
  };
  children?: ReactNode;              // Custom content (optional, defaults to Router Outlet)
  showSearch?: boolean;              // Show search in header (default: true)
  showNotifications?: boolean;       // Show notifications in header (default: true)
  showUserDropdown?: boolean;        // Show user dropdown in header (default: true)
  customHeaderComponent?: ReactNode; // Replace entire header with custom component
  customSidebarContent?: ReactNode; // Replace sidebar content with custom component
  className?: string;               // Additional CSS classes for layout
}
```

Features:
- Integrated sidebar with expand/collapse functionality
- Responsive design with mobile support
- Configurable header with search, notifications, and user dropdown
- Support for both router outlet and custom content
- Customizable components (header and sidebar)
- Smooth transitions and animations
- Proper spacing and layout structure
- Built-in backdrop for mobile view
- Flexible content area with max-width and padding

### AppSidebar

A flexible and customizable sidebar component with collapsible menu items, animations, and mobile support.

```jsx
import { AppSidebar } from 'anthers-components';

// Basic usage with default menu items
const App = () => {
  return (
    <AppSidebar />
  );
};

// Custom menu items
const CustomApp = () => {
  const customMenuItems = [
    {
      icon: <YourCustomIcon />,
      name: "Dashboard",
      subItems: [
        { name: "Analytics", path: "/analytics" },
        { name: "Reports", path: "/reports", pro: true },
      ],
    },
    {
      icon: <AnotherIcon />,
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <AppSidebar 
      menuItems={customMenuItems}
      showLogo={true}
      logo={{
        expanded: {
          light: "/path/to/expanded-logo.png",
          dark: "/path/to/expanded-logo-dark.png",
        },
        collapsed: "/path/to/icon.svg",
      }}
      showWidget={false}
      className="custom-sidebar"
    />
  );
};
```

Props available:

```typescript
interface AppSidebarProps {
  menuItems?: NavItem[];           // Main menu items (has defaults)
  otherMenuItems?: NavItem[];      // Secondary menu items (has defaults)
  showLogo?: boolean;              // Show/hide logo section (default: true)
  logo?: {                         // Logo configuration
    expanded: {
      light: string;              // Light theme logo path
      dark: string;               // Dark theme logo path
    };
    collapsed: string;            // Collapsed state logo path
  };
  showWidget?: boolean;            // Show/hide bottom widget (default: true)
  className?: string;              // Additional CSS classes
}

interface NavItem {
  name: string;                    // Menu item name
  icon: React.ReactNode;           // Menu item icon
  path?: string;                   // Direct link path
  subItems?: {                     // Submenu items
    name: string;
    path: string;
    pro?: boolean;                // Show PRO badge
    new?: boolean;                // Show NEW badge
  }[];
}
```

Features:
- Collapsible sidebar with smooth animations
- Hover expand functionality
- Mobile responsive design
- Nested menu items with badges (PRO/NEW)
- Active state highlighting
- Custom icons support
- Optional logo section with expanded/collapsed states
- Optional bottom widget
- Customizable menu items
- Keyboard navigation support
- Proper ARIA attributes for accessibility
- Memory of expanded/collapsed state
- Smooth transitions and animations

### FooterSocialLinks

A customizable footer component with social media links and company information.

```jsx
import { FooterSocialLinks } from 'anthers-components';

// Basic usage with just company name
<FooterSocialLinks companyName="Your Company" />

// Custom social links and styling
const customSocialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/yourcompany',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        {/* Your custom SVG path */}
      </svg>
    )
  }
];

<FooterSocialLinks 
  companyName="Your Company"
  socialLinks={customSocialLinks}
  className="bg-gray-100"
/>
```

Props available:

```typescript
interface FooterSocialLinksProps {
  companyName: string;        // Required: Your company name
  socialLinks?: SocialLink[]; // Optional: Array of social media links
  className?: string;         // Optional: Additional CSS classes
}

interface SocialLink {
  name: string;   // Display name of the social platform
  href: string;   // URL to the social media profile
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element; // SVG icon component
}
```

Features:
- Default social icons for Facebook, Instagram, X (Twitter), GitHub, and YouTube
- Customizable social links and icons
- Responsive design with mobile-first approach
- Automatic current year in copyright notice
- Accessibility features including screen reader support
- Security best practices for external links

### FooterColumn

A flexible footer component with dynamic columns and optional logo. Automatically adjusts the grid layout based on the number of columns.

```jsx
import { FooterColumn } from 'anthers-components';

const footerData = {
  columns: [
    {
      title: "Solutions",
      links: [
        { name: "Marketing", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Commerce", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Jobs", href: "#" },
      ]
    },
    // Add more columns as needed
  ],
  logo: {
    src: "/path/to/logo.png",
    alt: "Company Logo"
  }
};

// Basic usage with columns and logo
<FooterColumn 
  columns={footerData.columns}
  logo={footerData.logo}
  className="my-custom-class"
/>

// Usage without logo
<FooterColumn columns={footerData.columns} />
```

Props available:

```typescript
interface FooterColumnProps {
  columns: {
    title: string;
    links: {
      name: string;
      href: string;
    }[];
  }[];
  logo?: {
    src: string;
    alt: string;
  };
  className?: string;
}
```

Features:
- Dynamic grid layout that adjusts based on number of columns
- Optional company logo
- Responsive design for all screen sizes
- Automatic external link handling (adds target="_blank" and security attributes)
- Customizable through className prop
- Maintains consistent spacing and typography
- Accessible markup with proper ARIA attributes

Grid Layout Behavior:
- 1-2 columns: Single column on mobile, 2 columns on desktop
- 3 columns: 2 columns on mobile, 3 columns on desktop
- 4 columns: 2 columns on mobile, 4 columns on desktop
- 5+ columns: 2 columns on mobile, 3 columns on tablet, 5 columns on desktop

## Layout System

The layout system consists of three main components (`AppLayout`, `AppHeader`, `AppSidebar`) and a context provider (`SidebarProvider`). Here's how to set up and use the complete layout system:

### Basic Setup

```jsx
import { AppLayout, SidebarProvider } from 'anthers-components';

const App = () => {
  return (
    <SidebarProvider>
      <AppLayout 
        logo={{
          src: "/path/to/logo.png",
          alt: "Company Logo"
        }}
      />
    </SidebarProvider>
  );
};
```

### Advanced Setup with Custom Configuration

```jsx
import { 
  AppLayout, 
  SidebarProvider, 
  AppHeader, 
  AppSidebar 
} from 'anthers-components';

const App = () => {
  // Custom menu items for sidebar
  const menuItems = [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      subItems: [
        { name: "Analytics", path: "/analytics" },
        { name: "Reports", path: "/reports", pro: true },
      ],
    },
    {
      icon: <SettingsIcon />,
      name: "Settings",
      path: "/settings",
    },
  ];

  // Custom header right component
  const CustomHeaderRight = () => (
    <div className="flex items-center gap-4">
      <CustomNotifications />
      <CustomProfile />
    </div>
  );

  return (
    <SidebarProvider
      initialState={{
        isExpanded: true,
        breakpoint: 1024,
        sidebarWidth: {
          expanded: 320,
          collapsed: 80,
        }
      }}
    >
      <AppLayout 
        logo={{
          src: "/path/to/logo.png",
          alt: "Company Logo"
        }}
        showSearch={true}
        showNotifications={true}
        showUserDropdown={true}
        customHeaderComponent={<CustomHeaderRight />}
        menuItems={menuItems}
        className="custom-layout"
      />
    </SidebarProvider>
  );
};
```

### Individual Component Setup

If you need more control, you can use the components individually:

```jsx
import { 
  SidebarProvider, 
  AppHeader, 
  AppSidebar 
} from 'anthers-components';

const CustomLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar 
          menuItems={customMenuItems}
          showLogo={true}
          logo={{
            expanded: {
              light: "/logo-expanded.png",
              dark: "/logo-expanded-dark.png"
            },
            collapsed: "/logo-icon.svg"
          }}
          showWidget={true}
        />
        <div className="flex-1">
          <AppHeader 
            logo={{
              src: "/logo.png",
              alt: "Logo"
            }}
            showSearch={true}
            showNotifications={true}
            showUserDropdown={true}
            onSidebarToggle={() => {}}
          />
          <main className="p-4">
            {/* Your content here */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
```

### Using the Sidebar Context

The sidebar context provides state management and utilities for the sidebar component:

```typescript
// Type definitions
interface SidebarContextType {
  isExpanded: boolean;      // Controls expanded/collapsed state
  isMobileOpen: boolean;    // Controls mobile menu visibility
  isHovered: boolean;       // Tracks hover state for collapsed sidebar
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (value: boolean) => void;
}
```

To use the sidebar context:

1. **Wrap your app with SidebarProvider**
```jsx
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <SidebarProvider>
      <AppLayout>
        {/* Your app content */}
      </AppLayout>
    </SidebarProvider>
  );
}
```

2. **Use the hook in components**
```jsx
import { useSidebar } from './context/SidebarContext';

function YourComponent() {
  const { 
    isExpanded,
    isMobileOpen,
    isHovered,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered 
  } = useSidebar();

  return (
    <div className={isExpanded ? 'expanded' : 'collapsed'}>
      {/* Your component content */}
    </div>
  );
}
```

Features:
- Automatic mobile detection and responsive behavior
- Hover state management for collapsed sidebar
- Window resize handling
- Smooth transitions between states
- TypeScript support with proper type definitions

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run build`

## Creating a New Component

1. Run: `npm run create-component`
2. Follow the prompts to create a new component
3. Build the project: `npm run build`
4. Publish: `npm publish`

## License

MIT

## Components

### Header Component

A flexible and customizable header component that supports search, notifications, and user dropdown.

```jsx
import { Header } from 'anthers-components';

// Basic usage
<Header onSidebarToggle={() => {}} />

// Advanced usage with all features
<Header 
  logo={{
    src: "/logo.png",
    darkModeSrc: "/logo-dark.png",
    alt: "Company Logo",
    href: "/dashboard"
  }}
  showSearch={true}
  showNotifications={true}
  showUserDropdown={true}
  searchPlaceholder="Search products..."
  onSearch={(query) => handleSearch(query)}
  user={{
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    avatarUrl: "/avatar.jpg"
  }}
  className="custom-header"
/>

// With custom components
<Header 
  customSearchComponent={<CustomSearch />}
  customRightComponent={<CustomRightSide />}
/>
```

Props available:
```typescript
interface HeaderProps {
  onSidebarToggle?: () => void;
  logo?: {
    src: string;
    darkModeSrc?: string;
    alt: string;
    href?: string;
  };
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserDropdown?: boolean;
  customSearchComponent?: React.ReactNode;
  customRightComponent?: React.ReactNode;
  className?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  };
}
```

### UserDropdown Component

A customizable user dropdown component with support for avatar, menu items, and actions.

```jsx
import { UserDropdown } from 'anthers-components';

// Basic usage
<UserDropdown />

// Custom configuration
<UserDropdown 
  user={{
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    avatarUrl: "/avatar.jpg"
  }}
  menuItems={[
    {
      icon: <CustomIcon />,
      label: "Settings",
      path: "/settings"
    }
  ]}
  onLogout={() => handleLogout()}
  avatarBgColor="bg-blue-500"
  showEmail={true}
  showFullName={true}
  dropdownWidth="w-[300px]"
/>

// With custom avatar
<UserDropdown 
  customAvatar={<CustomAvatar />}
  showFullName={false}
/>
```

Props available:
```typescript
interface UserDropdownProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  };
  menuItems?: Array<{
    icon: React.ReactNode;
    label: string;
    path: string;
  }>;
  onLogout?: () => void;
  avatarBgColor?: string;
  showEmail?: boolean;
  showFullName?: boolean;
  dropdownWidth?: string;
  customAvatar?: React.ReactNode;
}
```

### NotificationDropdown Component

A dropdown component for displaying notifications with customizable styles and behaviors.

```jsx
import { NotificationDropdown } from 'anthers-components';

// Basic usage
<NotificationDropdown />

// Custom configuration
<NotificationDropdown 
  notifications={[
    {
      id: '1',
      title: 'New Message',
      description: 'You have a new message from John',
      time: '5m ago',
      type: 'message',
      read: false
    }
  ]}
  onNotificationClick={(id) => handleNotification(id)}
  onMarkAllRead={() => markAllAsRead()}
  maxHeight="max-h-[600px]"
  showBadge={true}
/>

// With custom notification renderer
<NotificationDropdown 
  renderNotification={(notification) => (
    <CustomNotification {...notification} />
  )}
/>
```

### Complete Layout Example

Here's how to combine all components to create a complete layout:

```jsx
import { 
  AppLayout, 
  Header, 
  UserDropdown,
  NotificationDropdown,
  SidebarProvider 
} from 'anthers-components';

const App = () => {
  return (
    <SidebarProvider>
      <AppLayout>
        <Header 
          logo={{
            src: "/logo.png",
            darkModeSrc: "/logo-dark.png",
            alt: "Company Logo"
          }}
          showSearch={true}
          showNotifications={true}
          showUserDropdown={true}
          user={{
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com"
          }}
        />
        <main className="p-4">
          {/* Your content here */}
        </main>
      </AppLayout>
    </SidebarProvider>
  );
};
```

### Customization

1. **Theming**
```jsx
// Custom theme colors
<Header className="bg-custom-900 text-white" />
<UserDropdown avatarBgColor="bg-brand-500" />
```

2. **Custom Components**
```jsx
// Replace search component
<Header 
  customSearchComponent={
    <div className="flex items-center">
      <CustomSearchInput />
      <CustomFilters />
    </div>
  }
/>

// Custom right side components
<Header 
  customRightComponent={
    <div className="flex items-center gap-4">
      <CustomNotifications />
      <CustomProfile />
      <LanguageSelector />
    </div>
  }
/>
```

3. **Menu Items**
```jsx
// Custom user menu items
<UserDropdown 
  menuItems={[
    {
      icon: <SettingsIcon />,
      label: "Account Settings",
      path: "/settings"
    },
    {
      icon: <BillingIcon />,
      label: "Billing",
      path: "/billing"
    }
  ]}
/>
```

### Best Practices

1. **State Management**
```jsx
// Handle search properly
const handleSearch = (query: string) => {
  // Debounce search requests
  // Update search results
};

// Handle notifications
const handleNotification = (id: string) => {
  // Mark as read
  // Navigate to relevant page
};
```

2. **Responsive Design**
```jsx
// Adjust dropdown width based on screen size
<UserDropdown 
  dropdownWidth={{
    base: "w-[260px]",
    lg: "w-[300px]",
    xl: "w-[350px]"
  }}
/>
```

3. **Accessibility**
- All components include proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management in dropdowns

4. **Performance**
- Lazy loading for dropdown contents
- Optimized re-renders
- Proper event cleanup

### TypeScript Support

All components are written in TypeScript and include proper type definitions:

```typescript
// Import types
import type { 
  HeaderProps,
  UserDropdownProps,
  NotificationDropdownProps 
} from 'anthers-components';

// Use with TypeScript
const MyHeader: React.FC<HeaderProps> = (props) => {
  // Your custom header implementation
};
```

### Troubleshooting

Common issues and solutions:

1. **Dropdown positioning issues**
```jsx
// Ensure proper stacking context
<Header className="z-50" />
```

2. **Custom avatar not showing**
```jsx
// Make sure to provide both custom avatar and background color
<UserDropdown 
  customAvatar={<CustomAvatar />}
  avatarBgColor="bg-transparent"
/>
```

3. **Search not working**
```jsx
// Implement proper search handler
<Header 
  onSearch={(query) => {
    console.log('Search query:', query);
    // Implement search logic
  }}
/>
```

For more examples and detailed documentation, visit our [Storybook](https://your-storybook-url.com).