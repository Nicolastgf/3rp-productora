import React, { useState } from "react";
import "../../styles/modal/Modal.css";
import ModalOperacion from "../common/ModalForm";

const OperacionButtonAdd = ({ mostrarTabla, onAgregarGasto }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div className="botones-agreyexpo">
          <button className="btn-agregar" onClick={() => setShowModal(true)}>
            + AGREGAR OPERACION
          </button>

          {mostrarTabla && (
            <button className="btn-exportar" onClick={onAgregarGasto}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: "12px" }}
              >
                picture_as_pdf
              </span>
              EXPORTAR PDF
            </button>
          )}

          <ModalOperacion
            show={showModal}
            onClose={() => setShowModal(false)}
            titulo="CREAR OPERACIÓN"
            onSubmit={(data) => console.log("Datos enviados:", data)}
          />
        </div>
      </div>
    </>
  );
};

export default OperacionButtonAdd;