import React, { useState } from "react";
import ModalForm from "../common/ModalForm";
import { configPersona } from "../../config/FormConfigs";
import "../../styles/personas/Personas.css";
import { crearPersona } from "../../services/personasService"; // ✅ servicio Axios

const PersonasButton = ({ tipo }) => {
  const [showModal, setShowModal] = useState(false);
  const [personas, setPersonas] = useState([]);


  const handleGuardarPersona = async (data) => {
  try {
    //  usando los mismos nombres del config
    const personaData = {
      TipoPersona: tipo,
      NombrePersona: data.NombrePersona,        
      ApellidoPersona: data.ApellidoPersona,    
      DNI: data.DNI,                            
      MailPersona: data.MailPersona,             
      TelefonoPersona: data.telefono,
      Ubicacion: data.direccion,
      idUsuarioCreador: 1,
    };

    console.log("📤 Enviando datos al backend:", personaData);
    const nuevaPersona = await crearPersona(personaData);
    console.log("✅ Persona creada:", nuevaPersona);

    setPersonas([...personas, nuevaPersona]);
    alert(`${tipo} agregado correctamente ✅`);
    setShowModal(false);
  } catch (error) {
    console.error("❌ Error al guardar persona:", error);
  }
};

  return (
    <>
      <div className="botones-agreyexpo">
        <button className="btn-agregar" onClick={() => setShowModal(true)}>
          + AGREGAR {tipo ? tipo.toUpperCase() : "PERSONA"}
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

      {/* 🧾 Modal genérico reutilizable */}
      <ModalForm
        show={showModal}
        config={{ ...configPersona, titulo: `CREAR ${tipo?.toUpperCase()}` }}
        onClose={() => setShowModal(false)}
        onSubmit={handleGuardarPersona}
      />
    </>
  );
};

export default PersonasButton;
