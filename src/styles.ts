// Import all styles to be included in the build
import './styles/index.css';

// Export a dummy function to ensure the file is not tree-shaken
export const initStyles = () => {
  // This function doesn't need to do anything
  // It's just to ensure the CSS import is included
};