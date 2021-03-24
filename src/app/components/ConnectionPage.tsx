import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ipcRenderer } from "electron";
import { Connection } from "../types/Connection";
import "../assets/css/connection-page.css";
import ConnectionInput from "./ConnectionInput";

const ConnectionPage = () => {
	const { id }: { id: string } = useParams();

	const [inputCounter, setInputCounter] = useState({ name: "GETALL", placeholders: [] });
	const [connection, setConnection] = useState<Connection | undefined>(undefined);

	const dropdownChange = (event) => {
		setInputCounter(JSON.parse(event.target.value));
	};
	useEffect(() => {
		const ipcListener = (event, item, err) => {
			if (err) {
				console.log(err);
				console.log();
				return;
			}
			setConnection(item);
			console.log(item);
		};
		ipcRenderer.send("connections:connect", id);
		ipcRenderer.on("connections:connect", ipcListener);

		return () => {
			ipcRenderer.removeListener("connections:connect", ipcListener);
		};
	}, []);

	return (
		<div id={"page-wrapper"}>
			<div id={"connection"}>
				<div id={"controller"}>
					<div id={"connection-header"}>
						<div id={"connection-title"}>{connection?.name}</div>
						<div></div>
					</div>
					<div id={"input-wrapper"}>
						<div id={"interaction-wrapper"}>
							<select id={"method-dropdown-wrapper"} onChange={dropdownChange}>
								<option value={JSON.stringify({ name: "GET", placeholders: ["KEY"] })}>GET</option>
								<option value={JSON.stringify({ name: "SET", placeholders: ["KEY", "VALUE"] })}>
									SET
								</option>
								<option value={JSON.stringify({ name: "DEL", placeholders: ["KEY"] })}>DEL</option>
								<option
									selected={true}
									value={JSON.stringify({ name: "GETALL", placeholders: [] })}
								>
									GETALL
								</option>
								<option value={JSON.stringify({ name: "HGET", placeholders: ["HKEY", "KEY"] })}>
									HGET
								</option>
								<option
									value={JSON.stringify({ name: "HSET", placeholders: ["HKEY", "KEY", "VALUE"] })}
								>
									HSET
								</option>
								<option value={JSON.stringify({ name: "HDEL", placeholders: ["HKEY", "KEY"] })}>
									HDEL
								</option>
								<option value={JSON.stringify({ name: "HGETALL", placeholders: ["HKEY"] })}>
									HGETALL
								</option>
							</select>
							<ConnectionInput input={inputCounter} />
						</div>
						<div id={"send-button"}>Send</div>
					</div>
				</div>
				<div id={"display"}></div>
			</div>
		</div>
	);
};

export default ConnectionPage;
