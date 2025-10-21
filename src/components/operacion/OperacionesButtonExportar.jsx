import React, { useState } from "react";
import { configOperacion } from "../../config/FormConfigs";

import { crearOperacion } from "../../services/operacionesService";
import "../../styles/modal/Modal.css";
import "../../styles/operaciones/Operaciones.css";
import ModalForm from "../common/ModalForm";

const OperacionesButtonExportar = () => {
    const [showModal, setShowModal] = useState(false);

  const handleCrearOperacion = async (data) => {
    try {
      const operacionData = {
        FechaOperacion: data.FechaOperacion,
        Estado: data.Estado || "Pendiente",
        Descripcion: data.Descripcion,
        idUsuario: data.idUsuario || 1,
      };

      console.log("Enviando datos al backend:", operacionData);
      const nuevaOperacion = await crearOperacion(operacionData);
      console.log("Operación creada:", nuevaOperacion);

      alert("Operación creada correctamente");
      setShowModal(false);
      
    } catch (error) {
      console.error("Error al guardar operación:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al crear la operación");
      }
    }
  };
   return (
    <div className="botones-agreyexpo">

        <button className="btn-exportar" style={{}}>
          <span className="material-symbols-outlined" style={{ marginRight: "12px" }}>
            picture_as_pdf
          </span>
          EXPORTAR PDF
        </button>


      <ModalForm
        show={showModal}
        config={configOperacion}
        onClose={() => setShowModal(false)}
        onSubmit={handleCrearOperacion}
      />
    </div>
  );
}

export default OperacionesButtonExportar
