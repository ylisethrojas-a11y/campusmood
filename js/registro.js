(function () {
  "use strict";

  const estados = {
    5: { texto: "Muy bien", emoji: "😄" },
    4: { texto: "Bien", emoji: "🙂" },
    3: { texto: "Regular", emoji: "😐" },
    2: { texto: "Mal", emoji: "😟" },
    1: { texto: "Muy mal", emoji: "😣" }
  };

  const guardarBoton = document.getElementById("save-record");
  const contador = document.getElementById("comment-count");
  const comentario = document.getElementById("comment");
  const errorRegistro = document.getElementById("check-in-error");

  function fechaLocal(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return anio + "-" + mes + "-" + dia;
  }

  function actualizarContador() {
    contador.textContent = comentario.value.length + "/140";
  }

  function establecerTexto(elemento, texto) {
    elemento.textContent = texto;
  }

  function mostrarPausa(recomendacion) {
    establecerTexto(document.getElementById("break-title"), recomendacion.titulo);
    establecerTexto(document.getElementById("break-duration"), recomendacion.duracion + " minutos");
    establecerTexto(document.getElementById("break-phrase"), "“" + recomendacion.frase + "”");

    const instrucciones = document.getElementById("pause-instructions");
    instrucciones.replaceChildren();
    recomendacion.instrucciones.forEach(function (texto) {
      const paso = document.createElement("li");
      const contenido = document.createElement("span");
      contenido.textContent = texto;
      paso.appendChild(contenido);
      instrucciones.appendChild(paso);
    });

    document.getElementById("help-toggle").checked = recomendacion.mostrarApoyo;
  }

  function actualizarPausa(registros) {
    const hoy = fechaLocal(new Date());
    const registroDeHoy = registros.find(function (registro) {
      return registro.fecha === hoy;
    });

    if (!registroDeHoy) {
      return;
    }

    mostrarPausa(window.CampusMoodRecomendaciones.obtener(registroDeHoy.valor));
    const mensajeGuardado = document.getElementById("saved-message");
    mensajeGuardado.lastChild.textContent = window.CampusMoodAlmacenamiento.usaMemoria()
      ? " Registro guardado temporalmente"
      : " Registro guardado";
  }

  function guardarRegistro() {
    const seleccion = document.querySelector('input[name="mood"]:checked');
    if (!seleccion) {
      errorRegistro.hidden = false;
      document.querySelector(".mood-fieldset").setAttribute("aria-invalid", "true");
      return;
    }

    const valor = Number(seleccion.value);
    const estado = estados[valor];
    if (!estado) {
      errorRegistro.hidden = false;
      establecerTexto(errorRegistro, "No se pudo reconocer el estado seleccionado. Inténtalo de nuevo.");
      return;
    }

    const fecha = fechaLocal(new Date());
    const registros = window.CampusMoodAlmacenamiento.leer();
    const yaExiste = registros.some(function (registro) {
      return registro.fecha === fecha;
    });

    if (yaExiste && !window.confirm("Ya existe un registro de hoy. ¿Deseas reemplazarlo?")) {
      return;
    }

    const recomendacion = window.CampusMoodRecomendaciones.obtener(valor);
    const nuevoRegistro = {
      fecha: fecha,
      valor: valor,
      estado: estado.texto,
      comentario: comentario.value.trim(),
      pausa: recomendacion.titulo
    };
    const registrosActualizados = registros.filter(function (registro) {
      return registro.fecha !== fecha;
    });
    registrosActualizados.push(nuevoRegistro);
    window.CampusMoodAlmacenamiento.guardar(registrosActualizados);

    errorRegistro.hidden = true;
    document.querySelector(".mood-fieldset").removeAttribute("aria-invalid");
    const mensajeGuardado = document.getElementById("saved-message");
    mensajeGuardado.lastChild.textContent = window.CampusMoodAlmacenamiento.usaMemoria()
      ? " Registro guardado temporalmente"
      : " Registro guardado";
    window.CampusMoodApp.navegar("screen-break");
  }

  guardarBoton.addEventListener("click", guardarRegistro);
  comentario.addEventListener("input", actualizarContador);
  document.querySelectorAll('input[name="mood"]').forEach(function (opcion) {
    opcion.addEventListener("change", function () {
      errorRegistro.hidden = true;
      document.querySelector(".mood-fieldset").removeAttribute("aria-invalid");
    });
  });
  actualizarContador();
  window.CampusMoodRegistro = Object.freeze({
    actualizarContador: actualizarContador,
    actualizarPausa: actualizarPausa
  });
}());
