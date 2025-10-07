import React, { useState, useEffect } from "react";
import "../../styles/modal/Modal.css";

const ModalForm = ({ show, config, onClose, onSubmit, datosIniciales = {} }) => {

  const [formData, setFormData] = useState({});

 
  useEffect(() => {
    if (show) {
      console.log("recibió datos iniciales:", datosIniciales);
      setFormData(datosIniciales);
    }
  }, [show, datosIniciales]); // Se ejecuta cuando show o datosIniciales cambian

  // resetear form cuando se cierra el modal
  useEffect(() => {
    if (!show) {
      setFormData({});
    }
  }, [show]);


  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Enviando datos del formulario:", formData);
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{config.titulo}</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          {config.campos.map((campo) => (
            <div key={campo.name} className="form-group">
              <label>{campo.label}</label>
              {/* Campos normales */}
              {campo.type !== "select" && (
                <input
                  type={campo.type}
                  name={campo.name}
                  value={formData[campo.name] || ""} 
                  onChange={handleChange}
                  required={campo.required}
                />
              )}
              {campo.type === "select" && (
                <select
                  name={campo.name}
                  value={formData[campo.name] || ""} 
                  onChange={handleChange}
                  required={campo.required}
                >
                  <option value="">Seleccionar</option>
                  {campo.options.map((opcion) => (
                    <option key={opcion} value={opcion.toLowerCase()}>
                      {opcion}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <hr className="modal-divider" />

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;