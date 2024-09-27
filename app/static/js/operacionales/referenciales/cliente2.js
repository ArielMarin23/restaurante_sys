$(document).ready(function() {
    // Cargar datos de los select al inicio
    cargarDatosSelects();

    // Capturar el evento de envío del formulario
    $('#formCliente').on('submit', function(event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario
        // Verificar el modo (agregar o actualizar)
        const modo = $('#modo').val();
        if (modo === 'actualizar') {
            actualizarCliente(); // Llamar función para actualizar
        } else {
            agregarCliente(); // Llamar función para agregar
        }
    });

    // Cargar datos de un cliente para actualizarlo
    cargarDatosCliente();
});

// Función para cargar los datos de los selects
function cargarDatosSelects() {
    $.getJSON('/datos_formulario', function(data) {
        // Rellenar select de ciudades
        var ciudadesSelect = $('#ciudad');
        $.each(data.ciudades, function(index, ciudad) {
            ciudadesSelect.append(new Option(ciudad.descripcion, ciudad.id));
        });
        // Rellenar select de nacionalidades
        var nacionalidadesSelect = $('#nacionalidad');
        $.each(data.nacionalidades, function(index, nacionalidad) {
            nacionalidadesSelect.append(new Option(nacionalidad.descrip_nac, nacionalidad.cod_nac));
        });
        // Rellenar select de tipos de documentos
        var tiposDocumentosSelect = $('#tipo_documento');
        $.each(data.tipos_documentos, function(index, tipo_documento) {
            tiposDocumentosSelect.append(new Option(tipo_documento.descrip_tip_doc, tipo_documento.cod_tip_doc));
        });
    });
}

// Función para agregar un nuevo cliente
function agregarCliente() {
    let formData = {
        nom_cliente: $('#nombre').val(),
        ape_cliente: $('#apellido').val(),
        tipo_documento: $('#tipo_documento').val(),
        nro_doc_cliente: $('#numero_documento').val(),
        direc_cliente: $('#direccion').val(),
        ciudad: $('#ciudad').val(),
        nacionalidad: $('#nacionalidad').val(),
        nro_telf_cliente: $('#numero_telefono').val(),
        fecha_nac_cliente: $('#fecha_nacimiento').val(),
    };

    // Enviar los datos al servidor usando Ajax
    $.ajax({
        url: '/saved-cliente',  // Asegúrate de que esta ruta exista en Flask
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),  // Enviar los datos en formato JSON
        success: function(response) {
            // Verificar la respuesta del servidor
            if (response.status == 'success') {
                // Redirigir al index si la respuesta es exitosa
                window.location.href = response.redirect_url;
            } else {
                // Mostrar un mensaje de error si algo falla
                alert('Error al guardar el cliente: ' + response.message);
            }
        },
        error: function(xhr, status, error) {
            // Manejar cualquier error de la petición
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor.');
        }
    });
}

// Función para actualizar un cliente existente
function actualizarCliente() {
    // Captura y envia a los campos del formulario
    let formData = {
        cod_cliente: $('#codigo').val(),
        nom_cliente: $('#nombre').val(),
        ape_cliente: $('#apellido').val(),
        tipo_documento: $('#tipo_documento').val(),
        nro_doc_cliente: $('#numero_documento').val(),
        direc_cliente: $('#direccion').val(),
        ciudad: $('#ciudad').val(),
        nacionalidad: $('#nacionalidad').val(),
        nro_telf_cliente: $('#numero_telefono').val(),
        fecha_nac_cliente: $('#fecha_nacimiento').val(),
    };

    // Enviar los datos al servidor usando Ajax
    $.ajax({
        url: '/update-cliente', // URL para actualizar el cliente
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData), // Convertir los datos en JSON
        success: function(response) {
            if (response.status == 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Cliente actualizado exitosamente',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = response.redirect_url;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar el cliente: ' + response.message,
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar el cliente',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}

// Función para cargar los datos de un cliente
function cargarDatosCliente() {
    // captura mi diccionario de python convertido en json
    var jsonData = $('#json-data').val();
    // Convierte el Json en un objeto javascript
    var cliente = JSON.parse(jsonData);

    // Formateo de fecha
    const fechaStr = cliente.fecha_nac_cliente;
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, '0'); // Días
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses (0-11)
    const año = fecha.getFullYear(); // Años

    // Inicializar Select2 Elements
    if (cliente) {
        $('#modo').val('actualizar'); // Establecer el modo a actualizar
        $('#codigo').val(cliente.cod_cliente);
        $('#nombre').val(cliente.nom_cliente);
        $('#apellido').val(cliente.ape_cliente);
        $('#tipo_documento').val(cliente.cod_tip_doc);
        $('#numero_documento').val(cliente.nro_doc_cliente);
        $('#direccion').val(cliente.direc_cliente);
        $('#ciudad').val(cliente.id);
        $('#nacionalidad').val(cliente.cod_nac);
        $('#numero_telefono').val(cliente.nro_telf_cliente);
        $('#fecha_nacimiento').val(`${dia}/${mes}/${año}`); // Asegúrate de que este formato sea compatible
    }
}
