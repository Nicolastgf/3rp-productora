import React, { useState } from "react";
import "../../styles/modal/Modal.css";
import ModalOperacion from "../common/ModalForm";

const OperacionButtonAdd = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="botones-agreyexpo">

      <button className="btn-agregar" onClick={() => setShowModal(true)}>
        + AGREGAR OPERACION
      </button>


      <ModalOperacion
        show={showModal}
        onClose={() => setShowModal(false)}
        titulo="CREAR OPERACIÓN"
        onSubmit={(data) => console.log("Datos enviados:", data)}
      />
    </div>
  );
};

export default OperacionButtonAdd;
