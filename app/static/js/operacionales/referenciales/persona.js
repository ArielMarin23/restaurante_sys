$(document).ready(function () {
    $('#formCLiente').on('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto de recargar la página

        // Capturando los valores de los campos
        const nombre = $('#nombreCliente').val();
        const apellido = $('#apellidoCliente').val();
        const tipoDocumento = $('#formCLiente select:eq(0)').val();
        const numeroDocumento = $('#docNro').val();
        const direccion = $('#direccionClientes').val();
        const ciudad = $('#formCLiente select:eq(1)').val();
        const nacionalidad = $('#formCLiente select:eq(2)').val();
        const telefono = $('#telfCliente').val();
        const fechaNacimiento = $('input[data-inputmask-inputformat="dd/mm/yyyy"]').val();

        // Imprimiendo los datos en la consola
        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Tipo de Documento:', tipoDocumento);
        console.log('Número de Documento:', numeroDocumento);
        console.log('Dirección:', direccion);
        console.log('Ciudad:', ciudad);
        console.log('Nacionalidad:', nacionalidad);
        console.log('Teléfono:', telefono);
        console.log('Fecha de Nacimiento:', fechaNacimiento);
    });
});