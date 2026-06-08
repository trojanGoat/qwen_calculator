# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-06-08

### Added
- Full React 18 + TypeScript migration
- Scientific functions via math.js (sin, cos, tan, sqrt, log, etc.)
- Dynamic 2D graphing with Recharts and adjustable axis controls
- Expression history panel
- Tailwind CSS slate theme (shadcn-inspired UI)
- Lucide React icons
- Secure Electron config (contextIsolation, preload, no nodeIntegration)
- Linux AppImage packaging via electron-builder
- macOS DMG and Windows NSIS build targets configured
- Vite 5 build tool with hot reload
- App icon (assets/icon.png)

### Removed
- Vanilla JavaScript application
- Chart.js graphing
- Material-UI styling

### Changed
- Build system: raw HTML/JS → Vite + TypeScript
- Styling: Material-UI dark theme → Tailwind CSS slate theme
- Graphing: Chart.js → Recharts with dynamic x/y axis controls
- Electron: basic config → secure IPC via preload script
- Package manager: consolidated deps, electron moved to devDependencies

## [1.0.0] - 2025-06-08

### Added
- Initial vanilla JS calculator baseline
