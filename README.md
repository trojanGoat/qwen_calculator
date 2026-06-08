# Electron Calculator

A standalone desktop calculator built with React, TypeScript, and Electron. Features scientific functions, expression history, and dynamic 2D graphing.

## Features

- Basic arithmetic: +, -, *, /
- Scientific functions: sin, cos, tan, sqrt, log, pow, %
- Expression history panel
- Dynamic 2D graphing with adjustable x/y axis controls
- Slate theme UI (Tailwind CSS, shadcn-inspired)

## Technology Stack

- **Electron 30** — desktop runtime (secure IPC via preload)
- **React 18** + **TypeScript** — UI components
- **Vite 5** — dev server & build tool
- **Tailwind CSS** — slate-themed styling
- **math.js** — expression evaluation & scientific functions
- **Recharts** — dynamic graphing
- **Lucide React** — icons
- **electron-builder** — packaging (AppImage, DMG, NSIS)

## Quick Start

```bash
npm install          # First time setup
npm run dev          # Dev mode with hot reload
```

## Building & Packaging

See **[BUILD.md](./BUILD.md)** for platform-specific instructions:

- `npm run build:appimage` — Linux AppImage (self-contained, no install)
- `npx electron-builder --mac` — macOS DMG (must run on Mac)
- `npx electron-builder --win` — Windows installer (must run on Windows)

## Project Structure

```
src/
  main.ts            # Electron main process
  preload.ts         # Secure IPC bridge
  renderer/
    App.tsx           # Root component
    hooks/
      useCalculator.ts    # Calculator state & math.js integration
    components/
      Display.tsx           # Expression display
      ButtonGrid.tsx        # Basic + scientific buttons
      HistoryPanel.tsx      # Calculation history
      GraphView.tsx         # Recharts dynamic graph
      ModeToggle.tsx        # Basic / scientific mode switch
assets/
  icon.png           # App icon
```

## License

MIT