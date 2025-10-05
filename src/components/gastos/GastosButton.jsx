import React, { useState } from "react";
import ModalForm from "../common/ModalForm"; // ✅ Modal genérico reutilizable
import { configGastos } from "../../config/FormConfigs"; // ✅ Config JSON de gastos
import "../../styles/gastos/Gastos.css"; // tu css (ajustalo al nombre que uses)

const GastosButton = ({ mostrarTabla, onVolver }) => {
  const [showModal, setShowModal] = useState(false); // controla visibilidad del modal

  // 📦 Maneja el envío del formulario del modal
  const handleGuardarGasto = async (data) => {
    try {
      console.log("💾 Gasto guardado:", data);
      // Más adelante podés conectarlo con tu backend:
      /*
      const response = await fetch("http://localhost:5000/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("✅ Gasto creado:", result);
      */
      alert("Gasto agregado correctamente ✅");
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error al guardar gasto:", error);
      alert("Error al guardar el gasto");
    }
  };

  return (
    <>
      <div>
        {/* 🔙 Botón volver si hay tabla visible */}
        {mostrarTabla && (
          <div className="btn-volver-container">
            <button className="btn-volver" onClick={onVolver}>
              <span className="material-symbols-outlined" style={{ marginRight: "12px" }}>
                arrow_back
              </span>
              VOLVER
            </button>
          </div>
        )}

        {/* 🔹 Contenedor de botones principales */}
        <div className="botones-agreyexpo">
          {/* Botón que abre el modal */}
          <button className="btn-agregar" onClick={() => setShowModal(true)}>
            + AGREGAR GASTO
          </button>

          {/* Exportar PDF (solo visible si hay tabla) */}
          {mostrarTabla && (
            <div className="btn-volver-container">
              <button className="btn-exportar" onClick={onVolver}>
                <span className="material-symbols-outlined" style={{ marginRight: "12px" }}>
                  picture_as_pdf
                </span>
                EXPORTAR PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🧾 Modal Form Reutilizable */}
      <ModalForm
        show={showModal}
        config={configGastos}
        onClose={() => setShowModal(false)}
        onSubmit={handleGuardarGasto}
      />
    </>
  );
};

export default GastosButton;
