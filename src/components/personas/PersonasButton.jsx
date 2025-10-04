import React from 'react'

const PersonasButton = ({tipo}) => {
        const onAgregarGasto = () => {
        console.log("agregar gasto")
    }
  return (

    <>
      <div >
        <div className='botones-agreyexpo' >
        <button className="btn-agregar" onClick={onAgregarGasto}>
          + AGREGAR {tipo ? tipo.toUpperCase() : null}
        </button>

          <div className='btn-volver-container'>
          <button className="btn-exportar">
            <span class="material-symbols-outlined" style={{marginRight: "12px"}}>
            picture_as_pdf
            </span>EXPORTAR PDF
          </button>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default PersonasButton