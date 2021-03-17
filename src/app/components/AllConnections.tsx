import React, { useState, useEffect } from "react";
import ConnectionCard from "./ConnecionCard";
import "../assets/css/allConnections.css";
import { ipcRenderer } from "electron";

const AllConnections = () => {
	const [connections, setConnections] = useState([]);

	useEffect(() => {
		const ipcListener = (event, connectionsList, err) => {
			if (err) {
				console.log(err);
				return;
			}
			setConnections(connectionsList);
		};
		ipcRenderer.send("connections:getAll");
		ipcRenderer.on("connections:getAll", ipcListener);

		return () => {
			ipcRenderer.removeListener("connections:getAll", ipcListener);
		};
	}, []);

	const deleteConnection = (connection: any) => {
		const newConnections = connections.filter((item) => {
			return item.name !== connection.name;
		});
		setConnections(newConnections);
	};

	const renderConnections = () => {
		return connections.map((connection, index) => {
			return <ConnectionCard connection={connection} deleteCard={deleteConnection} key={index} />;
		});
	};

	return (
		<div id="connectionsWrapper">
			<div id="connections">{renderConnections()}</div>
		</div>
	);
};

export default AllConnections;
