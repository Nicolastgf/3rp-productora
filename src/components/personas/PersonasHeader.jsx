import React from "react";

const PersonasHeader = ({ tipo }) => {
    // Recibe tipo como prop desde useParams()
    const getTitle = () => {
        switch (tipo) {
            case "productor":
                return "PRODUCTORES";
            case "cliente":
                return "CLIENTES";
            case "transportista":
                return "TRANSPORTISTAS";
            default:
                return "PERSONAS";
        }
    };

    return (
        <div className="personas-header">
            <h1>{getTitle()}</h1>
        </div>
    );
};

export default PersonasHeader;
