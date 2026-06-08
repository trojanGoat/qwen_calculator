#!/usr/bin/env bash

# This script is intended to compile, run, or test the project.
# Modify this script to suit the specific needs of the current project.

echo "Running launch script for tests..."

# Check if LLM cluster is reachable
echo "Checking LLM Cluster at 192.168.8.1:8080..."
if curl -s --connect-timeout 2 http://192.168.8.1:8080 > /dev/null; then
    echo "[OK] Llama cluster is reachable."
else
    echo "[WARNING] Llama cluster might be unreachable. Please ensure the server is running."
fi

# Insert build/test commands below:
# npm run dev
# python main.py
# pytest

echo "Tests completed."
