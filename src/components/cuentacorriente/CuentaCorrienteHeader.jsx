import React from 'react'
import { useParams } from 'react-router-dom'
import "../../styles/personas/CuentaCorriente.css"

const CuentaCorrienteHeader = () => {
   const { tipo, idPersona } = useParams();
   const tipoMayuscula = tipo.toUpperCase();

  return (

        <div className="cuenta-header">
            <h1>{tipoMayuscula}</h1>
            <h4>CUENTA CORRIENTE</h4>
        </div>

  )
}

export default CuentaCorrienteHeader