# Electron Calculator

A standalone desktop calculator application built with Electron, React, and TypeScript. Features a dark theme, basic arithmetic, scientific functions (sin, cos, tan, sqrt), expression history, and a graph view (sin wave).

## Features
- Dark theme UI using Material‑UI styling
- Basic calculator: +, -, *, /, =, clear
- Advanced mode: sin, cos, tan, √, ^, %
- History panel showing recent calculations
- Graph view using Chart.js (sin function)

## Technology Stack
- **Electron** – desktop runtime
- **React** + **TypeScript** – UI components
- **Vite** – dev server & build tool
- **Chart.js** – graph rendering
- **electron‑builder** – packaging for Ubuntu

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode (hot reload)
npm run dev
```

The app will open a window at `http://localhost:5173` (Electron loads the UI from `public/index.html`).

## Building for Production

```bash
npm run build
```

The packaged app will be created in the `dist/` folder.

## License

MIT