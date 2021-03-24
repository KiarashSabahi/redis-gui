import { app, BrowserWindow, ipcMain } from "electron";
import Redis from "./services/Redis";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let mainWindow: any;
const activeConnections: Redis[] = [];

if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = (): void => {
	mainWindow = new BrowserWindow({
		backgroundColor: "#161A1D",
		width: 1240,
		minWidth: 920,
		height: 880,
		minHeight: 620,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
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

import "./controller/connection";
import "./controller/connections";

export { app, mainWindow, activeConnections };
