(function () {
  "use strict";

  const pantallas = {
    "screen-home": "home",
    "screen-check-in": "check-in",
    "screen-break": "break",
    "screen-history": "history"
  };

  function actualizarVista(idPantalla) {
    const registros = window.CampusMoodAlmacenamiento.leer();
    window.CampusMoodHistorial.renderizar(registros);

    if (idPantalla === "screen-check-in") {
      window.CampusMoodRegistro.actualizarContador();
    } else if (idPantalla === "screen-break") {
      window.CampusMoodRegistro.actualizarPausa(registros);
    }
  }

  function navegar(idPantalla) {
    if (!Object.prototype.hasOwnProperty.call(pantallas, idPantalla)) {
      return;
    }

    document.getElementById(idPantalla).checked = true;
    actualizarVista(idPantalla);
  }

  document.addEventListener("click", function (evento) {
    const etiqueta = evento.target.closest("label[for]");
    if (!etiqueta || !Object.prototype.hasOwnProperty.call(pantallas, etiqueta.htmlFor)) {
      return;
    }

    evento.preventDefault();
    navegar(etiqueta.htmlFor);
  });

  document.querySelectorAll('input[name="screen"]').forEach(function (pantalla) {
    pantalla.addEventListener("change", function () {
      actualizarVista(pantalla.id);
    });
  });

  window.CampusMoodApp = Object.freeze({
    navegar: navegar
  });

  actualizarVista(document.querySelector('input[name="screen"]:checked').id);
}());
