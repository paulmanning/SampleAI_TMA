#!/bin/bash

# Create project directory structure
mkdir -p src/renderer
mkdir -p src/__tests__
mkdir -p .github/workflows

# Initialize npm project if not already initialized
if [ ! -f package.json ]; then
    npm init -y
fi

# Initialize electron-forge project
npx create-electron-app@latest . --template=webpack

# Install additional dependencies
npm install --save-dev \
    @types/jest \
    jest \
    eslint \
    eslint-config-prettier \
    eslint-plugin-jest \
    prettier 