import React from "react";
import "../assets/css/newConnection.css"


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewConnection = () => {

    return <div id={"new-connection"}>
        <form id={"new-connection-form"}>
            <div id={"new-connection-title"}>
                Add a new connection
            </div>
            <div id={"inputs"}>
                <div className="input-wrapper">
                    <div className={"input-label"}>Host</div>
                    <input/>
                </div>
                <div className="input-wrapper">
                    <div className={"input-label"}>Port</div>
                    <input/>
                </div>
                <div className="input-wrapper">
                    <div className={"input-label"}>Name</div>
                    <input/>
                </div>
                <div className="input-wrapper">
                    <div className={"input-label"}>Username</div>
                    <input/>
                </div>
                <div className="input-wrapper">
                    <div className={"input-label"}>Password</div>
                    <input/>
                </div>
            </div>
            <div id={"buttons"}>
                <button id={"add-button"}>Add</button>
            </div>
        </form>
    </div>
}

export default NewConnection