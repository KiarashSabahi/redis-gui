import React, { createContext, FC, ReactNode, useState } from "react";
import { ipcSend } from "../utils/ipc";

type Props = {
	children: ReactNode;
};

export const DataContext = createContext<any>({});
const DataProvider: FC<Props> = ({ children }) => {
	const [data, setData] = useState([]);

	const getAll = async () => {
		try {
			const temp = await ipcSend("connection:getAll", { pagination: 10 });
			setData(temp);
		} catch (e) {
			console.log(e);
		}
	};

	return <DataContext.Provider value={{ data, getAll }}>{children}</DataContext.Provider>;
};

export default DataProvider;
