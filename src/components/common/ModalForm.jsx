import React, { useState, useEffect } from "react";
import "../../styles/modal/Modal.css";

const ModalForm = ({ show, config, onClose, onSubmit, datosIniciales }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show && datosIniciales && Object.keys(datosIniciales).length > 0) {
      const formatearFechaParaInput = (fechaISO) => {
        if (!fechaISO) return "";
        if (
          typeof fechaISO === "string" &&
          fechaISO.match(/^\d{4}-\d{2}-\d{2}$/)
        ) {
          return fechaISO;
        }
        try {
          const fecha = new Date(fechaISO);
          if (!isNaN(fecha.getTime())) {
            return fecha.toISOString().split("T")[0];
          }
        } catch (error) {
          console.error("Error formateando fecha:", error);
        }
        return "";
      };

      const datosFormateados = { ...datosIniciales };

      const camposFecha = [
        "FechaCompra",
        "FechaVenta",
        "FechaTransporte",
        "FechaOperacion",
      ];
      camposFecha.forEach((campo) => {
        if (datosIniciales[campo]) {
          datosFormateados[campo] = formatearFechaParaInput(
            datosIniciales[campo]
          );
        }
      });

      // Inicializar campos de búsqueda para selects
      config.campos.forEach((campo) => {
        if (campo.type === "select" && datosFormateados[campo.name]) {
          const opcionSeleccionada = campo.options.find(
            (op) => op.value === datosFormateados[campo.name]
          );
          if (opcionSeleccionada) {
            datosFormateados[`${campo.name}_search`] = opcionSeleccionada.label;
          }
        }
      });

      setFormData(datosFormateados);
    }
  }, [datosIniciales, show, config.campos]);

  // Efecto para resetear cuando se cierra
  useEffect(() => {
    if (!show) {
      setFormData({});
    }
  }, [show]);

  // Efecto para cerrar dropdown al hacer click fuera - MOVER ARRIBA del return
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".autocomplete-container")) {
        const updatedFormData = { ...formData };
        Object.keys(updatedFormData).forEach((key) => {
          if (key.endsWith("_showOptions")) {
            updatedFormData[key] = false;
          }
        });
        setFormData(updatedFormData);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [formData]); 


  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando datos del formulario:", formData);
    console.log("IdPersona value:", formData.IdPersona);
    console.log("IdProducto value:", formData.IdProducto);
    console.log("IdPersona_search value:", formData.IdPersona_search);
    onSubmit(formData);
  };

  if (!show || !config || !Array.isArray(config.campos)) {
    console.warn("ModalForm recibió una config inválida:", config);
    return null;
  }

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
                <div className="autocomplete-container">
                  <input
                    type="text"
                    placeholder={`Buscar ${campo.label}...`}
                    value={formData[`${campo.name}_search`] || ""} 
                    onChange={(e) => {
                      const searchTerm = e.target.value;
                      setFormData({
                        ...formData,
                        [`${campo.name}_search`]: searchTerm,
                        [`${campo.name}_showOptions`]: searchTerm.length > 0, 
                        [campo.name]: "", 
                      });
                    }}
                    onFocus={() => {
                      if (formData[`${campo.name}_search`]) {
                        setFormData({
                          ...formData,
                          [`${campo.name}_showOptions`]: true,
                        });
                      }
                    }}
                  />

                  {(formData[`${campo.name}_showOptions`] || false) && (
                    <div className="autocomplete-options">
                      {campo.options
                        .filter((opcion) =>
                          opcion.label
                            .toLowerCase()
                            .includes(
                              (
                                formData[`${campo.name}_search`] || ""
                              ).toLowerCase()
                            )
                        )
                        .map((opcion) => (
                          <div
                            key={opcion.value}
                            className="autocomplete-option"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                [campo.name]: opcion.value,
                                [`${campo.name}_search`]: opcion.label,
                                [`${campo.name}_showOptions`]: false,
                              });
                            }}
                          >
                            {opcion.label}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
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
