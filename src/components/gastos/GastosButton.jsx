import React from 'react'

const GastosButton = ({ mostrarTabla, onVolver, onAgregarGasto }) => {
  return (
    <>
      <div>
        {mostrarTabla && (
          <div className='btn-volver-container'>
          <button className="btn-volver" onClick={onVolver}>
            <span class="material-symbols-outlined" style={{marginRight: "12px"}}>
            arrow_back
            </span>VOLVER
          </button>
          </div>
          
          
        )}
        <div className='botones-agreyexpo' >
        <button className="btn-agregar" onClick={onAgregarGasto}>
          + AGREGAR GASTO
        </button>
        {mostrarTabla && (
          <div className='btn-volver-container'>
          <button className="btn-exportar" onClick={onVolver}>
            <span class="material-symbols-outlined" style={{marginRight: "12px"}}>
            picture_as_pdf
            </span>EXPORTAR PDF
          </button>
          </div>
        )}
        </div>
        
      </div>
    </>
  )
}

export default GastosButton