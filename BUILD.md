# Build & Packaging Guide

## Development

```bash
npm install          # Install dependencies (first time only)
npm run dev          # Start dev server + Electron with hot reload
```

App opens in Electron window. Dev server runs at `http://localhost:5173`.

## Building for Production

```bash
npm run build        # TypeScript check + Vite build + electron-builder (current platform)
```

## Platform-Specific Builds

### Linux (AppImage)

```bash
npm run build:appimage
```

**Output:** `dist-app/Electron Calculator-2.0.0.AppImage` (~109MB)

**Run:**
```bash
chmod +x "dist-app/Electron Calculator-2.0.0.AppImage"
"./dist-app/Electron Calculator-2.0.0.AppImage"
```

Self-contained. No installation required. Works on any modern Linux distro with FUSE support.

### macOS (DMG)

> Must be built **on a Mac** — cannot cross-compile from Linux.

```bash
npm install          # Re-install on the Mac
npx electron-builder --mac
```

**Output:** `dist-app/Electron Calculator-2.0.0.dmg`

### Windows (NSIS Installer)

> Must be built **on Windows** — cannot cross-compile from Linux.

```bash
npm install          # Re-install on Windows
npx electron-builder --win
```

**Output:** `dist-app/Electron Calculator Setup 2.0.0.exe`

## Output Locations

All packaged artifacts land in `dist-app/`. Build artifacts (`dist/`, `dist-electron/`) are intermediate and excluded from git.

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS (slate theme) |
| Math Engine | math.js |
| Graphing | Recharts |
| Desktop Runtime | Electron 30 |
| Packager | electron-builder 24 |
| Icons | Lucide React |

## Important Notes

- **Each platform must be built on that OS.** You can't cross-compile macOS DMGs or Windows installers from Linux.
- **`dist-app/`** is the only directory containing final distributable artifacts.
- **`node_modules/`, `dist/`, `dist-electron/`** are all in `.gitignore` — run `npm install` on any new machine before building.
- **AppImage** requires FUSE support (standard on all modern Linux distros).
- The `build:appimage` script runs `tsc` + `vite build` + `electron-builder --linux AppImage` in one command.
