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

export const configPersonaEditar = {
  titulo: "EDITAR PERSONA",
  campos: configPersona.campos,
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

export const configCompra = {
    titulo: "AGREGAR COMPRA",
    campos: [
        { 
            name: "IdPersona", 
            label: "Productor", 
            type: "select", 
            required: true,
            options: [] // Deberías cargar los productores desde tu backend
        },
        { 
            name: "IdProducto", 
            label: "Producto", 
            type: "select", 
            required: true,
            options: [] // Deberías cargar los productos desde tu backend
        },
        { 
            name: "PrecioUnitario", 
            label: "Precio de Compra", 
            type: "number", 
            required: true 
        },
        { 
            name: "ToneladasCompradas", 
            label: "Cargas TN.", 
            type: "number", 
            required: true,
            step: "0.01"
        },
        { 
            name: "FechaCompra", 
            label: "Fecha de Compra", 
            type: "date", 
            required: true 
        },
        { 
            name: "Descripcion", 
            label: "Descripción", 
            type: "textarea", 
            required: false 
        },
    ],
};

export const configVenta = {
    titulo: "AGREGAR VENTA",
    campos: [
        { 
            name: "IdPersona", 
            label: "Cliente", 
            type: "select", 
            required: true,
            options: [] 
        },
        { 
            name: "PrecioUnitario", 
            label: "Precio de Venta", 
            type: "number", 
            required: true 
        },
        { 
            name: "ToneladasVendidas", 
            label: "Descargas TN.", 
            type: "number", 
            required: true,
            step: "0.01"
        },
        { 
            name: "FechaVenta", 
            label: "Fecha de Venta", 
            type: "date", 
            required: true 
        },
        { 
            name: "Descripcion", 
            label: "Descripción", 
            type: "textarea", 
            required: false 
        },
    ],
};
export const configTransporte = {
    titulo: "AGREGAR TRANSPORTE",
    campos: [
        { 
            name: "FechaTransporte", 
            label: "Fecha de Salida", 
            type: "date", 
            required: true 
        },
        { 
            name: "IdPersona", 
            label: "Transportista", 
            type: "select", 
            required: true,
            options: [] 
        },
        {
            name: "NombreChofer",
            label: "Nombre del Chofer",
            type: "text",
            required: true

        },
        { 
            name: "DescargasToneladas", 
            label: "Toneladas", 
            type: "number", 
            required: true,
            step: "0.01"
        },
        { 
            name: "Origen", 
            label: "Origen", 
            type: "textarea", 
            required: true 
        },
        { 
            name: "Destino", 
            label: "Destino", 
            type: "textarea", 
            required: true 
        },
        { 
            name: "Kilometros", 
            label: "Kilometros", 
            type: "number", 
            required: true,
            step: "0.01"
        },
        { 
            name: "Descripcion", 
            label: "Descripción", 
            type: "textarea", 
            required: false 
        }
    ],
};
