$(document).ready(function () {
    // VARIABLES GLOBALES
    let datosEfectivo = [];
    let datosTarjeta = [];

    // EVENTOS
    $('#agregarEfectivo').click(() => agregarFilaFormulario('#denominacion', '#cantidad', '#tblEfectivo tbody', 'efectivo'));
    $('#agregarTarjeta').click(() => agregarFilaFormulario('#voucher', '#nroTarjeta', '#tblTarjeta tbody', 'tarjeta'));

    // FUNCIONES
    

    // Agregar una fila nueva a la tabla y al array
    function agregarFila(datos, tableSelector, tipo) {
        let nuevaFila;
        if (tipo === 'efectivo') {
            const { denominacion, cantidad, total } = datos;
            nuevaFila = `
                <tr>
                    <td>${cantidad}</td>
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
        } else if (tipo === 'tarjeta') {
            const { voucher, nroTarjeta, entidad, monto } = datos;
            nuevaFila = `
                <tr>
                    <td>${voucher}</td>
                    <td>${nroTarjeta}</td>
                    <td>${entidad}</td>
                    <td class="monto">${monto}</td>
                    <td>
                        <a class="btn btn-danger btn-sm btn-borrar" href="#">
                            <i class="fas fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
        }
        $(tableSelector).append(nuevaFila);
        actualizarTotal(tableSelector, tipo);
    }

    // Obtener datos del formulario y agregar fila
    function agregarFilaFormulario(selector1, selector2, tableSelector, tipo) {
        if (tipo === 'efectivo') {
            const denominacion = $(selector1 + ' option:selected').text().trim();
            const cantidad = parseFloat($(selector2).val());
            const total = denominacion * cantidad;

            if (denominacion && cantidad) {
                const fila = { denominacion, cantidad, total };
                datosEfectivo.push(fila);
                agregarFila(fila, tableSelector, tipo);
                limpiarFormulario(selector1, selector2);
            } else {
                alert('Por favor, completa todos los campos para efectivo.');
            }
        } else if (tipo === 'tarjeta') {
            const voucher = $(selector1).val().trim();
            const nroTarjeta = $(selector2).val().trim();
            const entidad = $('#entidad').val().trim();
            const monto = parseFloat($('#montoTarjeta').val());

            if (voucher && nroTarjeta && entidad && !isNaN(monto)) {
                const fila = { voucher, nroTarjeta, entidad, monto };
                datosTarjeta.push(fila);
                agregarFila(fila, tableSelector, tipo);
                limpiarFormulario(selector1, selector2, '#entidad', '#montoTarjeta');
            } else {
                alert('Por favor, completa todos los campos para tarjeta.');
            }
        }
    }

    // Limpiar campos del formulario
    function limpiarFormulario(...selectors) {
        selectors.forEach(selector => $(selector).val(''));
    }

    // Actualizar el total después de agregar o eliminar una fila
    function actualizarTotal(tableSelector, tipo) {
        let totalGeneral = 0;
        $(tableSelector + ' tr').each(function () {
            if (tipo === 'efectivo') {
                const denominacion = parseFloat($(this).find('.denominacion').text().trim());
                const cantidad = parseFloat($(this).find('td:nth-child(3)').text().trim());
                const totalFila = denominacion * cantidad;
                $(this).find('.total').text(totalFila);
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
        console.log(`Total ${tipo === 'efectivo' ? 'Efectivo' : 'Tarjeta'}: $${totalGeneral}`);
    }

    // Borrar una fila de la tabla y el array
    $(document).on('click', '.btn-borrar', function (e) {
        e.preventDefault();
        const fila = $(this).closest('tr');
        const tableSelector = fila.closest('tbody').parent().attr('id');

        if (tableSelector === 'tblEfectivo') {
            const index = fila.index();
            datosEfectivo.splice(index, 1);
        } else if (tableSelector === 'tblTarjeta') {
            const index = fila.index();
            datosTarjeta.splice(index, 1);
        }
        fila.remove();
        actualizarTotal('#' + tableSelector + ' tbody', tableSelector === 'tblEfectivo' ? 'efectivo' : 'tarjeta');
    });
});
