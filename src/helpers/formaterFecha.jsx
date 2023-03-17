export const formatearFecha = fecha => {


    const nuevaFecha = new Date(fecha);

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleString('es-ES', opciones);
}