import React, {useState} from "react";
import "../assets/css/sideMenu.css"
import SideMenuButton from "./SideMenuButton";
import { useHistory } from "react-router-dom";


const SideMenu = () => {
    const [buttons, setButtons] = useState([
        {text: "New Connection", active: false, route: "/connection/new"},
        {text: "All Connections", active: true, route: "/"},
        {text: "Favorites", active: false, route: "/connection/fav"},
        {text: "Recents", active: false, route: "/connection/recent"}
    ]);

    const router = useHistory();

    return <div className="menu">
        {buttons.map((button, index) => {
            const onClick = () => {
                const newButtons = buttons.map((item) => {
                    item.active = (item.text === button.text);
                    return item
                });
                setButtons(newButtons);
                router.push(button.route)
            }

            return <SideMenuButton key={index} onClick={onClick} active={button.active}>{button.text}</SideMenuButton>
        })}
    </div>
}

export default SideMenu;