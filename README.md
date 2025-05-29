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