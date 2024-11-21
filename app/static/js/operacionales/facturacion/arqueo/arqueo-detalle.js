$(document).ready(function () {
    // VARIABLES GLOBALES
    let totalDenominacion = 0;
    let totalTarjeta = 0;
    let datosEfectivo = [];
    let datosTarjeta = [];
    
    // EVENTOS
    $('#agregarDenominacion').click((e) => {
        e.preventDefault(); // Evitar que la página se recargue
        toggleFormContainer('#formdenominacion-card-container');
    });
    
    $('#agregarDetalleTarjeta').click((e) => {
        e.preventDefault(); // Evitar que la página se recargue
        toggleFormContainer('#formtarjeta-card-container');
    });
    
    $('#agregarEfectivo').click(() => agregarFilaFormulario('#denominacion', '#cantidad', '#tblEfectivo tbody', 'efectivo'));
    $('#agregarTarjeta').click(() => agregarFilaFormulario('#voucher', '#tipoTarjeta', '#tblTarjeta tbody', 'tarjeta'));
    
    // Alternar visibilidad del contenedor de formulario
    function toggleFormContainer(containerSelector) {
        $(containerSelector).fadeToggle();
    }

    // FUNCIONES
    // AGREGAR UNA FILA NUEVA A LA TABLA Y AL ARRAY
    function agregarFila(datos, tableSelector, tipo) {
        let nuevaFila;

        if (tipo === 'efectivo') {
            const { denominacion, cantidad, total } = datos;
            nuevaFila = `
                <tr>
                    <td>${datosEfectivo.length + 1}.</td>
                    <td class="denominacion">${denominacion}</td>
                    <td>${cantidad}</td>
                    <td class="total">${total}</td>
                    <td>
                        <a class="btn btn-danger btn-sm btn-borrar" href="#">
                            <i class="fas fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
            $('#formdenominacion-card-container').fadeToggle();
        } else if (tipo === 'tarjeta') {
            const { voucher, tipoTarjeta, entidad, monto } = datos;
            nuevaFila = `
                <tr>
                    <td>${datosTarjeta.length + 1}.</td>
                    <td>${voucher}</td>
                    <td>${tipoTarjeta}</td>
                    <td>${entidad}</td>
                    <td class="monto">${monto.toFixed(2)}</td>
                    <td>
                        <a class="btn btn-danger btn-sm btn-borrar" href="#">
                            <i class="fas fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
            $('#formtarjeta-card-container').fadeToggle();
        }

        $(tableSelector).append(nuevaFila);
        actualizarTotal(tableSelector, tipo);
    }

    // OBTENER DATOS DEL FORMULARIO Y AGREGAR FILA
    function agregarFilaFormulario(selector1, selector2, tableSelector, tipo) {
        if (tipo === 'efectivo') {
            const denominacion = $(selector1 + ' option:selected').text().trim();
            const cantidad = parseFloat($(selector2).val());
            const total = denominacion * cantidad;

            if (denominacion && cantidad > 0) {
                // Verificar si ya existe una fila con la misma denominación
                const existeDenominacion = $('#tblEfectivo tbody .denominacion').filter(function () {
                    return $(this).text().trim().toLowerCase() === denominacion.toLowerCase();
                }).length > 0;

                if (existeDenominacion) {
                    alert('La denominación ya existe. Por favor, selecciona una diferente.');
                } else {
                    const fila = { denominacion, cantidad, total };
                    datosEfectivo.push(fila);
                    agregarFila(fila, tableSelector, tipo);
                    limpiarFormulario(selector1, selector2);
                }
            } else {
                alert('Por favor, completa todos los campos para efectivo.');
            }
        } else if (tipo === 'tarjeta') {
            const voucher = $(selector1).val().trim();
            const tipoTarjeta = $(selector2).val().trim();
            const entidad = $('#entidad').val().trim();
            const monto = parseFloat($('#montoTarjeta').val());

            if (voucher && tipoTarjeta && entidad && !isNaN(monto) && monto > 0) {
                const fila = { voucher, tipoTarjeta, entidad, monto };
                datosTarjeta.push(fila);
                agregarFila(fila, tableSelector, tipo);
                limpiarFormulario(selector1, selector2, '#entidad', '#montoTarjeta');
            } else {
                alert('Por favor, completa todos los campos para tarjeta.');
            }
        }
    }

    // LIMPIAR CAMPOS DEL FORMULARIO
    function limpiarFormulario(...selectors) {
        selectors.forEach(selector => $(selector).val(''));
    }

    // ACTUALIZAR EL TOTAL DESPUES DE AGREGAR O ELIMINAR UNA FILA
    function actualizarTotal(tableSelector, tipo) {
        let totalGeneral = 0;

        // Recalcular los totales de la tabla correspondiente
        $(tableSelector + ' tr').each(function () {
            if (tipo === 'efectivo') {
                const denominacion = parseFloat($(this).find('.denominacion').text().trim());
                const cantidad = parseFloat($(this).find('td:nth-child(3)').text().trim());
                const totalFila = denominacion * cantidad;
                $(this).find('.total').text(totalFila.toFixed(2)); // Actualizar total de la fila
                if (!isNaN(totalFila)) {
                    totalGeneral += totalFila;
                }
            } else if (tipo === 'tarjeta') {
                const monto = parseFloat($(this).find('.monto').text().trim());
                if (!isNaN(monto)) {
                    totalGeneral += monto;
                }
            }
        });

        // Actualizar las variables globales según el tipo
        if (tipo === 'efectivo') {
            totalDenominacion = totalGeneral;
            $('#totalEfectivo').val(totalDenominacion.toFixed(2));
        } else if (tipo === 'tarjeta') {
            totalTarjeta = totalGeneral;
            $('#totalTarjeta').val(totalTarjeta.toFixed(2));
        }

        // Actualizar el total general acumulado
        const totalFinal = totalDenominacion + totalTarjeta;
        $('#totalArqueo').val(totalFinal.toFixed(2));
    }

    $(document).on('click', '.btn-borrar', function (e) {
        e.preventDefault();
        const fila = $(this).closest('tr');
        const tableSelector = fila.closest('tbody').parent().attr('id');

        // Obtener los valores para restar del total global
        if (tableSelector === 'tblEfectivo') {
            const denominacion = parseFloat(fila.find('.denominacion').text().trim());
            const cantidad = parseFloat(fila.find('td:nth-child(3)').text().trim());
            const totalFila = denominacion * cantidad;
            if (!isNaN(totalFila)) {
                totalDenominacion -= totalFila; // Restar del total global de efectivo
            }
        } else if (tableSelector === 'tblTarjeta') {
            const monto = parseFloat(fila.find('.monto').text().trim());
            if (!isNaN(monto)) {
                totalTarjeta -= monto; // Restar del total global de tarjeta
            }
        }

        fila.remove(); // Eliminar la fila de la tabla

        // Actualizar los totales generales después de borrar la fila
        actualizarTotal('#tblEfectivo tbody', 'efectivo');
        actualizarTotal('#tblTarjeta tbody', 'tarjeta');
    });
});
