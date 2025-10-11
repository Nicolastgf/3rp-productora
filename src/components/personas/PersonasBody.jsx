import { useEffect, useState } from "react";
import {
  actualizarPersona,
  traerPersonasPorTipo,
} from "../../services/personasService";
import ModalForm from "../common/ModalForm";
import { configPersona } from "../../config/FormConfigs";
import "../../styles/personas/Personas.css";
import { Link } from "react-router-dom";

const PersonasBody = ({ tipo }) => {
  const [personas, setPersonas] = useState([]);
  const [personasOriginales, setPersonasOriginales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valor, setValor] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [personaEditando, setPersonaEditando] = useState(null);
  const tipoPersona = tipo

  useEffect(() => {
    const buscarPersonas = async () => {
      try {
        setLoading(true);

        const data = await traerPersonasPorTipo(tipo);
        console.log("Personas recibidas:", data);

        setPersonas(data);
        setPersonasOriginales(data);
      } catch (err) {
        console.error("Error al traer personas:", err);
        console.error("Detalles:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    buscarPersonas();
  }, [tipo]);

  const handleEditar = (persona) => {
    console.log("Editando persona:", persona);
    setPersonaEditando(persona);
    setShowEditModal(true);
  };

  const handleGuardarEdicion = async (dataEditada) => {
    try {
      if (!personaEditando) {
        alert("Error: No hay persona seleccionada para editar");
        return;
      }

      console.log("Actualizando persona:", {
        id: personaEditando.idPersona,
        datos: dataEditada,
      });

      //datos para enviar al backend
      const datosActualizacion = {
        TipoPersona: tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase(),
        NombrePersona: dataEditada.NombrePersona,
        ApellidoPersona: dataEditada.ApellidoPersona,
        DNI: dataEditada.DNI,
        MailPersona: dataEditada.MailPersona,
        TelefonoPersona: dataEditada.TelefonoPersona,
        Ubicacion: dataEditada.Ubicacion,
      };

      await actualizarPersona(personaEditando.idPersona, datosActualizacion);

      const personasActualizadas = personas.map((persona) =>
        persona.idPersona === personaEditando.idPersona
          ? { ...persona, ...dataEditada }
          : persona
      );

      setPersonas(personasActualizadas);
      setPersonasOriginales(personasActualizadas);

      alert("Persona actualizada correctamente");
      setShowEditModal(false);
      setPersonaEditando(null);
    } catch (error) {
      console.error("Error al actualizar persona:", error);
      alert("Error al actualizar la persona");
    }
  };

  const getDatosIniciales = () => {
    if (!personaEditando) return {};

    return {
      NombrePersona: personaEditando.NombrePersona,
      ApellidoPersona: personaEditando.ApellidoPersona,
      DNI: personaEditando.DNI,
      MailPersona: personaEditando.MailPersona,
      TelefonoPersona: personaEditando.TelefonoPersona,
      Ubicacion: personaEditando.Ubicacion,
    };
  };

  const handleBuscar = () => {
    console.log("Buscar:", valor);
    if (valor === "") {
      setPersonas(personasOriginales);
    } else {
      const personasFiltradas = personasOriginales.filter(
        (persona) =>
          persona.NombrePersona.toLowerCase().includes(valor.toLowerCase()) ||
          persona.ApellidoPersona.toLowerCase().includes(valor.toLowerCase()) ||
          persona.DNI.includes(valor)
      );
      setPersonas(personasFiltradas);
    }
  };

  //buscar al escribir
  const handleChange = (e) => {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);

    if (nuevoValor === "") {
      setPersonas(personasOriginales);
    } else {
      const personasFiltradas = personasOriginales.filter(
        (persona) =>
          persona.NombrePersona.toLowerCase().includes(
            nuevoValor.toLowerCase()
          ) ||
          persona.ApellidoPersona.toLowerCase().includes(
            nuevoValor.toLowerCase()
          ) ||
          persona.DNI.includes(nuevoValor)
      );
      setPersonas(personasFiltradas);
    }
  };

  // buscar al presionar Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  if (loading) {
    return (
      <div className="tabla-container">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Cargando {tipo}s...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <div className="input-buscar">
        <input
          type="text"
          placeholder={`Buscar ${tipo}`}
          className="input-buscari"
          name="inputBuscar"
          value={valor}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <button className="btn-buscar" onClick={handleBuscar}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      {personas.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#7f8c8d",
          }}
        >
          <p>No hay {tipo}s activos en el sistema</p>
        </div>
      ) : (
        <>
          <div
            style={{
              marginTop: "15px",
              textAlign: "right",
              color: "#7f8c8d",
              fontSize: "0.9rem",
            }}
          >
            Total: {personas.length}{" "}
            {tipo.toLowerCase() === "productor"
              ? personas.length !== 1
                ? "productores"
                : "productor"
              : `${tipo}${personas.length !== 1 ? "s" : ""}`}
          </div>

          <table className="tabla-gastos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((persona) => (
                <tr key={persona.idPersona} className="fila-tabla">
                  <td>{persona.NombrePersona}</td>
                  <td>{persona.ApellidoPersona}</td>
                  <td>{persona.DNI}</td>
                  <td>{persona.MailPersona || "-"}</td>
                  <td>{persona.TelefonoPersona || "-"}</td>
                  <td>{persona.Ubicacion || "-"}</td>
                  <td>
                    <div className="td-acciones">
                      <Link to={`/cuentacorriente/${tipoPersona}/${persona.idPersona}`}>
                        <button className="btn-view">
                          <span className="material-symbols-outlined">
                            visibility
                          </span>
                        </button>
                      </Link>

                      <button
                        className="btn-edit"
                        onClick={() => handleEditar(persona)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="btn-delete">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <ModalForm
        show={showEditModal}
        config={{
          ...configPersona,
          titulo: `EDITAR ${tipo?.toUpperCase()}`,
        }}
        datosIniciales={getDatosIniciales()} // pasar datos de la persona
        onClose={() => {
          setShowEditModal(false);
          setPersonaEditando(null);
        }}
        onSubmit={handleGuardarEdicion}
      />
    </div>
  );
};

export default PersonasBody;
