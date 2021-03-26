import { mainWindow, activeConnections } from "../index";
import { ipcMain } from "electron";

ipcMain.on("connection:hget", async (event, hkey: string, key: string) => {
	try {
		mainWindow.send("connection:hget", await activeConnections[0].hget(hkey, key), null);
	} catch (error) {
		mainWindow.send("connection:hget", null, error);
	}
});

ipcMain.on("connection:hset", async (event, hkey: string, key: string, value: string) => {
	try {
		mainWindow.send("connection:hset", await activeConnections[0].hset(hkey, key, value), null);
	} catch (error) {
		mainWindow.send("connection:hset", null, error);
	}
});

ipcMain.on("connection:get", async (event, key: string) => {
	try {
		mainWindow.send("connection:get", await activeConnections[0].get(key), null);
	} catch (error) {
		mainWindow.send("connection:get", null, error);
	}
});

ipcMain.on("connection:set", async (event, key: string, value: string) => {
	try {
		mainWindow.send("connection:set", await activeConnections[0].set(key, value), null);
	} catch (error) {
		mainWindow.send("connection:set", null, error);
	}
});

ipcMain.on("connection:getAll", async (event, input: any) => {
	try {
		mainWindow.send("connection:getAll", await activeConnections[0].getAll(input.pagination), null);
	} catch (error) {
		mainWindow.send("connection:getAll", null, error);
	}
});

ipcMain.on("connection:hgetall", async (event, hkey: string) => {
	try {
		mainWindow.send("connection:hgetall", await activeConnections[0].hgetall(hkey), null);
	} catch (error) {
		mainWindow.send("connection:hgetall", null, error);
	}
});

ipcMain.on("connection:del", async (event, key: string) => {
	try {
		mainWindow.send("connection:del", await activeConnections[0].del(key), null);
	} catch (error) {
		mainWindow.send("connection:del", null, error);
	}
});

ipcMain.on("connection:hdel", async (event, hkey: string, key: string) => {
	try {
		mainWindow.send("connection:hdel", await activeConnections[0].hdel(hkey, key), null);
	} catch (error) {
		mainWindow.send("connection:hdel", null, error);
	}
});
