import React from "react";
import "../assets/css/connectionCard.css";
import starIcon from "../assets/icons/star.svg";
import trashIcon from "../assets/icons/trash.svg";
import editIcon from "../assets/icons/edit.svg";
import { useHistory } from "react-router-dom";

const ConnectionCard = (props: {
	connection: {
		name: string;
		address: string;
		id: string;
	};
	deleteCard: any;
}) => {
	const router = useHistory();

	return (
		<div className="connection">
			<div
				className="connection-left"
				onClick={() => {
					router.push(`/connection/${props.connection.id}`, { connection: props.connection });
				}}
			>
				<div className="connection-name">{props.connection.name}</div>
				<div className="connection-address">{props.connection.address}</div>
			</div>
			<div className="connection-right">
				<img className="noselect connection-button" src={starIcon} />
				<img className="noselect connection-button" src={editIcon} />
				<img
					className="noselect connection-button"
					src={trashIcon}
					onClick={() => {
						props.deleteCard(props.connection);
					}}
				/>
			</div>
		</div>
	);
};

export default ConnectionCard;
