import React, {useState} from "react";
import ConnectionCard from "./ConnecionCard";
import "../assets/css/allConnections.css"


const AllConnections = () => {

    const tempConnections = [
        {name: "dumas", address: "curli.ir"},
        {name: "curl3i", address: "curli.ir"},
        {name: "curlwi", address: "curli.ir"},
        {name: "cursli", address: "curli.ir"},
        {name: "cursli", address: "curli.ir"},
        {name: "curwli", address: "curli.ir"},
        {name: "curlzi", address: "curli.ir"},
        {name: "curlsi", address: "curli.ir"},
        {name: "curlci", address: "curli.ir"},
        {name: "curlvi", address: "curli.ir"},
        {name: "curl2i", address: "curli.ir"},
        {name: "curliw", address: "curli.ir"},
        {name: "cuavbrli", address: "curli.ir"},
        {name: "curlxi", address: "curli.ir"},
        {name: "curlci", address: "curli.ir"},
        {name: "curlvci", address: "curli.ir"},
        {name: "curbli", address: "curli.ir"},
        {name: "cur ali", address: "curli.ir"},
        {name: "curdli", address: "curli.ir"},
        {name: "cubrli", address: "curli.ir"},
        {name: "curli", address: "curli.ir"},
        {name: "curali", address: "curli.ir"},
        {name: "curxli", address: "curli.ir"},
        {name: "curali", address: "curli.ir"},
        {name: "curlci", address: "curli.ir"},
        {name: "curlsi", address: "curli.ir"},
        {name: "curlfei", address: "curli.ir"},
        {name: "curlai", address: "curli.ir"},
        {name: "curlig", address: "curli.ir"},
        {name: "curljsi", address: "curli.ir"},
        {name: "curjqli", address: "curli.ir"}
        ]
    const [connections, setConnections] = useState(tempConnections);

    const deleteConnection = (connection: any) => {
        const newConnections = connections.filter((item) => {
            return item.name !== connection.name;
        });
        setConnections(newConnections);
    }

    const renderConnections = () => {
        return connections.map((connection) => {
            return <ConnectionCard connection={connection} deleteCard={deleteConnection}/>
        });
    }

    return <div id="connectionsWrapper">
        <div id="connections">
            {renderConnections()}
        </div>
    </div>
}

export default AllConnections