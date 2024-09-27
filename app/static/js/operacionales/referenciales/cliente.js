
$(document).ready(function(){
    
    //Carga los datos de los select al inicio
    $.getJSON('/datos_formulario', function(data){
        //rellenar select de cuidades
        var ciudadesSelect = $('#ciudad');
        $.each(data.ciudades, function(index, ciudad){
            ciudadesSelect.append(new Option(ciudad.descripcion, ciudad.id));
        });
        //Rellenar select de nacionalidades
        var nacionalidadesSelect = $('#nacionalidad');
        $.each(data.nacionalidades, function(index, nacionalidad){
            nacionalidadesSelect.append(new Option(nacionalidad.descrip_nac, nacionalidad.cod_nac));
        });
        //rellenar select de tipos de documentos
        var tiposDocumentosSelect = $('#tipo_documento');
        $.each(data.tipos_documentos, function(index, tipo_documento){
            tiposDocumentosSelect.append(new Option(tipo_documento.descrip_tip_doc, tipo_documento.cod_tip_doc));
        });
    });
    // capturar u enviar datos del formulario al servidor
    $('#formCliente').on('submit', function(event){
        event.preventDefault();//Evitar el envio tradicional del formulario
        //Capturar y enviar datos del formulario al servidor
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
        //console.log(formData)
        // Enviar los datos al servidor usando Ajax
        $.ajax({
            url: '/saved-cliente',  // Asegúrate de que esta ruta exista en Flask
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),  // Enviar los datos en formato JSON
            success: function(response) {
                // Verificar la respuesta del servidor
                if (response.status== 'success') {
                    // Redirigir al index si la respuesta es exitosa
                    window.location.href = response.redirect_url;
                } else {
                    // Mostrar un mensaje de error si algo falla
                    alert('Error al guardar el cliente.' + response.message);
                }
            },
            error: function(xhr, status, error) {
                // Manejar cualquier error de la petición
                console.error('Error en la solicitud:', error);
                alert('Error en la solicitud al servidor.');
            }
        });
        
    });
    

    //Captura y envia a los campos del formulario
    $('#codigo').val(cliente.cod_cliente)
    $('#nombre').val(cliente.nom_cliente)
    $('#apellido').val(cliente.ape_cliente)
    $('#tipo_documento').val(cliente.cod_tip_doc)
    $('#numero_documento').val(cliente.nro_doc_cliente)
    $('#direccion').val(cliente.direc_cliente)
    $('#ciudad').val(cliente.id)
    $('#nacionalidad').val(cliente.cod_nac)
    $('#numero_telefono').val(cliente.nro_telf_cliente)
    $('#fecha_nacimiento').val(`${dia}/${mes}/${año}`);
    //Al presionar el boton guarda los datos
    $('#formClienteEdit').on('submit', function(event){
        event.preventDefault();
        //captura mi diccionario de python convertido en json
        var jsonData = $('#json-data').val();
        //Convierte el Json en un objeto javascript
        var cliente = JSON.parse(jsonData);
        //Formateo de fecha
        // Suponiendo que cliente.fecha_nac_cliente está en el formato "Tue, 12 Apr 1988 00:00:00 GMT"
        const fechaStr = cliente.fecha_nac_cliente;
        // Crear un objeto Date a partir de la cadena
        const fecha = new Date(fechaStr);
        // Formatear la fecha a "DD/MM/YYYY"
        const dia = String(fecha.getDate()).padStart(2, '0'); // Días
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses (0-11)
        const año = fecha.getFullYear(); // Años
        // Inicializar Select2 Elements
        // captura los nuevos  datos ingresados por el usuario
        var ClienteActualizado = {
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
        $.ajax({
            url:'/update-cliente', //url a la que enviar los datos
            method: 'POST',
            contentType:'application/json',
            data: JSON.stringify(ClienteActualizado), //convertir los datos en JSON
            success:function(response){
                if (response.status == 'success'){
                   swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: 'Cliente guardado exitosamente',
                    confirmButtonText: 'Aceptar'
                   }).then(() => {
                        window.location.href = response.redirect_url;
                   });
                }else{
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al guardar el cliente' + response.message,
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function(xhr, status, error){
                console.error('Error en la petición AJAX', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar el cliente',
                    confirmButtonText: 'Aceptar'
                });
            }    
        });
    });
    
    
});
/*
Sin captura lo que seleciona el usuarioo}
$.getJSON('/api/datos_formulario', function(data) {
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

    // Rellenar select de tipos de documento
    var tiposDocumentosSelect = $('#tipo_documento');
    $.each(data.tipos_documentos, function(index, tipo_documento) {
        tiposDocumentosSelect.append(new Option(tipo_documento.descrip_tip_doc, tipo_documento.cod_tip_doc));

        ###Otro ejemplo####
        $(document).ready(function() {
    // Cargar los datos de los selects al inicio
    $.getJSON('/api/datos_formulario', function(data) {
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

        // Rellenar select de tipos de documento
        var tiposDocumentosSelect = $('#tipo_documento');
        $.each(data.tipos_documentos, function(index, tipo_documento) {
            tiposDocumentosSelect.append(new Option(tipo_documento.descrip_tip_doc, tipo_documento.cod_tip_doc));
        });
    });

    // Capturar lo que el usuario selecciona en los selects
    $('#ciudad').on('change', function() {
        var ciudadSeleccionada = $(this).val();
        console.log("Ciudad seleccionada: " + ciudadSeleccionada);
    });

    $('#nacionalidad').on('change', function() {
        var nacionalidadSeleccionada = $(this).val();
        console.log("Nacionalidad seleccionada: " + nacionalidadSeleccionada);
    });

    $('#tipo_documento').on('change', function() {
        var tipoDocumentoSeleccionado = $(this).val();
        console.log("Tipo de documento seleccionado: " + tipoDocumentoSeleccionado);
    });
    });

    });
});*/
