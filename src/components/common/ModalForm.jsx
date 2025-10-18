import React, { useState, useEffect } from "react";
import "../../styles/modal/Modal.css";

const ModalForm = ({ show, config, onClose, onSubmit, datosIniciales }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show) setFormData(datosIniciales || {});
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">{config.titulo}</h3>
        <form className="modal-grid" onSubmit={handleSubmit}>
          {config.campos.map((campo) => (
            <div key={campo.name} className="modal-field">
              <label>{campo.label}</label>
              <input
                type={campo.type}
                name={campo.name}
                value={formData[campo.name] || ""}
                onChange={handleChange}
                required={campo.required}
                placeholder={campo.placeholder || campo.label}
              />
            </div>
          ))}

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              ✖ Cancelar
            </button>
            <button type="submit" className="btn-save">
              💾 Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
