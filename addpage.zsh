#!/bin/zsh

# Prompt for page name
read "PAGE_NAME?Enter the page name: "

# Capitalize the first letter of the page name
PAGE_COMPONENT_NAME=$(echo "$PAGE_NAME" | awk '{print toupper(substr($0,0,1)) tolower(substr($0,2))}')

# Variables
PAGE_DIR="app/$PAGE_NAME"

# Create the directory if it doesn't exist
mkdir -p $PAGE_DIR

# Create the page.tsx file with a basic template
cat <<EOF > $PAGE_DIR/page.tsx
import BottomNavBar from "../shared/BottomNavBar"

const ${PAGE_COMPONENT_NAME} = () => {
  return (
    <main className="main">
      <h1>${PAGE_COMPONENT_NAME}</h1>
      <BottomNavBar/>
    </main>
  );
};

export default ${PAGE_COMPONENT_NAME};
EOF

echo "Page '$PAGE_NAME' created successfully in $PAGE_DIR/page.tsx"

# Prompt to create a component
read "CREATE_COMPONENT?Do you want to create a component for this page? (y/n): "

if [[ "$CREATE_COMPONENT" == "y" ]]; then
  COMPONENT_DIR="components"
  COMPONENT_FILE="$COMPONENT_DIR/$PAGE_COMPONENT_NAME.tsx"

  # Create the components directory if it doesn't exist
  mkdir -p $COMPONENT_DIR

  # Create the component file with a basic template
  cat <<EOF > $COMPONENT_FILE
const ${PAGE_COMPONENT_NAME} = () => {
  return (
    <div>
      <h1>${PAGE_COMPONENT_NAME} Component</h1>
    </div>
  );
};

export default ${PAGE_COMPONENT_NAME};
EOF

  echo "Component '$PAGE_COMPONENT_NAME' created successfully in $COMPONENT_FILE"
fi
