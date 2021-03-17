import fs from "fs"
import path from "path"
import {app, remote} from "electron";
import {Connection} from "../types/Connection";
import {randomBytes} from "crypto"

const userDataPath = path.join((app || remote.app).getPath('userData'), "connections" + '.json');
const userErrorPath = path.join((app || remote.app).getPath('userData'), "log" + '.txt');

export const getConnections = () => {
    try {
        const rawData = fs.readFileSync(userDataPath).toString();
        return JSON.parse(rawData);
    } catch (error) {
        writeError(error);
        return {connections: []};
    }
}

export const addConnection = (connection: Connection) => {
    try {
        let rawData = fs.readFileSync(userDataPath).toString();
        const data = JSON.parse(rawData);
        connection.id = randomBytes(4).toString("hex");
        data.connections.push(connection);
        rawData = JSON.stringify(data);
        fs.writeFileSync(userDataPath, rawData);
        return true
    } catch (error) {
        writeError(error);
        return false
    }
}

export const removeConnection = (connection: Connection) => {
    try {
        let rawData = fs.readFileSync(userDataPath).toString();
        const data = JSON.parse(rawData);
        const filtered = data.connections.filter((item: Connection) => {
            return JSON.stringify(connection) != JSON.stringify(item);
        });
        data.connections = filtered;
        rawData = JSON.stringify(data);
        fs.writeFileSync(userDataPath, rawData);
        return true;
    } catch (error) {
        writeError(error);
        return false;
    }
}

export const editConnection = (connection: Connection, newConnection: Connection) => {
    try {
        let rawData = fs.readFileSync(userDataPath).toString();
        const data = JSON.parse(rawData);
        for (let i = 0; i < data.connections.length; i++) {
            if (JSON.stringify(connection) == JSON.stringify(data.connections[i])) {
                data.connections[i] = newConnection;
            }
        }
        console.log(data.connections)
        rawData = JSON.stringify(data);
        fs.writeFileSync(userDataPath, rawData);
        return true;
    } catch (error) {
        writeError(error);
        return false;
    }
}

const writeError = (error: any) => {
    try {
        if (error.errno == -4058) {
            fs.writeFileSync(userDataPath, JSON.stringify({connections: []}));
            console.log(error)
        } else {
            throw error
        }
    } catch (error){
        console.log(error)
        // fs.appendFile(userErrorPath, error + "\n------------------------\n", () => {});
    }
}

