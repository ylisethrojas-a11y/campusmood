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

  const temas = {
    academico: [
      "parcial", "examen", "quiz", "tarea", "trabajo", "proyecto", "exposicion",
      "nota", "estudio", "clase", "universidad"
    ],
    cansancio: [
      "cansado", "cansada", "sueno", "agotado", "agotada", "dormir", "trasnocho", "energia"
    ],
    estres: [
      "estres", "ansiedad", "abrumado", "abrumada", "presion", "nervios",
      "preocupado", "triste", "tristeza", "mal", "llorar", "solo", "sola",
      "desanimado", "desanimada"
    ],
    positivo: [
      "feliz", "alegre", "logre", "pase", "aprobe", "bien", "genial",
      "gracias", "amigos", "familia", "libre"
    ]
  };

  const pausasPorTema = {
    tristeza: {
      palabras: ["triste", "tristeza", "llor", "solo", "sola", "desanimado", "desanimada", "mal"],
      titulo: "Pausa de calma y reencuentro contigo mismo/a",
      duracion: 5,
      instrucciones: [
        "Apoya una mano sobre tu pecho y respira lento: inhala en 4 segundos y exhala en 6.",
        "Cierra los ojos un momento y reconoce lo que sientes sin juzgarte.",
        "Escribe o piensa en una cosa pequeña que te dé tranquilidad hoy; puedes hablar con alguien de confianza o con Bienestar Universitario."
      ]
    },
    estres: {
      palabras: ["estres", "ansiedad", "abrumado", "parcial", "examen", "nervios", "presion", "tarea", "proyecto"],
      titulo: "Respiración profunda para soltar tensión académica",
      duracion: 4,
      instrucciones: [
        "Si te es posible, aléjate 2 metros de tus cuadernos o de la pantalla.",
        "Realiza 5 ciclos de respiración pausada: inhala en 4 segundos, sostén 4 segundos y exhala en 6.",
        "Suelta los hombros y elige únicamente una tarea pequeña para retomar después."
      ]
    },
    cansancio: {
      palabras: ["cansado", "cansada", "agotado", "sueno", "dormir", "trasnocho", "energia"],
      titulo: "Recarga física y descanso visual",
      duracion: 3,
      instrucciones: [
        "Cierra los ojos y cubre suavemente tus párpados con las palmas, sin presionarlos, por 30 segundos.",
        "Levántate, estira los brazos hacia el techo y toma un vaso de agua fresca.",
        "Date permiso de hacer una pausa real antes de seguir."
      ]
    },
    alegria: {
      palabras: ["feliz", "alegre", "logre", "pase", "aprobe", "genial", "motivado", "emocionado", "bien"],
      titulo: "Pausa activa para celebrar y disfrutar tu energía",
      duracion: 3,
      instrucciones: [
        "Haz un estiramiento dinámico de cuello y hombros mientras sonríes por lo que lograste hoy.",
        "Dedica 3 minutos a algo que realmente disfrutes: escucha tu canción favorita, escríbele a un amigo o sal a tomar aire.",
        "Guarda esta buena energía para el resto de tu jornada."
      ]
    }
  };

  function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function coincideTema(texto, palabrasClave) {
    const palabras = normalizar(texto).match(/[a-z0-9]+/g) || [];
    return palabrasClave.some(function (clave) {
      return palabras.some(function (palabra) {
        return palabra === clave || palabra.startsWith(clave);
      });
    });
  }

  function obtenerPausaPorNota(nota, recomendacionBase) {
    const ordenTemas = ["tristeza", "estres", "cansancio", "alegria"];
    const tema = ordenTemas.find(function (nombreTema) {
      return coincideTema(nota, pausasPorTema[nombreTema].palabras);
    });

    return tema ? pausasPorTema[tema] : recomendacionBase;
  }

  function obtenerMensajePersonalizado(valor, nota) {
    const animo = Number(valor);
    const animoAlto = animo >= 4;
    const animoBajo = animo <= 2;

    if (coincideTema(nota, temas.estres)) {
      if (animoBajo) {
        return "Siento que hoy se sume esta preocupación. Respira lento, suelta la autoexigencia por un momento y recuerda que puedes acudir a Bienestar Universitario si lo necesitas.";
      }
      if (animoAlto) {
        return "Aunque hoy tengas buen ánimo, también puedes reconocer lo que te preocupa. Respira lento, suelta la autoexigencia por un momento y acude a Bienestar Universitario si necesitas apoyo.";
      }
      return "Gracias por compartir lo que te inquieta. Respira lento, suelta la autoexigencia por un momento y recuerda que puedes acudir a Bienestar Universitario si lo necesitas.";
    }

    if (coincideTema(nota, temas.cansancio)) {
      if (animoBajo) {
        return "Cuando el cansancio pesa, tu cuerpo merece atención. Baja el ritmo, prioriza el descanso y desconéctate de las pantallas unos minutos; puedes retomar tus pendientes después.";
      }
      return "Cuida también tu energía física: prioriza el descanso y desconéctate de las pantallas unos minutos. Una pausa puede ayudarte a recargar, sea cual sea el ritmo de hoy.";
    }

    if (coincideTema(nota, temas.positivo)) {
      if (animoBajo) {
        return "Qué valioso que hayas encontrado algo bueno incluso en un día difícil. Guarda ese momento como un recuerdo que te pueda dar ánimo cuando lo necesites.";
      }
      return "¡Qué alegría que hayas vivido algo positivo! Celebra ese momento y guárdalo como un recuerdo al que puedas volver para motivarte.";
    }

    if (coincideTema(nota, temas.academico)) {
      if (animoAlto) {
        return "¡Qué gran impulso para tus metas académicas! Sigue avanzando con ese enfoque, paso a paso, y reconoce todo el esfuerzo que ya estás poniendo.";
      }
      if (animoBajo) {
        return "Sabemos que los compromisos académicos demandan mucha energía. Divide tus pendientes en pasos pequeños y confía en tu preparación; tu esfuerzo también merece una pausa.";
      }
      return "Los compromisos académicos pueden demandar mucha energía. Avanza en pasos pequeños, confía en tu preparación y date permiso para tomar un respiro.";
    }

    if (animoBajo) {
      return "Gracias por tomarte este momento para poner en palabras lo que sientes hoy. Reconocerlo ya es un paso de autocuidado; ve con calma y a tu propio ritmo.";
    }
    if (animoAlto) {
      return "Gracias por tomarte este momento para poner en palabras lo que sientes hoy. Reconocerlo y atenderlo también es autocuidado; conserva lo que te hace bien.";
    }
    return "Gracias por tomarte este momento para poner en palabras lo que sientes hoy. Reconocerlo ya es un gran paso de autocuidado.";
  }

  function obtenerRecomendacion(valor, nota) {
    const animo = Number(valor);
    const recomendacion = recomendaciones[animo];
    if (!recomendacion) {
      throw new RangeError("El valor de ánimo debe estar entre 1 y 5.");
    }

    const notaTexto = typeof nota === "string" ? nota.trim() : "";
    const pausa = notaTexto
      ? obtenerPausaPorNota(notaTexto, recomendacion)
      : recomendacion;
    return {
      titulo: pausa.titulo,
      duracion: pausa.duracion,
      instrucciones: pausa.instrucciones.slice(),
      frase: notaTexto
        ? obtenerMensajePersonalizado(animo, notaTexto)
        : recomendacion.frase,
      mostrarApoyo: recomendacion.mostrarApoyo
    };
  }

  window.CampusMoodRecomendaciones = Object.freeze({
    obtener: obtenerRecomendacion
  });
}());
