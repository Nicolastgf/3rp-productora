import React from "react";
import { useState } from "react";
import OperacionHeader from "../../components/operacion/OperacionesHeader";
import OperacionButtonAdd from "../../components/operacion/OperacionesButtonAdd";
import OperacionFilter from "../../components/operacion/OperacionesFilter";
import "../../styles/operaciones/Operaciones.css";
import ModalForm from "../../components/common/ModalForm";

const ListOperacionPage = () => {
 const [mostrarTabla, setMostrarTabla] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  const handleVolver = () => {
    setMostrarTabla(false);
  };
  
  const handleBuscar = () => {
    setMostrarTabla(true);
  };
  
 const handleAgregarGasto = () => {
    setShowExportModal(true);
  };
  const handleMostrarDetalleChange = (mostrandoDetalle) => {
    setMostrarDetalle(mostrandoDetalle);
  };
  
  return (
    <div className="operaciones-page">
      <OperacionHeader />
      {!mostrarDetalle && (
        <OperacionButtonAdd
          mostrarTabla={mostrarTabla}
          onAgregarGasto={handleAgregarGasto}
          onModalChange={setModalAbierto}
        />
      )}
      <OperacionFilter
        onVolver={handleVolver}
        onBuscar={handleBuscar}
        mostrarTabla={mostrarTabla}
        modalAbierto={modalAbierto}
        onMostrarDetalleChange={handleMostrarDetalleChange}
      />

       <ModalForm
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        titulo="OPERACIONES"
        onSubmit={(data) => {
          console.log("Datos para exportar:", data);
          // Aquí tu lógica para exportar PDF
          setShowExportModal(false);
        }}
      />
    </div>
  );
};

export default ListOperacionPage;