import React from 'react'

const PersonasHeader = ({ tipo }) => { // Recibe tipo como prop
    
    const getTitle = () => {
        switch(tipo) {
            case 'productores': return 'PRODUCTORES';
            case 'clientes': return 'CLIENTES';
            case 'transportes': return 'TRANSPORTES';
            default: return null; 
        }
    };

    return (
        <div className="personas-header">
            <h1>{getTitle()}</h1>
        </div>
    );
}

export default PersonasHeader;