import React from "react";

const ConnectionInput = (props: { input: any }) => {
	const renderInputs = () => {
		const inputs = [];
		console.log(props.input);
		for (let i = 0; i < props.input.placeholders.length; i++) {
			inputs.push(
				<input key={i} className={"connection-input"} placeholder={props.input.placeholders[i]} />
			);
		}
		return inputs;
	};

	return <div id={"connection-input-wrapper"}> {renderInputs()}</div>;
};

export default ConnectionInput;
