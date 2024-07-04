#!/bin/zsh

# Prompt for component name
read "COMPONENT_NAME?Enter the component name: "

# Capitalize the first letter of the component name
COMPONENT_NAME_CAPITALIZED=$(echo "$COMPONENT_NAME" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')

# Variables
COMPONENT_DIR="components"
COMPONENT_FILE="$COMPONENT_DIR/$COMPONENT_NAME_CAPITALIZED.tsx"

# Create the components directory if it doesn't exist
mkdir -p $COMPONENT_DIR

# Create the component file with a basic template
cat <<EOF > $COMPONENT_FILE
const ${COMPONENT_NAME_CAPITALIZED} = () => {
  return (
    <div>
      <h1>${COMPONENT_NAME_CAPITALIZED} Component</h1>
    </div>
  );
};

export default ${COMPONENT_NAME_CAPITALIZED};
EOF

# Output the result
echo "Component '$COMPONENT_NAME_CAPITALIZED' created successfully in $COMPONENT_FILE"
