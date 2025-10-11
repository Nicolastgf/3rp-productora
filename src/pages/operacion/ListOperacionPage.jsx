import React from "react";
import { useState } from "react";
import OperacionHeader from "../../components/operacion/OperacionesHeader";
import OperacionButtonAdd from "../../components/operacion/OperacionesButtonAdd";
import OperacionFilter from "../../components/operacion/OperacionesFilter";
import "../../styles/operaciones/Operaciones.css";

const ListOperacionPage = () => {
 const [mostrarTabla, setMostrarTabla] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  
  const handleVolver = () => {
    setMostrarTabla(false);
  };
  
  const handleBuscar = () => {
    setMostrarTabla(true);
  };
  
  const handleAgregarGasto = () => {
    console.log("Exportar PDF");
  };
  
  return (
    <div className="operaciones-page">
      <OperacionHeader />
      <OperacionButtonAdd
        mostrarTabla={mostrarTabla}
        onAgregarGasto={handleAgregarGasto}
        onModalChange={setModalAbierto}
      />
      <OperacionFilter
        onVolver={handleVolver}
        onBuscar={handleBuscar}
        mostrarTabla={mostrarTabla}
        modalAbierto={modalAbierto}
      />
    </div>
  );
};

export default ListOperacionPage;