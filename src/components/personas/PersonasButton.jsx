import React, { useState } from "react";
import ModalForm from "../common/ModalForm";
import { configPersona } from "../../config/FormConfigs";
import "../../styles/personas/Personas.css";
import { crearPersona } from "../../services/personasService"; 

const PersonasButton = ({ tipo }) => {
  const [showModal, setShowModal] = useState(false);
  const [personas, setPersonas] = useState([]);


  const handleCrearPersona = async (data) => {
    const tipoConfigurado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
  try {
    
    const personaData = {
      TipoPersona: tipoConfigurado,
      NombrePersona: data.NombrePersona,        
      ApellidoPersona: data.ApellidoPersona,    
      DNI: data.DNI,                            
      MailPersona: data.MailPersona,             
      TelefonoPersona: data.TelefonoPersona,
      Ubicacion: data.Ubicacion,
      idUsuarioCreador: 1,
    };

    console.log("Enviando datos al backend:", personaData);
    const nuevaPersona = await crearPersona(personaData);
    console.log("Persona creada:", nuevaPersona);

    setPersonas([...personas, nuevaPersona]);
    alert(`${tipo} agregado correctamente `);
    setShowModal(false);
  } catch (error) {
    console.error("Error al guardar persona:", error);
    if (error.response?.data?.errores) {
      console.error("Errores de validación:", error.response.data.errores);
      const errores = error.response.data.errores.map(e => 
        `• ${e.campo}: ${e.mensaje}`
      ).join('\n');
      alert(`Errores de validación:\n${errores}`);
    } else if (error.response?.data?.message) {
      console.error("🔍 Mensaje de error:", error.response.data.message);
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("🔍 Error sin detalles:", error);
      alert("Error al crear la persona");
    }

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
        onSubmit={handleCrearPersona}
      />
    </>
  );
};

export default PersonasButton;
