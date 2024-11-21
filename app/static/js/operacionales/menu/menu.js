$(document).ready(function () {
    //Obtener la ruta de la irl actual
    var currentPath = window.location.pathname;
    //Mapear rutas a  configuraciones de menu con una variable tipo objeto
    var menuMap = {
      'cliente': {
        mainMenu: '#menuRefencial',
        activeMain: '#activadoReferencial',
        subMenu: '#menuCliente'
      },
      'ciudad': {
        mainMenu: '#menuRefencial',
        activeMain: '#activadoReferencial',
        subMenu: '#menuCiudad'
      },
      'aperturacaja': {
        mainMenu: '#menuCaja',
        activeMain: '#activadoCaja',
        subMenu: '#menuApertura'
      },
      'cierrecaja': {
        mainMenu: '#menuCaja',
        activeMain: '#activadoCaja',
        subMenu: '#menuCierre'
      },
      'arqueocaja':{
        mainMenu: '#menuCaja',
        activeMain: '#activadoCaja',
        subMenu:'#menuArqueo'
      }
    };
    //funcion para activar el menu segun una ruta
    function activarMenu(config) {
      $(config.mainMenu).addClass('menu-is-openig menu-open');
      $(config.activeMain).addClass('active');
      $(config.subMenu).addClass('active');
    }
    //verificat si la url coincide con alguna clave del mapa
    //forEach metodo que se usa para recorrer el objeto menuMap
    Object.keys(menuMap).forEach(function (key) {
      if (currentPath.includes(key)) {
        activarMenu(menuMap[key]);
      }
    });
  });