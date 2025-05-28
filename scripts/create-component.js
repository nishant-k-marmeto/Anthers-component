#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for component name
rl.question('What is the name of your component? ', (componentName) => {
  if (!componentName) {
    console.error('Component name is required');
    rl.close();
    return;
  }

  // Ensure first letter is capitalized
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  const componentsDir = path.join(__dirname, '../src/components');
  const componentDir = path.join(componentsDir, componentName);
  
  // Check if component already exists
  if (fs.existsSync(componentDir)) {
    console.error(`Component ${componentName} already exists`);
    rl.close();
    return;
  }
  
  // Create component directory
  fs.mkdirSync(componentDir, { recursive: true });
  
  // Create component file
  const componentContent = `import React from 'react';

export interface ${componentName}Props {
  // Define your props here
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  className = '',
}) => {
  return (
    <div className={\`${componentName.toLowerCase()} \${className}\`}>
      {/* Your component content here */}
      ${componentName} Component
    </div>
  );
};

export default ${componentName};`;

  fs.writeFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    componentContent
  );
  
  // Create index file
  const indexContent = `export { default as ${componentName} } from './${componentName}';
export * from './${componentName}';`;

  fs.writeFileSync(
    path.join(componentDir, 'index.ts'),
    indexContent
  );
  
  // Update main index.ts file
  const mainIndexPath = path.join(__dirname, '../src/index.ts');
  let mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');
  
  // Add export if it doesn't exist
  const exportLine = `export * from './components/${componentName}';`;
  if (!mainIndexContent.includes(exportLine)) {
    mainIndexContent += `\n${exportLine}`;
    fs.writeFileSync(mainIndexPath, mainIndexContent);
  }
  
  console.log(`Component ${componentName} created successfully!`);
  console.log(`   - ${path.join(componentDir, `${componentName}.tsx`)}`);
  console.log(`   - ${path.join(componentDir, 'index.ts')}`);
  console.log(`   - Added export to src/index.ts`);
  console.log('\nNext steps:');
  console.log(`1. Implement your component in ${componentName}.tsx`);
  console.log('2. Run npm run build to build the project');
  console.log('3. Update version in package.json');
  console.log('4. Run npm publish to publish your component');
  
  rl.close();
});