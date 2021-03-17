import { mainWindow, activeConnections } from "../index";
import { ipcMain } from "electron";

import { addConnection, getConnections } from "../services/file";
import Redis from "../services/Redis";
import { Connection } from "../types/Connection";
ipcMain.on("connections:getAll", () => {
	const connections = getConnections().connections;
	mainWindow.send("connections:getAll", connections);
});

ipcMain.on("connections:connect", (event, id: string) => {
	try {
		const connections = getConnections().connections;
		const connection = connections.find((item) => item.id == id);
		activeConnections.push(new Redis(connection.address, connection.password));
		mainWindow.send("connections:connect", connection, null);
	} catch (error) {
		mainWindow.send("connections:connect", null, error);
		console.log(error);
	}
});

ipcMain.on("connections:add", (event, connection: Connection) => {
	try {
		const result = addConnection(connection);
		mainWindow.send("connections:add", result, null);
	} catch (error) {
		mainWindow.send("connections:add", null, error);
		console.log(error);
	}
});
