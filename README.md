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

## Available Components

### Layout System

The layout system consists of several components that work together to create a consistent application layout:

#### AppLayout Component

The main layout component that combines Sidebar, Header, and content area:

```tsx
import { AppLayout } from 'anthers-components';

const App = () => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      href: '/dashboard'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      href: '/settings',
      subItems: [
        {
          id: 'profile',
          label: 'Profile',
          href: '/settings/profile'
        }
      ]
    }
  ];

  return (
    <AppLayout
      menuItems={menuItems}
      user={{
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatar.jpg"
      }}
      notifications={[
        {
          id: "1",
          title: "New Message",
          message: "You have a new message",
          time: "5m ago",
          read: false
        }
      ]}
      searchData={[/* your search data */]}
      onSearch={(results) => console.log('Search results:', results)}
    >
      <YourPageContent />
    </AppLayout>
  );
};
```

#### Header Component

A standalone header component with search, notifications, and user dropdown:

```tsx
import { Header } from 'anthers-components';

const YourComponent = () => {
  return (
    <Header
      searchData={[/* your search data */]}
      onSearch={(results) => console.log('Search results:', results)}
      user={{
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatar.jpg"
      }}
      notifications={[
        {
          id: "1",
          title: "New Message",
          message: "You have a new message",
          time: "5m ago",
          read: false
        }
      ]}
    />
  );
};
```

#### Sidebar Component

A navigation sidebar with support for nested menu items:

```tsx
import { Sidebar } from 'anthers-components';

const YourComponent = () => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      href: '/dashboard'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      href: '/settings',
      subItems: [
        {
          id: 'profile',
          label: 'Profile',
          href: '/settings/profile'
        }
      ]
    }
  ];

  return (
    <Sidebar
      logo={{
        src: "/logo.png",
        alt: "Company Logo"
      }}
      menuItems={menuItems}
    />
  );
};
```

#### SearchMain Component

A powerful search component with keyboard navigation and suggestions:

```tsx
import { SearchMain } from 'anthers-components';

const YourComponent = () => {
  const searchData = [
    {
      name: 'Product 1',
      description: 'Description for product 1'
    },
    // ... more items
  ];

  return (
    <SearchMain
      data={searchData}
      onSearch={(results) => console.log('Search results:', results)}
      placeholder="Search products..."
      searchKeys={['name', 'description']}
    />
  );
};
```

#### Toast Component

A simple toast notification system:

```tsx
import { Toast, show as showToast } from 'anthers-components';

// Using the Toast component directly
const YourComponent = () => {
  return (
    <Toast>Custom Toast Content</Toast>
  );
};

// Using the show method for temporary notifications
const AnotherComponent = () => {
  return (
    <button onClick={() => showToast('Operation successful!')}>
      Show Toast
    </button>
  );
};
```

### Component Types

#### AppLayout Props
```typescript
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
```

#### MenuItem Type
```typescript
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
  href: string;
  subItems?: MenuItem[];
}
```

#### SearchMain Props
```typescript
interface SearchMainProps<T> {
  className?: string;
  placeholder?: string;
  data?: T[];
  onSearch?: (results: T[]) => void;
  searchKeys?: (keyof T & string)[];
}
```

#### Toast Props
```typescript
interface ToastProps {
  children: React.ReactNode;
  className?: string;
}

// The show function
function show(message: string): void;
```

### Features

#### Layout System Features
- Responsive design with mobile-first approach
- Collapsible sidebar with nested menu items
- Search functionality with keyboard navigation
- Notification system
- User profile dropdown
- Clean, modern UI with consistent styling
- Customizable through props and CSS classes

#### Search Features
- Keyboard navigation (↑/↓ arrows, Enter, Esc)
- Command palette style interface (⌘/Ctrl + K)
- Highlighted search matches
- Customizable search keys
- Type-safe with TypeScript generics
- Responsive dropdown

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Build: `npm run build`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

MIT