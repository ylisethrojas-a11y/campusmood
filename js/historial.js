(function () {
  "use strict";

  const estados = {
    5: { texto: "Muy bien", emoji: "😄" },
    4: { texto: "Bien", emoji: "🙂" },
    3: { texto: "Regular", emoji: "😐" },
    2: { texto: "Mal", emoji: "😟" },
    1: { texto: "Muy mal", emoji: "😣" }
  };

  function fechaLocal(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return anio + "-" + mes + "-" + dia;
  }

  function obtenerUltimosSieteDias(hoy) {
    const fechas = [];
    for (let desplazamiento = 6; desplazamiento >= 0; desplazamiento -= 1) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      fecha.setDate(fecha.getDate() - desplazamiento);
      fechas.push(fechaLocal(fecha));
    }
    return fechas;
  }

  function crearElemento(tag, texto, clase) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    if (clase) {
      elemento.className = clase;
    }
    return elemento;
  }

  function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  function renderizar(registros) {
    const todosLosRegistros = registros || window.CampusMoodAlmacenamiento.leer();
    const dias = obtenerUltimosSieteDias(new Date());
    const registrosRecientes = todosLosRegistros.filter(function (registro) {
      return dias.includes(registro.fecha);
    });
    const registrosPorDia = new Map();
    registrosRecientes.forEach(function (registro) {
      registrosPorDia.set(registro.fecha, registro);
    });

    const promedio = document.getElementById("weekly-average");
    const estadoFrecuente = document.getElementById("frequent-state");
    const lista = document.getElementById("record-list");
    const mensajeVacio = document.getElementById("empty-state");
    const grafico = document.getElementById("mood-chart");

    lista.replaceChildren();
    grafico.replaceChildren();
    mensajeVacio.hidden = registrosRecientes.length > 0;

    if (registrosRecientes.length === 0) {
      promedio.textContent = "—";
      estadoFrecuente.textContent = "—";
    } else {
      const suma = registrosRecientes.reduce(function (total, registro) {
        return total + registro.valor;
      }, 0);
      promedio.replaceChildren(
        document.createTextNode((suma / registrosRecientes.length).toFixed(1) + " "),
        crearElemento("span", "/ 5")
      );

      const frecuencias = new Map();
      registrosRecientes.forEach(function (registro) {
        const estado = estados[registro.valor].texto;
        frecuencias.set(estado, (frecuencias.get(estado) || 0) + 1);
      });
      const estadoMasFrecuente = Array.from(frecuencias.entries()).sort(function (a, b) {
        return b[1] - a[1] || b[0].localeCompare(a[0], "es");
      })[0][0];
      const valorEstado = Object.keys(estados).find(function (valor) {
        return estados[valor].texto === estadoMasFrecuente;
      });
      estadoFrecuente.replaceChildren(
        crearElemento("span", estados[valorEstado].emoji),
        document.createTextNode(" " + estadoMasFrecuente)
      );
      estadoFrecuente.firstElementChild.setAttribute("aria-hidden", "true");
    }

    dias.forEach(function (dia) {
      const registro = registrosPorDia.get(dia);
      const fecha = new Date(dia + "T00:00:00");
      const columna = crearElemento("div", "", "chart-column");
      columna.appendChild(crearElemento("span", registro ? String(registro.valor) : "–", "bar-value"));

      const pista = crearElemento("div", "", "bar-track");
      const barra = crearElemento("span", "", "bar");
      barra.style.setProperty("--level", registro ? (registro.valor * 20) + "%" : "0%");
      pista.appendChild(barra);
      columna.appendChild(pista);
      columna.appendChild(crearElemento(
        "span",
        new Intl.DateTimeFormat("es", { weekday: "short" }).format(fecha),
        "day-label"
      ));
      columna.setAttribute(
        "aria-label",
        formatearFecha(dia) + (registro ? ": " + registro.estado + ", " + registro.valor + " de 5" : ": sin registro")
      );
      grafico.appendChild(columna);
    });

    registrosRecientes.slice().sort(function (a, b) {
      return b.fecha.localeCompare(a.fecha);
    }).forEach(function (registro) {
      const fila = document.createElement("li");
      const estado = estados[registro.valor];
      fila.appendChild(crearElemento("span", estado.emoji, "record-emoji"));
      fila.lastElementChild.setAttribute("aria-hidden", "true");

      const detalle = crearElemento("span", "", "record-detail");
      detalle.appendChild(crearElemento("strong", registro.estado));
      detalle.appendChild(crearElemento("small", formatearFecha(registro.fecha)));
      detalle.appendChild(crearElemento("small", registro.comentario || "Sin comentario"));
      fila.appendChild(detalle);
      fila.appendChild(crearElemento("span", registro.valor + "/5", "record-score"));
      lista.appendChild(fila);
    });
  }

  window.CampusMoodHistorial = Object.freeze({
    renderizar: renderizar
  });
}());
