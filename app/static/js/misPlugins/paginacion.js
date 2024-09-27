$(document).ready(function() {
    const rowsPerPage = 5;  // Número de filas por página
    const rows = $('#tbl tbody tr');
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    let currentPage = 1;  // Página inicial

    // Función para mostrar una página específica
    function showPage(page) {
        rows.hide();  // Ocultar todas las filas
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.slice(start, end).show();  // Mostrar solo las filas de la página actual

        // Actualizar controles de paginación
        $('.pagination .page-item').removeClass('active');
        $('.pagination .page-item').eq(page).addClass('active');
    }

    // Crear controles de paginación dinámicamente
    function createPagination() {
        for (let i = 1; i <= totalPages; i++) {
            $('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>').insertBefore('.next-page');
        }
        $('.pagination .page-item').eq(1).addClass('active');  // Activar el primer botón de página
    }

    // Manejo de clics en los botones de paginación
    $('#pagination-controls').on('click', '.page-link', function(e) {
        e.preventDefault();
        const pageText = $(this).text();

        if (pageText === '«') {
            if (currentPage > 1) {
                currentPage--;
            }
        } else if (pageText === '»') {
            if (currentPage < totalPages) {
                currentPage++;
            }
        } else {
            currentPage = parseInt(pageText);  // Ir a la página seleccionada
        }
        showPage(currentPage);
    });

    // Inicializar la paginación
    createPagination();
    showPage(1);  // Mostrar la primera página por defecto
});