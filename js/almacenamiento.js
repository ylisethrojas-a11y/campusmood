(function () {
  "use strict";

  const CLAVE_REGISTROS = "campusmood_registros";
  let registrosEnMemoria = [];
  let almacenamientoEnMemoria = false;

  function copiarRegistros(registros) {
    return registros.map(function (registro) {
      return Object.assign({}, registro);
    });
  }

  function activarRespaldo(error) {
    almacenamientoEnMemoria = true;
    const aviso = document.getElementById("storage-notice");

    if (aviso) {
      aviso.hidden = false;
    }

    if (error) {
      console.warn("CampusMood usará almacenamiento en memoria.", error);
    }
  }

  function leerRegistros() {
    if (almacenamientoEnMemoria) {
      return copiarRegistros(registrosEnMemoria);
    }

    let contenido;
    try {
      contenido = window.localStorage.getItem(CLAVE_REGISTROS);
    } catch (error) {
      activarRespaldo(error);
      return copiarRegistros(registrosEnMemoria);
    }

    if (contenido === null) {
      registrosEnMemoria = [];
      return [];
    }

    let registros;
    try {
      registros = JSON.parse(contenido);
    } catch (error) {
      activarRespaldo(error);
      return copiarRegistros(registrosEnMemoria);
    }

    if (!Array.isArray(registros)) {
      activarRespaldo(new TypeError("El contenido guardado no es un arreglo de registros."));
      return copiarRegistros(registrosEnMemoria);
    }

    registrosEnMemoria = copiarRegistros(registros);
    return copiarRegistros(registrosEnMemoria);
  }

  function guardarRegistros(registros) {
    if (!Array.isArray(registros)) {
      throw new TypeError("Los registros deben guardarse como un arreglo.");
    }

    registrosEnMemoria = copiarRegistros(registros);

    if (almacenamientoEnMemoria) {
      return;
    }

    try {
      window.localStorage.setItem(CLAVE_REGISTROS, JSON.stringify(registrosEnMemoria));
    } catch (error) {
      activarRespaldo(error);
    }
  }

  function usaAlmacenamientoEnMemoria() {
    return almacenamientoEnMemoria;
  }

  window.CampusMoodAlmacenamiento = Object.freeze({
    clave: CLAVE_REGISTROS,
    leer: leerRegistros,
    guardar: guardarRegistros,
    usaMemoria: usaAlmacenamientoEnMemoria
  });
}());
