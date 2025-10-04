import React from 'react'
import { useParams } from 'react-router-dom'
import PersonasBody from '../../components/personas/PersonasBody'
import PersonasHeader from '../../components/personas/PersonasHeader'
import "../../styles/personas/Personas.css"
import PersonasButton from '../../components/personas/PersonasButton'

const ListPersonsPage = () => {
    const { tipo } = useParams() 
    
    return (
        <div className='personas-page'>
            <PersonasHeader tipo={tipo} />
            <PersonasButton tipo={tipo}/>
            <PersonasBody tipo={tipo} />
        </div>
    )
}

export default ListPersonsPage