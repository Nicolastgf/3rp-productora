export const configPersona = {
    titulo: "CREAR PERSONA",
    campos: [
        { name: "NombrePersona", label: "Nombre", type: "text", required: true },
        { name: "ApellidoPersona", label: "Apellido", type: "text", required: true },
        { name: "DNI", label: "DNI", type: "text", required: true },
        { name: "MailPersona", label: "Mail", type: "email" },
        { name: "telefono", label: "Teléfono", type: "text" },
        { name: "direccion", label: "Dirección", type: "text" },
    ],
};

export const configOperacion = {
    titulo: "CREAR OPERACIÓN",
    campos: [
        { name: "fecha", label: "Fecha", type: "date", required: true },
        {
            name: "producto",
            label: "Producto",
            type: "select",
            options: ["Maíz", "Soja", "Trigo", "Expeller"],
            required: true,
        },
        { name: "productor", label: "Productor", type: "text", required: true },
        { name: "precioCompra", label: "Precio de compra (USD/TN)", type: "number" },
        { name: "cargas", label: "Cargas (TN)", type: "number" },
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