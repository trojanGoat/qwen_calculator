# OpenCode Persistent State

## 1. Current Project Status
**v2.1.0 COMPLETE** — React+TS+Electron calculator app. Latest changes: keyboard shortcuts, DTMF tones, charcoal theme, version control.
- TypeScript: 0 errors
- Vite build: succeeds
- AppImage: built, 109MB at `dist-app/electron-calculator-2.1.0.AppImage`

## 2. Completed Tasks
- [x] Phase 1: Git init, Vite/TS/Tailwind/PostCSS config, npm install
- [x] Phase 2: useCalculator hook + graphData utilities (math.js powered)
- [x] Phase 3: React UI components (slate theme, Tailwind, Lucide, Recharts)
- [x] Phase 4: Secure Electron main/preload (contextIsolation, preload)
- [x] Phase 5: TS verification, legacy file cleanup
- [x] Phase 6: electron-builder AppImage config, 109MB build
- [x] Phase 7: postcss ESM warning fix, final verification
- [x] v2.1.0: Keyboard shortcuts (0-9, +/-/*/, Enter, Esc, Backspace, Delete, .)
- [x] v2.1.0: DTMF phone keypad tones on digit keys (keyboard + button)
- [x] v2.1.0: Charcoal gray neutral color theme
- [x] v2.1.0: AppImage filename no spaces (electron-calculator)
- [x] v2.1.0: Version bump scripts (npm run version:patch/minor/major)

## 3. Specific Technical Blockers
- (none)

## 4. Project Summary
- **Stack**: React 18, TypeScript, Vite, Tailwind CSS, math.js, Recharts, Electron 30
- **Features**: Basic arithmetic, scientific functions, expression history, dynamic 2D graphing, keyboard shortcuts, DTMF tones
- **Security**: contextIsolation, no nodeIntegration, IPC via preload
- **Distribution**: `npm run build:appimage` produces `electron-calculator-X.Y.Z.AppImage`
- **Version Control**: `npm run version:patch` / `version:minor` / `version:major` bumps version + creates git tag
