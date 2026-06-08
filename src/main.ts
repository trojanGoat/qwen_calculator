import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

let winRef: BrowserWindow | null = null;

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 480,
    height: 780,
    resizable: true,
    minWidth: 360,
    minHeight: 500,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  winRef = win;

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, '..', 'dist', 'index.html'));
  }

  return win;
}

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  mainWindow = createWindow();

  ipcMain.handle('get-window-count', () => {
    return BrowserWindow.getAllWindows().length;
  });

  ipcMain.on('minimize-window', () => {
    if (winRef) winRef.minimize();
  });

  ipcMain.on('close-window', () => {
    if (winRef) winRef.close();
  });

  ipcMain.on('toggle-maximize', () => {
    if (!winRef) return;
    if (winRef.isMaximized()) {
      winRef.unmaximize();
    } else {
      winRef.maximize();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (mainWindow) {
    mainWindow.destroy();
  }
  mainWindow = null;
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
