(function () {
  "use strict";

  const recomendaciones = {
    5: {
      titulo: "Estiramiento ligero de cuello, hombros y brazos",
      duracion: 2,
      instrucciones: [
        "Inclina suavemente la cabeza hacia cada hombro y respira con calma.",
        "Eleva y relaja los hombros varias veces, sin forzar el movimiento.",
        "Estira los brazos hacia arriba y luego sacude suavemente las manos."
      ],
      frase: "¡Qué bueno que hoy te sientes con tanta energía! Lleva ese impulso a tus clases o estudios y, si te nace, comparte un poco de esa buena actitud con quienes te rodean.",
      mostrarApoyo: false
    },
    4: {
      titulo: "Estiramiento de espalda y hombros desde la silla",
      duracion: 3,
      instrucciones: [
        "Siéntate con los pies apoyados y alarga suavemente la espalda.",
        "Lleva los hombros hacia atrás y relájalos varias veces.",
        "Estira los brazos al frente y respira sin forzar el movimiento."
      ],
      frase: "Qué bueno que hoy encuentras cierto equilibrio. Aprovecha esta calma para avanzar paso a paso en tus metas del día, sin dejar de cuidar tu propio ritmo.",
      mostrarApoyo: false
    },
    3: {
      titulo: "Levantarse, caminar y tomar agua; estirar piernas",
      duracion: 3,
      instrucciones: [
        "Levántate con calma y camina un poco por un espacio seguro.",
        "Toma un poco de agua si tienes disponible.",
        "Estira suavemente las piernas y vuelve cuando te sientas listo."
      ],
      frase: "Hay días neutros o pesados, y no todos tienen que ser perfectos. Está bien sentirte así; tomar un respiro puede ayudarte a recargar, sin apuro.",
      mostrarApoyo: false
    },
    2: {
      titulo: "Respiración profunda: inhalar 4 s, sostener 4 s, exhalar 6 s, repetir 5 veces",
      duracion: 4,
      instrucciones: [
        "Busca una postura cómoda y apoya los pies si te es posible.",
        "Inhala suavemente durante 4 segundos.",
        "Sostén el aire durante 4 segundos, sin forzar.",
        "Exhala despacio durante 6 segundos; repite el ciclo 5 veces."
      ],
      frase: "Si el cansancio o el estrés académico pesan hoy, tiene sentido que necesites una pausa. Baja el ritmo, suelta la presión por unos minutos y date prioridad; puedes volver a tus pendientes paso a paso.",
      mostrarApoyo: false
    },
    1: {
      titulo: "Respiración profunda y estiramiento suave",
      duracion: 5,
      instrucciones: [
        "Busca una postura cómoda y deja que los hombros descansen.",
        "Inhala suavemente y exhala despacio, a tu propio ritmo.",
        "Estira con delicadeza brazos y piernas, solo hasta donde te resulte cómodo.",
        "Si te ayuda, repite la respiración con calma durante unos minutos."
      ],
      frase: "Siento que hoy esté siendo tan difícil. Lo que sientes es válido y no tienes que cargar con todo a solas: por ahora, ve con calma y permite que alguien de confianza o Bienestar Universitario te acompañe.",
      mostrarApoyo: true
    }
  };

  function obtenerRecomendacion(valor) {
    const recomendacion = recomendaciones[Number(valor)];
    if (!recomendacion) {
      throw new RangeError("El valor de ánimo debe estar entre 1 y 5.");
    }

    return {
      titulo: recomendacion.titulo,
      duracion: recomendacion.duracion,
      instrucciones: recomendacion.instrucciones.slice(),
      frase: recomendacion.frase,
      mostrarApoyo: recomendacion.mostrarApoyo
    };
  }

  window.CampusMoodRecomendaciones = Object.freeze({
    obtener: obtenerRecomendacion
  });
}());
