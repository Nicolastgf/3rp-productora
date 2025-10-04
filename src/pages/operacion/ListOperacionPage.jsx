import React from "react";
import OperacionHeader from "../../components/operacion/OperacionesHeader";
import OperacionButtonAdd from "../../components/operacion/OperacionesButtonAdd";
import OperacionFilter from "../../components/operacion/OperacionesFilter";
import "../../styles/operaciones/Operaciones.css";


const ListOperacionPage = () => {
    return (
        <div className="operaciones-page">
            <OperacionHeader />
            <OperacionButtonAdd />
            <OperacionFilter />
        </div>
    );
};

export default ListOperacionPage;
