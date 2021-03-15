import React from "react";
import "../assets/css/main.css"

const Main = (props: {
    component: any
}) => {

    return <div className="main">
        <props.component/>
    </div>
}

export default Main;