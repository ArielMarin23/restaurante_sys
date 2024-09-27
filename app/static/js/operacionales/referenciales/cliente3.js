 $(document).ready(function() {   
      // Capturar el valor del modo
      var modo = $('#modo').val();
      //console.log('Modo actual:', modo); // Solo para depuración
      // Cargar datos de los select al inicio
      cargarDatosSelects();
      // Realizar acciones según el modo
      if (modo === 'agregar') {
          // Lógica para agregar un nuevo cliente
          //console.log('Modo: Agregar');
          agregarCliente();    
      } else if (modo === 'actualizar') {         
           actualizarCliente();    
      } else {
          console.log('Modo no reconocido');
      }
      //Contralador de botones
      $('.eliminar-btn').click(function(event) {
        event.preventDefault(); // Evita que el enlace navegue

        const url = $(this).attr('href'); // Obtiene la URL del atributo href

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Estás seguro de que deseas borrar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, redirige a la URL para realizar la eliminación
                window.location.href = url;
            } else {
                // Mensaje de cancelación si el usuario cancela
                Swal.fire(
                    'Cancelado',
                    'La ciudad no fue borrada.',
                    'info'
                );
            }
        });
    });
 
});
// Funciones externas al inicio del Documento
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
function actualizarCliente(){
 // Capturar el diccionario de Python convertido en JSON
 var jsonData = $('#json-data').val();
 // Convertir el JSON en un objeto JavaScript
 var cliente = JSON.parse(jsonData);

 // Formateo de fecha
 const fechaStr = cliente.fecha_nac_cliente;
 const fecha = new Date(fechaStr);  // Crear un objeto Date
 const dia = String(fecha.getDate()).padStart(2, '0');  // Días
 const mes = String(fecha.getMonth() + 1).padStart(2, '0');  // Meses (0-11)
 const año = fecha.getFullYear();  // Años
 const fechaFormateada = `${dia}/${mes}/${año}`;
 
 // Capturar y enviar los datos a los campos del formulario
 $('#codigo').val(cliente.cod_cliente);
 $('#nombre').val(cliente.nom_cliente);
 $('#apellido').val(cliente.ape_cliente);
 $('#tipo_documento').val(cliente.cod_tip_doc);
 $('#numero_documento').val(cliente.nro_doc_cliente);
 $('#direccion').val(cliente.direc_cliente);
 $('#ciudad').val(cliente.id);
 $('#nacionalidad').val(cliente.cod_nac);
 $('#numero_telefono').val(cliente.nro_telf_cliente);
 $('#fecha_nacimiento').val(fechaFormateada); // Asignar la fecha formateada
 //agregar eventos a los botones 
 $('#enviar').on('click', function(e) {
     e.preventDefault(); // Prevenir el comportamiento predeterminado del botón

     // Crear el objeto con los datos del cliente actualizados
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

     // Enviar los datos mediante AJAX
     $.ajax({
         url:'/update-cliente', // URL a la que enviar los datos
         method: 'POST',
         contentType: 'application/json',
         data: JSON.stringify(ClienteActualizado), // Convertir los datos en JSON
         success: function(response) {
             if (response.status === 'success') {
                 Swal.fire({
                     icon: 'success',
                     title: 'Éxito',
                     text: 'Cliente Actualizado exitosamente',
                     confirmButtonText: 'Aceptar'
                 }).then(() => {
                     // Redirigir al usuario después de aceptar el mensaje de éxito
                     window.location.href = response.redirect_url;
                 });
             } else {
                 Swal.fire({
                     icon: 'error',
                     title: 'Error',
                     text: 'Error al guardar el cliente: ' + response.message,
                     confirmButtonText: 'Aceptar'
                 });
             }
         },
         error: function(xhr, status, error) {
             console.error('Error en la petición AJAX:', error);
             Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Hubo un problema al Actualizar el cliente',
                 confirmButtonText: 'Aceptar'
             });
         }
     });
 });
}
function agregarCliente(){
    // capturar u enviar datos del formulario al servidor
    $('#enviar').on('click', function(e){
        e.preventDefault();//Evitar el envio tradicional del formulario
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
                if (response.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Cliente Guardado exitosamente',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        // Redirigir al usuario después de aceptar el mensaje de éxito
                        window.location.href = response.redirect_url;
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al guardar el cliente: ' + response.message,
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function(xhr, status, error) {
                // Manejar cualquier error de la petición
                console.error('Error en la solicitud:', error);
                alert('Error en la solicitud al servidor.');
            }
        });
        
    });
}

