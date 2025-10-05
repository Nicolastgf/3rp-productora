import React, { useState } from "react";
import ModalForm from "../common/ModalForm";
import { configPersona } from "../../config/FormConfigs";
import "../../styles/personas/Personas.css";
import { crearPersona } from "../../services/personasService"; // ✅ servicio Axios

const PersonasButton = ({ tipo }) => {
  const [showModal, setShowModal] = useState(false);
  const [personas, setPersonas] = useState([]);

  // ✅ Manejar el submit del modal
  const handleGuardarPersona = async (data) => {
    try {
      // 🔄 Mapeo del formulario al formato del backend
      const personaData = {
        TipoPersona: tipo,
        NombrePersona: data.nombre,
        ApellidoPersona: data.apellido,
        DNI: data.dni,
        MailPersona: data.mail,
        TelefonoPersona: data.telefono,
        Ubicacion: data.direccion,
        idUsuarioCreador: 1,
      };

      console.log("📤 Enviando datos al backend:", personaData);

      // 🔹 Consumir la API con Axios (servicio)
      const nuevaPersona = await crearPersona(personaData);

      console.log("✅ Persona creada:", nuevaPersona);

      // 🔄 Actualizar lista local (opcional)
      setPersonas([...personas, nuevaPersona]);

      alert(`${tipo} agregado correctamente ✅`);
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error al guardar persona:", error);

      // 📋 Mostrar errores de validación (del backend)
      if (error.response?.data?.errores) {
        console.table(error.response.data.errores);
        alert(
          "❌ Errores de validación:\n" +
          error.response.data.errores
            .map((e) => `${e.campo}: ${e.mensaje}`)
            .join("\n")
        );
      } else if (error.response?.data?.message) {
        alert("⚠️ " + error.response.data.message);
      } else {
        alert("Error inesperado al guardar la persona");
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
        onSubmit={handleGuardarPersona}
      />
    </>
  );
};

export default PersonasButton;
