import React, { useContext } from "react";
import { DataContext } from "../store/DataContext";
import ReactJson from "react-json-view";

const ConnectionDisplay = () => {
	const dataContext = useContext(DataContext);

	return (
		<ReactJson
			src={dataContext.data}
			theme={{
				base00: "white",
				base01: "#444",
				base02: "#444",
				base03: "#444",
				base04: "purple",
				base05: "#444",
				base06: "#D8D3D3",
				base07: "#D8D3D3",
				base08: "#444",
				base09: "#C08183",
				base0A: "#C08183",
				base0B: "rgb(168, 47, 50)",
				base0C: "rgb(168, 47, 50)",
				base0D: "rgb(168, 47, 50)",
				base0E: "rgb(168, 47, 50)",
				base0F: "rgb(168, 47, 50)",
			}}
			displayDataTypes={false}
			enableClipboard={false}
			indentWidth={2}
			displayObjectSize={false}
			collapseStringsAfterLength={100}
			style={{
				backgroundColor: "#232323",
				padding: "10px 0 0 10px",
				flexGrow: 1,
				margin: "15px 0 5px 0",
				fontSize: "15px",
				letterSpacing: "px",
			}}
		/>
	);
};

export default ConnectionDisplay;
