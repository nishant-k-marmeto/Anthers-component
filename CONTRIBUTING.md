# Contributing to Anthers Components

## Creating a New Component

1. Create a new folder in `src/components/YourComponent`
2. Copy the structure from the ComponentTemplate folder
3. Rename files and update content as needed
4. Export your component in `src/index.ts`

## Component Structure

Each component should have its own directory with the following structure:

```
YourComponent/
├── YourComponent.tsx  # Main component file
└── index.ts           # Export file
```

### Component File (YourComponent.tsx)

```tsx
import React from 'react';

export interface YourComponentProps {
  // Define your props here
  className?: string;
}

const YourComponent: React.FC<YourComponentProps> = ({
  className = '',
}) => {
  return (
    <div className={`your-component ${className}`}>
      {/* Your component content here */}
    </div>
  );
};

export default YourComponent;
```

### Export File (index.ts)

```ts
export { default as YourComponent } from './YourComponent';
export * from './YourComponent';
```

## Publishing

1. Update the version in `package.json`
2. Build the project: `npm run build`
3. Publish: `npm publish`

## Styling Guidelines

- Use Tailwind CSS for styling
- Ensure components are responsive
- Follow accessibility best practices
- Use semantic HTML elements