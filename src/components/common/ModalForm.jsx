import React, { useState, useEffect } from "react";
import "../../styles/modal/Modal.css";

const ModalForm = ({ show, config, onClose, onSubmit, datosIniciales }) => {
  const [formData, setFormData] = useState({});

  // Efecto para cargar datos iniciales cuando el modal se abre
  useEffect(() => {
    if (show) {
      console.log("📥 Cargando datos iniciales:", datosIniciales);
      // Si hay datosIniciales, los usamos, sino objeto vacío
      setFormData(datosIniciales || {});
    }
  }, [show]); // ← Solo dependemos de 'show', no de datosIniciales

  // Efecto para resetear cuando se cierra
  useEffect(() => {
    if (!show) {
      setFormData({});
    }
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
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
              
              {campo.type !== "select" && campo.type !== "textarea" && (
                <input
                  type={campo.type}
                  name={campo.name}
                  value={formData[campo.name] || ""} 
                  onChange={handleChange}
                  required={campo.required}
                  placeholder={campo.placeholder || ""}
                />
              )}

              {campo.type === "textarea" && (
                <textarea
                  name={campo.name}
                  value={formData[campo.name] || ""}
                  onChange={handleChange}
                  required={campo.required}
                  placeholder={campo.placeholder || ""}
                  rows="3"
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
                    <option key={opcion} value={opcion}>
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