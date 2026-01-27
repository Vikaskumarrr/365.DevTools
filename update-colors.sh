#!/bin/bash

# Script to update all orange color references to the new red/coral color scheme
# Colors: #ce0506 (red) and #ef6e76 (coral/pink)

echo "Updating color scheme from orange to red/coral..."

# Find all JSX files and replace orange references
find frontend/src -name "*.jsx" -type f -exec sed -i '' \
  -e 's/orange-50/primary-50/g' \
  -e 's/orange-100/primary-100/g' \
  -e 's/orange-200/primary-200/g' \
  -e 's/orange-300/primary-300/g' \
  -e 's/orange-400/primary-400/g' \
  -e 's/orange-500/primary-500/g' \
  -e 's/orange-600/primary-600/g' \
  -e 's/orange-700/primary-700/g' \
  -e 's/orange-800/primary-800/g' \
  -e 's/orange-900/primary-900/g' \
  -e 's/#FF6B35/#EF6E76/g' \
  -e 's/#FFA500/#EF6E76/g' \
  {} \;

echo "Color scheme updated successfully!"
echo "Primary colors now use: #CE0506 (red) and #EF6E76 (coral)"
