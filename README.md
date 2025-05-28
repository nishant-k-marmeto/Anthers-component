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
import 'anthers-components/dist/styles.css';
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
import { Button } from 'anthers-components';
import 'anthers-components/dist/styles.css';

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