import { ipcRenderer } from "electron";

export const ipcSend = async (event: string, input?: any) => {
	const ipcRendererSync = () =>
		new Promise((resolve, reject) => {
			const ipcListener = (event, item, err) => {
				if (err) {
					reject(err);
				}
				resolve(item);
				ipcRenderer.removeListener(event, ipcListener);
			};
			ipcRenderer.on(event, ipcListener);
		});
	ipcRenderer.send(event, input);
	return (await ipcRendererSync()) as any;
};
