import { useState } from 'react'
import GastosBody from '../../components/gastos/GastosBody'
import GastosButton from '../../components/gastos/GastosButton'
import GastosHeader from '../../components/gastos/GastosHeader'
import "../../styles/gastos/Gastos.css"

const ListGastosPage = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleVolver = () => {
    setMostrarTabla(false);
  };

  const handleBuscar = () => {
    setMostrarTabla(true);
  };

  const handleAgregarGasto = () => {
    console.log("Agregar nuevo gasto");
  };

  return (
    <div className="gastos-page">
      <GastosHeader/>
      <GastosButton 
        mostrarTabla={mostrarTabla}
        onVolver={handleVolver}
        onAgregarGasto={handleAgregarGasto}
      />
      <GastosBody 
        onVolver={handleVolver}
        onBuscar={handleBuscar}
        mostrarTabla={mostrarTabla}
      />
    </div>
  )
}

export default ListGastosPage