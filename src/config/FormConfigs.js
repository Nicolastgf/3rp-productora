export const configPersona = {
    titulo: "CREAR PERSONA",
    campos: [
        { name: "NombrePersona", label: "Nombre", type: "text", required: true },
        { name: "ApellidoPersona", label: "Apellido", type: "text", required: true },
        { name: "DNI", label: "DNI", type: "text", required: true },
        { name: "MailPersona", label: "Mail", type: "email" },
        { name: "TelefonoPersona", label: "Teléfono", type: "tel" },
        { name: "Ubicacion", label: "Ubicación", type: "text" },
    ],
};

// En FormConfigs.js
export const configOperacion = {
    titulo: "CREAR OPERACIÓN",
    campos: [
        { 
            name: "FechaOperacion", 
            label: "Fecha de Operación", 
            type: "date", 
            required: true 
        },
        { 
            name: "Descripcion", 
            label: "Descripción", 
            type: "textarea", 
            required: false 
        },
        {
            name: "Estado",
            label: "Estado",
            type: "select",
            options: ["Pendiente", "En Proceso", "Completada", "Cancelada"],
            required: true,
        },
        { 
            name: "idUsuario", 
            label: "ID Usuario", 
            type: "number", 
            required: true,
            default: 1
        },
    ],
};

export const configGastos = {
    titulo: "INGRESAR GASTO",
    campos: [
        { name: "fecha", label: "Fecha", type: "date", required: true },
        { name: "descripcion", label: "Descripcion", type: "text", required: true },
        { name: "caja", label: "Caja", type: "text", required: true },
        { name: "total", label: "Total", type: "number" },

    ],
};