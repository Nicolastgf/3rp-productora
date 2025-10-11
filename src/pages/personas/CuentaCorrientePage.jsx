import React from 'react'
import CuentaCorrienteHeader from '../../components/cuentacorriente/CuentaCorrienteHeader'
import CuentaCorrienteButton from '../../components/cuentacorriente/CuentaCorrienteButton'
import CuentaCorrienteBody from '../../components/cuentacorriente/CuentaCorrienteBody'

const CuentaCorrientePage = () => {
  return (
    <div className='cuenta-page'>
      <CuentaCorrienteHeader/>
      <CuentaCorrienteButton/>
      <CuentaCorrienteBody/>
        
    </div>
  )
}

export default CuentaCorrientePage