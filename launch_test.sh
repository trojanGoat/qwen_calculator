#!/usr/bin/env bash
set -e

echo "Starting Electron Calculator..."

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run dev server
npm run dev
