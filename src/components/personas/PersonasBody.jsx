import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const PersonasBody = ({ tipo }) => {
    const [productores, setProductores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [transportes, setTransportistas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const getPersonas = async () => {
        try {
            const res = await axios.get("http://localhost:3000/personas");
            const resp = res.data;
            
            console.log("Respuesta completa:", resp);
            
            const productoresData = resp.find(item => item.productores)?.productores || [];
            const clientesData = resp.find(item => item.clientes)?.clientes || [];
            const transportistasData = resp.find(item => item.transportes)?.transportes || [];
            
            console.log("Productores data:", productoresData);
            console.log("Clientes data:", clientesData);
            console.log("Transportistas data:", transportistasData);
            
            setProductores(productoresData);
            setClientes(clientesData);
            setTransportistas(transportistasData);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPersonas();
    }, []);

    // Determinar q datos mostrar segun el tipoPersona
    const datosAMostrar = 
        tipo === 'productores' ? productores :
        tipo === 'clientes' ? clientes :
        tipo === 'transportes' ? transportes : [];

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="tabla-container">
            <table className="tabla-gastos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Mail</th>
                        <th>Telefono</th>
                        <th>Ubicacion</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {datosAMostrar.map((persona, index) => (
                        <tr key={persona.idPersona || index} className="fila-tabla">
                            <td>{index + 1}</td>
                            <td>{persona.NombrePersona}</td>
                            <td>{persona.ApellidoPersona}</td>
                            <td>{persona.DNI}</td>
                            <td>{persona.MailPersona}</td>
                            <td>{persona.TelefonoPersona}</td>
                            <td>{persona.Ubicacion}</td>
                            <td>
                                <div className="td-acciones">
                                    <button className="btn-view">
                                        <span class="material-symbols-outlined">visibility</span>
                                    </button>
                                    <button className="btn-edit">
                                        <span className="material-symbols-outlined">edit</span> 
                                    </button>
                                    <button className="btn-delete">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                    {datosAMostrar.length === 0 && (
                        <tr className="fila-tabla">
                            <td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>
                                No hay datos disponibles para {tipo}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PersonasBody;