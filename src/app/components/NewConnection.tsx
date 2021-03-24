/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "../assets/css/newConnection.css";
import { ipcRenderer } from "electron";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Dialog } from "@material-ui/core";

type Inputs = {
	name: string;
	host: string;
	port: string;
	username: string;
	password: string;
};

const NewConnection = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [addConnectionStatus, setAddConnectionStatus] = useState("");
	const { register, handleSubmit } = useForm<Inputs>();
	const router = useHistory();

	const onSubmit = (data: Inputs) => {
		ipcRenderer.send("connections:add", {
			name: data.name,
			address: data.host + data.port,
			username: data.username,
			password: data.password,
		});
		ipcRenderer.on("connections:add", (event, result, error) => {
			setIsOpen(true);
			if (error) {
				setAddConnectionStatus(error.toString());
			} else {
				setAddConnectionStatus("Done");
			}
		});
	};

	return (
		<div id={"new-connection"}>
			<form id={"new-connection-form"} onSubmit={handleSubmit(onSubmit)}>
				<div id={"new-connection-title"}>Add a new connection</div>
				<div id={"inputs"}>
					<div className="input-wrapper">
						<div className={"input-label noselect"}>Host</div>
						<input name="host" ref={register} autoFocus={true} />
					</div>
					<div className="input-wrapper">
						<div className={"input-label noselect"}>Port</div>
						<input name="port" ref={register} />
					</div>
					<div className="input-wrapper">
						<div className={"input-label noselect"}>Name</div>
						<input name="name" ref={register} />
					</div>
					<div className="input-wrapper">
						<div className={"input-label noselect"}>Username</div>
						<input name="username" ref={register} />
					</div>
					<div className="input-wrapper">
						<div className={"input-label noselect"}>Password</div>
						<input name="password" ref={register} />
					</div>
				</div>
				<div id={"buttons"}>
					<button id={"add-button"} type={"submit"}>
						Add
					</button>
				</div>
			</form>
			<Dialog open={isOpen}>
				<div style={{ padding: 300 }}>
					{addConnectionStatus}
					<button
						onClick={() => {
							addConnectionStatus === "Done" ? router.push("/") : setIsOpen(false);
						}}
					>
						ok
					</button>
				</div>
			</Dialog>
		</div>
	);
};

export default NewConnection;
