import {app, BrowserWindow, ipcMain} from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let mainWindow: any;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {

  mainWindow = new BrowserWindow({
    backgroundColor: "#161A1D",
    width: 1275,
    minWidth: 620,
    height: 850,
    minHeight: 475,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("app:close", () => {
  app.quit();
});

ipcMain.on("app:minimize", () => {
  mainWindow.minimize();
});
