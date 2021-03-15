import React from "react";
import "../assets/css/main.css"
import closeIcon from "../assets/icons/close.svg";
import minimizeIcon from "../assets/icons/minimize.svg"
import {ipcRenderer} from "electron"

const Header = () => {
    const closeApp = () => {
        ipcRenderer.send("app:close")
    }

    const minimizeApp = () => {
        ipcRenderer.send("app:minimize")
    }

    return <div id="header">
        <div id="title" className="noselect">
            Redis GUI
        </div>
        <div id="headerButtons">
            <img id="minimize-button" className="noselect" src={minimizeIcon} alt={"minimize"} onClick={minimizeApp}/>
            <img id="close-button" className="noselect" src={closeIcon} alt={"close"} onClick={closeApp}/>
        </div>
    </div>
}

export default Header;