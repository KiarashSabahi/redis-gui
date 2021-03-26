import React, { useState, useEffect } from "react";
import ConnectionCard from "./ConnecionCard";
import "../assets/css/allConnections.css";
import { Connection } from "../types/Connection";
import { ipcSend } from "../utils/ipc";

const AllConnections = () => {
	const [connections, setConnections] = useState([]);

	useEffect(() => {
		(async () => {
			const data: Connection[] = await ipcSend("connections:getAll");
			setConnections(data);
		})();
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
