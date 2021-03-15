import React from "react";

const SideMenuButton = (props: {
    children: string,
    active: boolean,
    onClick: any
}) => {
    return <div
        className={(props.active ? "menu-button selected noselect" : "menu-button unselected noselect")}
        onClick={props.onClick}
    >
        {props.children}
    </div>
}

export default SideMenuButton;