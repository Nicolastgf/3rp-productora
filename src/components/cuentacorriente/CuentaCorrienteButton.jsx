import React from 'react'
import { useState } from "react";
import ModalForm from "../common/ModalForm";
import { configPersona } from "../../config/FormConfigs";
import "../../styles/personas/Personas.css";
import { crearPersona } from "../../services/personasService";

const CuentaCorrienteButton = () => {
      const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="botones-agreyexpo">
        <button className="btn-agregar" onClick={() => setShowModal(true)}>
          + AGREGAR PAGO
        </button>

        <div className="btn-volver-container">
          <button className="btn-exportar">
            <span
              className="material-symbols-outlined"
              style={{ marginRight: "12px" }}
            >
              picture_as_pdf
            </span>
            EXPORTAR PDF
          </button>
        </div>
      </div>
    </>
  )
}

export default CuentaCorrienteButton