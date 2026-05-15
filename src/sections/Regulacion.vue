<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import AppTabs from "@/components/ui/tabs.vue";
import AppTabsList from "@/components/ui/tabs-list.vue";
import AppTabsTrigger from "@/components/ui/tabs-trigger.vue";
import AppTabsContent from "@/components/ui/tabs-content.vue";
import TecnicaRegulacion from "./regulacion/TecnicaRegulacion.vue";
import bgRegulacion from "@/img/charla_ruta_convivencia.jpeg";
import gsap from "gsap";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

type Grupo = "positivas" | "negativas" | "situaciones";

const grupos: Record<Grupo, { label: string; icon: string; tabs: string[] }> = {
  positivas: {
    label: "Emociones Positivas",
    icon: `${EMOJI_BASE}/Smiling%20face%20with%20smiling%20eyes/3D/smiling_face_with_smiling_eyes_3d.png`,
    tabs: ["alegria", "motivacion", "gratitud"],
  },
  negativas: {
    label: "Emociones Negativas",
    icon: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`,
    tabs: ["ansiedad", "ira", "tristeza"],
  },
  situaciones: {
    label: "Situaciones O Consecuencias Emocionales",
    icon: `${EMOJI_BASE}/Warning/3D/warning_3d.png`,
    tabs: ["depresion", "bullying"],
  },
};

const currentGroup = ref<Grupo>("negativas");
const currentTab = ref("ansiedad");

function selectGroup(g: Grupo) {
  currentGroup.value = g;
  currentTab.value = grupos[g].tabs[0];
}

function handlePreset(e: Event) {
  const evt = e as CustomEvent<string>;
  if (typeof evt.detail === "string") {
    const tab = evt.detail;
    for (const [g, { tabs }] of Object.entries(grupos) as [Grupo, { tabs: string[] }][]) {
      if (tabs.includes(tab)) {
        currentGroup.value = g;
        currentTab.value = tab;
        return;
      }
    }
    currentTab.value = tab;
  }
}

onMounted(() => {
  window.addEventListener("preset-regulacion-tab", handlePreset);
});

onUnmounted(() => {
  window.removeEventListener("preset-regulacion-tab", handlePreset);
});

watch(currentTab, () => {
  nextTick(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const content = document.querySelector(".regulacion-tab-content");
    if (content) {
      gsap.fromTo(content, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  });
});

const tecnicas = {
  // ─── EMOCIONES POSITIVAS ───────────────────────────────────────────────────
  alegria: {
    titulo: "Alegría",
    subtitulo:
      "Sentirse bien también necesita cuidado. La alegría genuina se cultiva, se comparte y se expresa con conciencia.",
    color: "#D69E2E",
    emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20smiling%20eyes/3D/smiling_face_with_smiling_eyes_3d.png`,
    sintomas: [
      "Muestras alegría exagerada para esconder otras emociones que no quieres sentir.",
      "Te sientes culpable cuando estás contento/a mientras otros atraviesan momentos difíciles.",
      "Tu alegría desaparece rápidamente porque depende solo de factores externos.",
      "Dependes de la aprobación de otros para sentirte bien.",
    ],
    tipos: "Alegría situacional (por un logro o acontecimiento), alegría relacional (por conexión con otros), alegría plena (bienestar sostenido). Todas son válidas; la alegría plena es la que más se puede entrenar.",
    prevencion: [
      "Celebra los logros, por pequeños que sean.",
      "Cultiva relaciones que te hagan sentir bien de forma recíproca.",
      "Practica gratitud diaria: escribe 3 cosas buenas de tu día.",
      "Haz al menos una actividad que disfrutes genuinamente cada semana.",
    ],
    inmediato: [
      "Comparte lo que te alegra con alguien cercano.",
      "Exprésala con el cuerpo: baila, ríe, canta, dibuja.",
      "Tómate un momento para saborearla sin apresurarte al siguiente plan.",
      "Agradece internamente ese momento antes de que pase.",
    ],
    noRecomendadas: [
      "Forzar alegría cuando no la sientes genera desgaste emocional a largo plazo.",
      "Compartiéndola de forma excesiva en redes puede volverse una búsqueda de validación.",
      "Ignorar otras emociones para 'quedarte' en la alegría es evitación, no regulación.",
    ],
    noExpresar: [
      "No expresar la alegría puede hacer que los demás no sepan cuándo estás bien.",
      "Guardar la alegría para uno/a mismo/a reduce la conexión con otros.",
      "No celebrar los logros propios puede llevar a sentir que nada vale la pena.",
    ],
    consecuencias: {
      fisicas: ["Menor energía vital sin momentos de disfrute", "Tensión acumulada sin liberación emocional", "Sistema inmune menos activo"],
      sociales: ["Vínculos más superficiales", "Pérdida de conexión con personas cercanas", "Dificultad para crear momentos compartidos"],
      academicas: ["Menor motivación ante los logros", "Dificultad para encontrar sentido en el estudio", "Baja autoestima académica"],
    },
    musica: {
      titulo: "Happy",
      artista: "Pharrell Williams",
      url: "https://www.youtube.com/watch?v=y6Sxv-sUYtM",
    },
    videos: [
      {
        titulo: "La ciencia detrás de la felicidad — video para jóvenes",
        url: "https://www.youtube.com/watch?v=GXy__kBVq1M",
      },
      {
        titulo: "Cómo cultivar emociones positivas",
        url: "https://www.youtube.com/watch?v=8KkKuTCFvzI",
      },
    ],
    reto: {
      titulo: "Diario De Alegría · 5 Días",
      descripcion:
        "Durante 5 días, registra los momentos que te hicieron sentir bien:",
      pasos: [
        "Día 1 · Escribe 1 momento de alegría genuina de hoy, aunque sea pequeño.",
        "Día 2 · Comparte ese momento con alguien: cuéntalo en voz alta.",
        "Día 3 · Repite una actividad que sabes que te genera bienestar real.",
        "Día 4 · Agradece a alguien por algo concreto que te haya dado alegría.",
        "Día 5 · Relee los 4 días y escribe qué patrón descubres en tu alegría.",
      ],
    },
  },

  motivacion: {
    titulo: "Motivación Y Entusiasmo",
    subtitulo:
      "La motivación no es un estado fijo que se tiene o no. Es una habilidad que se entrena para sostener el esfuerzo cuando las ganas decaen.",
    color: "hsl(38, 92%, 50%)",
    emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`,
    sintomas: [
      "Empiezas proyectos con energía pero los abandonas cuando se vuelven difíciles.",
      "Necesitas que alguien más te empuje para hacer lo que tú mismo/a quieres.",
      "El aburrimiento o la apatía son tu estado habitual, no una excepción.",
      "Sientes que nada vale el esfuerzo antes de intentarlo.",
    ],
    tipos: "Motivación intrínseca (nace de ti, de tus valores), motivación extrínseca (nace de recompensas externas), motivación de logro (por alcanzar metas) y motivación de afiliación (por pertenecer). La más sostenible es la intrínseca.",
    prevencion: [
      "Define un 'para qué' personal: no solo '¿qué quiero hacer?' sino '¿por qué me importa?'",
      "Divide las metas grandes en pasos pequeños y celebra cada avance.",
      "Rodéate de personas que te inspiren y que estén comprometidas con sus propias metas.",
      "Reduce los estímulos que generan gratificación instantánea sin esfuerzo (redes, videojuegos excesivos).",
    ],
    inmediato: [
      "Haz el primer paso aunque dure solo 5 minutos: la acción genera motivación, no al revés.",
      "Visualiza cómo te sentirás cuando lo hayas hecho, no mientras lo evitas.",
      "Cambia el ambiente: un espacio diferente activa una disposición diferente.",
      "Recuérdate por qué empezaste: vuelve a tu 'para qué' original.",
    ],
    noRecomendadas: [
      "Esperar 'tener ganas' para actuar: las ganas vienen después de empezar.",
      "Compararte con otros para motivarte: genera presión, no inspiración real.",
      "Poner metas tan grandes que parecen imposibles desde el principio.",
    ],
    noExpresar: [
      "No compartir tus metas puede hacer que la motivación se evapore sin rendición de cuentas.",
      "Guardar el entusiasmo para uno/a mismo/a reduce la energía colectiva del grupo.",
      "No celebrar los avances propios lleva a sentir que el esfuerzo no sirve de nada.",
    ],
    consecuencias: {
      fisicas: ["Fatiga crónica por falta de propósito", "Inactividad que afecta la salud física", "Insomnio por pensamientos circulares sin acción"],
      sociales: ["Aislamiento por sentir que 'no sirvo para nada'", "Pérdida de oportunidades por no participar", "Dificultad para comprometerse con otros"],
      academicas: ["Procrastinación crónica", "Bajo rendimiento por falta de compromiso", "Abandono de proyectos académicos a mitad de camino"],
    },
    musica: {
      titulo: "Eye Of The Tiger",
      artista: "Survivor",
      url: "https://www.youtube.com/watch?v=btPJPFnesV4",
    },
    videos: [
      {
        titulo: "Cómo motivarte cuando no tienes ganas",
        url: "https://www.youtube.com/watch?v=rrkrvAUbU9Y",
      },
      {
        titulo: "La ciencia de la motivación — para jóvenes",
        url: "https://www.youtube.com/watch?v=u6XAPnuFjJc",
      },
    ],
    reto: {
      titulo: "El Compromiso De 5 Minutos · 7 Días",
      descripcion:
        "La regla: comprométete solo 5 minutos. Muchas veces seguirás más:",
      pasos: [
        "Escoge una meta pequeña que llevas semanas posponiendo.",
        "Día 1 a 3: trabaja solo 5 minutos en ella. Nada más. Para cuando suene el tiempo.",
        "Día 4 a 5: si quieres seguir más de 5 minutos, hazlo. No te fuerces.",
        "Día 6: anota cuánto tiempo terminaste trabajando en total.",
        "Día 7: escribe cómo te sientes respecto a esa meta ahora vs. hace una semana.",
      ],
    },
  },

  gratitud: {
    titulo: "Gratitud Y Confianza",
    subtitulo:
      "La gratitud no es resignación ni ingenuidad. Es la capacidad de ver lo que sí tienes y construir desde ahí. La confianza en uno mismo nace de practicarla.",
    color: "#38B2AC",
    emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20open%20hands/3D/smiling_face_with_open_hands_3d.png`,
    sintomas: [
      "Te cuesta reconocer lo positivo de tu día aunque haya habido cosas buenas.",
      "Sientes que nunca es suficiente: logras algo y ya estás pensando en lo que falta.",
      "La desconfianza en ti mismo/a te impide intentar cosas nuevas.",
      "Comparas constantemente lo que tienes con lo que tienen otros.",
    ],
    tipos: "Gratitud espontánea (ante algo inesperadamente bueno), gratitud cultivada (práctica consciente diaria) y gratitud relacional (reconocer a las personas que te apoyan). La confianza se construye con pequeñas victorias acumuladas.",
    prevencion: [
      "Escribe cada noche 3 cosas por las que estás agradecido/a, sin importar su tamaño.",
      "Practica decir 'gracias' con intención, no por cortesía automática.",
      "Lleva un registro de cosas que has logrado, aunque parezcan pequeñas.",
      "Rodéate de personas que te recuerden lo que aportas.",
    ],
    inmediato: [
      "Escribe el nombre de una persona que te haya apoyado y envíale un mensaje de agradecimiento.",
      "Haz una lista de 5 cosas que tu cuerpo y mente te permiten hacer hoy.",
      "Recuerda un momento en que lograste algo que creías difícil.",
      "Dite a ti mismo/a algo que reconocerías en un amigo/a que pasara por lo mismo.",
    ],
    noRecomendadas: [
      "Forzar la gratitud cuando hay dolor real: primero valida lo que sientes.",
      "Usar la gratitud para silenciar quejas legítimas propias o ajenas.",
      "Compararte en sentido negativo: 'otros están peor, no tengo derecho a quejarme'.",
    ],
    noExpresar: [
      "No expresar gratitud a otros hace que las relaciones se vuelvan más frías.",
      "Guardar la confianza en uno/a mismo/a sin actuar desde ella no la desarrolla.",
      "No reconocer los propios avances genera sensación de estancamiento constante.",
    ],
    consecuencias: {
      fisicas: ["Mayor estrés percibido sin ancla emocional positiva", "Peor calidad de sueño por rumiación negativa", "Menor resiliencia ante la enfermedad o el cansancio"],
      sociales: ["Vínculos superficiales por no reconocer lo que aportan los demás", "Sensación de soledad aunque haya personas cerca", "Dificultad para recibir apoyo sin sentirse en deuda"],
      academicas: ["Bloqueo creativo por enfocarse solo en lo que falta", "Menor persistencia ante las dificultades", "Baja autoestima que afecta el rendimiento"],
    },
    musica: {
      titulo: "Playlist Lo-fi Gratitude",
      artista: "Lofi Girl",
      url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
    },
    videos: [
      {
        titulo: "El poder de la gratitud — ciencia y práctica",
        url: "https://www.youtube.com/watch?v=U5lZBjWDR_c",
      },
      {
        titulo: "Cómo construir autoconfianza desde cero",
        url: "https://www.youtube.com/watch?v=w-HYZv6HzAs",
      },
    ],
    reto: {
      titulo: "Carta De Gratitud · 1 Semana",
      descripcion:
        "Probado en estudios: escribir gratitud aumenta el bienestar en 3 semanas.",
      pasos: [
        "Día 1 · Escribe el nombre de 3 personas que te hayan dado algo valioso.",
        "Día 2 · Escríbele a una de ellas una carta de 5 líneas (no tienes que enviarla).",
        "Día 3 · Escribe 3 cosas que TÚ has hecho bien esta semana.",
        "Día 4 · Envía un mensaje real de agradecimiento a alguien (puede ser breve).",
        "Día 5 a 7 · Repite el ejercicio del día 3 cada noche antes de dormir.",
      ],
    },
  },

  // ─── EMOCIONES NEGATIVAS ──────────────────────────────────────────────────
  ansiedad: {
    titulo: "Ansiedad",
    subtitulo:
      "Esa sensación de alerta, nudo en el estómago o la mente acelerada. Es normal y se puede regular.",
    color: "hsl(263,73%,77%)",
    emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`,
    sintomas: [
      "Sientes el corazón acelerado o el pecho apretado sin causa física clara.",
      "Tu mente produce pensamientos repetitivos del tipo '¿y si pasa algo malo?'",
      "Evitas situaciones que antes no te causaban problema (hablar en clase, estar en grupos).",
      "Duermes mal o te despiertas con la sensación de que algo malo puede pasar.",
    ],
    tipos: "Ansiedad generalizada (preocupación constante por casi todo), ansiedad social (miedo intenso a ser juzgado), ansiedad por rendimiento (pánico ante exámenes) y crisis de pánico (episodios intensos y repentinos de miedo físico). Todas tienen solución.",
    prevencion: [
      "Duerme al menos 8 horas y reduce la cafeína.",
      "Haz actividad física 3 veces por semana: el cuerpo descarga la ansiedad.",
      "Escribe en un diario lo que te preocupa antes de dormir.",
      "Limita el tiempo en redes sociales a 1 hora al día.",
    ],
    inmediato: [
      "Haz la técnica 4-4-4: inhala 4s, sostén 4s, exhala 4s.",
      "Nombra 5 cosas que veas, 4 que toques, 3 que oigas, 2 que huelas, 1 que saborees.",
      "Pon hielo en tus manos o mójalas con agua fría — activa el nervio vago.",
      'Dite en voz baja: "esto pasará, ya lo he sentido antes y se ha calmado".',
    ],
    noRecomendadas: [
      "Evitar las situaciones que generan ansiedad (a largo plazo la aumenta).",
      "Distraerte con el teléfono para no pensar — pospone, no regula.",
      "Pedir que otros te tranquilicen constantemente sin trabajar la tolerancia propia.",
    ],
    noExpresar: [
      "Mantener la ansiedad callada puede generar tensión muscular crónica y problemas digestivos.",
      "No pedir ayuda cuando se necesita aumenta el aislamiento y la sensación de estar solo/a.",
      "Guardar todo para uno/a mismo puede llevar a crisis de pánico inesperadas.",
    ],
    consecuencias: {
      fisicas: ["Tensión muscular crónica", "Insomnio frecuente", "Dolores de cabeza recurrentes"],
      sociales: ["Evitación de situaciones sociales", "Aislamiento progresivo", "Dependencia emocional de otros"],
      academicas: ["Bloqueo en exámenes y presentaciones", "Dificultad para concentrarse", "Procrastinación por miedo al fracaso"],
    },
    musica: {
      titulo: "Weightless",
      artista: "Marconi Union",
      url: "https://www.youtube.com/watch?v=UfcAVejslrU",
    },
    videos: [
      {
        titulo: "Qué es la ansiedad y cómo manejarla (explicación para jóvenes)",
        url: "https://www.youtube.com/watch?v=rXFYrer5gWU",
      },
      {
        titulo: "Ansiedad — video 2",
        url: "https://www.youtube.com/watch?v=3iXjHf12ed4",
      },
      {
        titulo: "Ansiedad — video 3",
        url: "https://www.youtube.com/watch?v=h7KMioQbNFI",
      },
      {
        titulo: "Ansiedad — video 4",
        url: "https://www.youtube.com/watch?v=2F8k0Vfy7cE",
      },
    ],
    reto: {
      titulo: "Diario De Preocupaciones · 5 Días",
      descripcion:
        "Durante 5 días, dedica 10 minutos antes de dormir a este ritual. Ve marcando cada día:",
      pasos: [
        "Día 1 · Escribe 3 cosas que te preocuparon hoy y valóralas del 1 al 10.",
        "Día 2 · Junto a cada preocupación, anota ¿depende de ti o no?",
        "Día 3 · Para las que dependen de ti, escribe el primer paso pequeño.",
        "Día 4 · Para las que no dependen de ti, escribe una frase para soltarlas.",
        "Día 5 · Relee los 4 días y escribe qué cambió en tu cuerpo.",
      ],
    },
  },

  ira: {
    titulo: "Ira O Estrés",
    subtitulo:
      "Cuando algo te desborda, te frustra o sientes que vas a estallar. La ira da información — no te define.",
    color: "hsl(var(--secondary))",
    emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`,
    sintomas: [
      "Sientes tensión muscular, mandíbula apretada o calor en la cara ante situaciones cotidianas.",
      "Cualquier pequeño obstáculo te desborda de manera que parece desproporcionada.",
      "Después de perder el control, sientes culpa o vergüenza profunda.",
      "Duermes poco, te irrita el ruido o tienes dolores de cabeza frecuentes.",
    ],
    tipos: "Estrés crónico (tensión sostenida en el tiempo), frustración (cuando algo bloquea tus metas), rabia reactiva (explosiones rápidas) e ira pasiva (silencio, sarcasmo, 'hacerse el indiferente'). Reconocer tu patrón es el primer paso.",
    prevencion: [
      "Identifica tus detonantes: ¿qué personas o situaciones suelen activarte?",
      "Haz ejercicio intenso (correr, bailar, boxear) para liberar tensión acumulada.",
      'Aprende a decir "no" sin sentir culpa — el estrés crónico viene de cargar más de la cuenta.',
      "Crea rutinas de descanso: 10 min sin pantalla entre clases o tareas.",
    ],
    inmediato: [
      "Aléjate físicamente del lugar o la persona durante al menos 5 minutos.",
      "Cuenta hacia atrás desde 20 en voz baja.",
      "Aprieta los puños 10 segundos y luego suéltalos — repite 3 veces.",
      'Usa frases en primera persona: "Yo me siento… cuando pasa X, necesito Y".',
    ],
    noRecomendadas: [
      "Explotar verbalmente en el momento — daña relaciones y genera culpa posterior.",
      "Rumiar dándole vueltas al mismo pensamiento sin buscar solución.",
      "Guardar silencio indefinidamente sin comunicar lo que sientes.",
    ],
    noExpresar: [
      "No decir lo que molesta genera resentimiento acumulado que explota después.",
      "Guardar la ira puede convertirse en dolores de cabeza crónicos y contracturas.",
      "Callar lo que sientes hace que otros no sepan qué límites respetar.",
    ],
    consecuencias: {
      fisicas: ["Tensión muscular y contracturas", "Problemas de presión arterial", "Alteraciones digestivas crónicas"],
      sociales: ["Conflictos relacionales frecuentes", "Pérdida de confianza de otros", "Aislamiento por miedo a perder el control"],
      academicas: ["Problemas de concentración sostenida", "Conflictos con compañeros o docentes", "Bajo rendimiento por estrés crónico"],
    },
    musica: {
      titulo: "Playlist Lo-fi Para Calmarte",
      artista: "Lofi Girl",
      url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    },
    videos: [
      {
        titulo: "Ira y estrés — video 1",
        url: "https://www.youtube.com/watch?v=mgbALEwEEpE",
      },
      {
        titulo: "Estrés — video 2",
        url: "https://www.youtube.com/shorts/G5MiT-hpdOE",
      },
      {
        titulo: "Ira — video 3",
        url: "https://www.youtube.com/shorts/P1ViW66rMic",
      },
      {
        titulo: "Ira — video 4",
        url: "https://www.youtube.com/shorts/lzjWAKma3Ag",
      },
    ],
    reto: {
      titulo: "El Semáforo Emocional · 1 Semana",
      descripcion:
        "Cada vez que sientas que estás a punto de estallar, aplica los 3 colores:",
      pasos: [
        { texto: "PARO: me detengo y respiro 3 veces antes de hablar.", emojiImg: `${EMOJI_BASE}/Red%20circle/3D/red_circle_3d.png`, emojiAlt: "PARO" },
        { texto: "PIENSO: ¿qué estoy sintiendo y qué lo causó?", emojiImg: `${EMOJI_BASE}/Yellow%20circle/3D/yellow_circle_3d.png`, emojiAlt: "PIENSO" },
        { texto: "ACTÚO: elijo una respuesta con la que me sienta bien después.", emojiImg: `${EMOJI_BASE}/Green%20circle/3D/green_circle_3d.png`, emojiAlt: "ACTÚO" },
        "Registra en tu celular cuántas veces lo usaste en la semana.",
        "Al final: ¿qué situación manejaste mejor gracias al semáforo?",
      ],
    },
  },

  tristeza: {
    titulo: "Tristeza",
    subtitulo:
      "Sentirse decaído, sin ganas, con ganas de llorar. La tristeza también se cuida, no se esconde.",
    color: "hsl(var(--primary))",
    emojiImg: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`,
    sintomas: [
      "Tienes pocas ganas de hacer cosas que antes disfrutabas, aunque intentes forzarte.",
      "Sientes un peso en el cuerpo, lentitud o ganas de llorar sin una razón clara.",
      "Te aíslas de amigos o familia y prefieres estar solo/a sin saber bien por qué.",
      "Tienes pensamientos recurrentes de que 'nada tiene sentido' o 'no sirvo para nada'.",
    ],
    tipos: "Tristeza situacional (ante una pérdida o decepción concreta), tristeza persistente (dura semanas sin mejorar) o depresión, que requiere acompañamiento profesional. Si llevas más de 2 semanas sintiéndote así, es importante buscar apoyo.",
    prevencion: [
      "Mantén contacto frecuente con al menos 2 personas que te hagan sentir bien.",
      "Sal a caminar 20 minutos al día — la luz natural regula el ánimo.",
      "Cuida lo que consumes: reduce contenido que te hace comparar o sentir peor.",
      "Duerme y come con horarios regulares: el cuerpo influye en la mente.",
    ],
    inmediato: [
      "Permítete llorar si lo necesitas — es una liberación, no una debilidad.",
      'Envía un mensaje a alguien de confianza: "Necesito hablar un rato".',
      "Haz una actividad que antes disfrutabas, aunque no tengas ganas (10 min mínimo).",
      'Escribe una carta a la tristeza: "¿Qué me estás tratando de decir?"',
    ],
    noRecomendadas: [
      "Aislarte y no responder mensajes — prolonga y profundiza el estado.",
      "Consumir contenido que te haga sentir peor o que te haga compararte.",
      "Esperar que pase sola sin hacer nada — sin acción, tiende a cronificarse.",
    ],
    noExpresar: [
      "No contar la tristeza a nadie puede hacer que la soledad se sienta permanente.",
      "Ocultar lo que se siente agota energía que se podría usar para sanar.",
      "Guardar todo para uno/a mismo dificulta que otros puedan acompañar.",
    ],
    consecuencias: {
      fisicas: ["Fatiga crónica y falta de energía", "Cambios en apetito y sueño", "Sistema inmune debilitado"],
      sociales: ["Aislamiento social progresivo", "Pérdida de relaciones cercanas", "Dificultad para conectar con otros"],
      academicas: ["Falta de motivación para estudiar", "Bajo rendimiento sostenido", "Dificultad para concentrarse en tareas"],
    },
    musica: {
      titulo: "Música De Piano Para Acompañar La Tristeza",
      artista: "YouTube · Instrumental Relajante",
      url: "https://www.youtube.com/watch?v=7vHCPYWzYU8",
    },
    videos: [
      {
        titulo: "La tristeza no es tu enemiga — video para jóvenes",
        url: "https://www.youtube.com/watch?v=hnfdgrsfVYg",
      },
    ],
    reto: {
      titulo: "3 Cosas Buenas · 7 Días",
      descripcion:
        "Probado en estudios de psicología positiva: reduce la tristeza y mejora el sueño.",
      pasos: [
        "Cada noche escribe 3 cosas buenas que te pasaron hoy (pueden ser pequeñas).",
        "Junto a cada una, anota por qué crees que pasó.",
        'Si no se te ocurre nada grande, sirve "un café rico", "un mensaje", "una canción".',
        "Repite durante 7 días sin saltarte ninguno.",
        "Al final: relee los 7 días del tirón y observa cómo te sientes.",
      ],
    },
  },

  // ─── SITUACIONES O CONSECUENCIAS EMOCIONALES ─────────────────────────────
  depresion: {
    titulo: "Depresión",
    subtitulo:
      "La depresión no es tristeza pasajera ni flojera. Es una condición que afecta el cuerpo, el pensamiento y las relaciones. Con apoyo adecuado se puede superar.",
    color: "#553C9A",
    emojiImg: `${EMOJI_BASE}/Disappointed%20face/3D/disappointed_face_3d.png`,
    sintomas: [
      "Sientes tristeza profunda, vacío o desesperanza la mayor parte del día, casi todos los días.",
      "Has perdido el interés o el placer en actividades que antes disfrutabas.",
      "Experimentas cambios significativos en el sueño (dormir mucho o muy poco) y en el apetito.",
      "Sientes fatiga extrema, dificultad para concentrarte o tomar decisiones simples.",
      "Tienes pensamientos recurrentes de que 'nada vale la pena' o de hacerte daño.",
    ],
    tipos: "Depresión mayor (episodios intensos que duran semanas), distimia (tristeza persistente de baja intensidad por más de 2 años), depresión estacional (relacionada con cambios de luz) y depresión reactiva (ante un evento traumático). Todas requieren acompañamiento profesional.",
    prevencion: [
      "Mantén rutinas estables de sueño, alimentación y actividad física.",
      "Busca apoyo profesional si llevas más de 2 semanas sintiéndote así.",
      "Mantén al menos un vínculo social activo: una persona con quien hablar de verdad.",
      "Reduce el consumo de alcohol y sustancias que empeoran el estado de ánimo.",
    ],
    inmediato: [
      "Habla con alguien de confianza hoy, aunque sea un mensaje corto.",
      "Haz una sola actividad pequeña que antes disfrutabas (5 minutos es suficiente para empezar).",
      "Sal a la luz natural: 20 minutos de sol al día tiene efecto directo en el ánimo.",
      "Llama a la Línea 106 (Bogotá) o 192 opción 4 si sientes que no puedes solo/a.",
    ],
    noRecomendadas: [
      "Aislarte completamente y cortar la comunicación con todos.",
      "Automedicarte o usar sustancias para 'sentirte mejor' — empeoran la depresión a largo plazo.",
      "Esperar que pase sola sin buscar ayuda profesional.",
    ],
    noExpresar: [
      "Guardar la depresión sin contarla prolonga el sufrimiento innecesariamente.",
      "No buscar ayuda por vergüenza puede llevar a que los síntomas escalen.",
      "Ocultar cómo te sientes impide que quienes te rodean puedan acompañarte.",
    ],
    consecuencias: {
      fisicas: ["Fatiga extrema y dolores físicos sin causa orgánica", "Alteraciones severas del sueño y el apetito", "Sistema inmune comprometido por el estrés crónico"],
      sociales: ["Aislamiento social profundo", "Ruptura de relaciones importantes", "Dificultad para mantener compromisos"],
      academicas: ["Abandono escolar o bajo rendimiento severo", "Incapacidad para concentrarse o procesar información", "Pérdida de motivación académica total"],
    },
    musica: {
      titulo: "Música Instrumental Para La Calma",
      artista: "YouTube · Relajación Profunda",
      url: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
    },
    videos: [
      {
        titulo: "¿Qué es la depresión? — explicación para adolescentes",
        url: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
      },
      {
        titulo: "Cómo ayudar a alguien con depresión",
        url: "https://www.youtube.com/watch?v=XiCrniLQGYc",
      },
      {
        titulo: "Depresión en jóvenes — señales y cómo buscar ayuda",
        url: "https://www.youtube.com/watch?v=wqZtXs0WBeA",
      },
    ],
    reto: {
      titulo: "Un Paso Al Día · 7 Días",
      descripcion:
        "Con depresión, los pasos pequeños son victorias reales. Comprométete a uno por día:",
      pasos: [
        "Día 1 · Escribe cómo te has sentido esta semana. Solo eso. Sin juzgarte.",
        "Día 2 · Sal al exterior 10 minutos. No hace falta hacer nada más.",
        "Día 3 · Envía un mensaje a una persona de confianza: 'Quiero hablar contigo'.",
        "Día 4 · Haz una actividad que antes disfrutabas, aunque sea 5 minutos.",
        "Día 5 · Busca información sobre el recurso de apoyo más cercano a ti.",
        "Día 6 · Da el paso de contactar a ese recurso (orientador, línea, psicólogo).",
        "Día 7 · Escribe qué pasó esta semana. ¿Qué fue diferente?",
      ],
    },
  },

  bullying: {
    titulo: "Bullying Y Acoso Escolar",
    subtitulo:
      "El acoso escolar no es un conflicto normal entre iguales. Es una dinámica de poder repetida que afecta el bienestar. Reconocerlo es el primer paso para romperlo.",
    color: "#E53E3E",
    emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,
    sintomas: [
      "Le cuesta encontrar razones para ir al colegio sin poder explicar exactamente por qué.",
      "Sus pertenencias aparecen dañadas o perdidas con más frecuencia de lo normal.",
      "Cambia de ánimo drásticamente antes o después de estar en ciertos grupos o espacios.",
      "Evita hablar de lo que pasa en el colegio o en redes sociales.",
      "Tiene cambios bruscos en sueño o apetito sin causa física conocida.",
    ],
    tipos: "Físico (golpes, empujones), verbal (insultos, apodos hirientes, burlas repetidas), social (exclusión deliberada, rumores, manipulación de grupos) y ciberbullying (acoso por redes, mensajes o fotos que no termina al salir del colegio).",
    prevencion: [
      "Habla con un adulto de confianza desde la primera señal.",
      "Cultiva relaciones de apoyo fuera del grupo en que se produce el acoso.",
      "Guarda evidencia desde el primer momento: capturas, mensajes, fechas.",
      "Conoce el protocolo de tu institución — todos los colegios en Colombia tienen obligación de tenerlo.",
    ],
    inmediato: [
      "No responder con agresión — es lo que el agresor busca para justificarse.",
      "Alejarse físicamente si es presencial; bloquear y reportar si es digital.",
      "Guardar evidencia: capturas, mensajes, fechas.",
      "Hablar hoy con alguien de confianza: orientador, docente, familiar cercano.",
    ],
    noRecomendadas: [
      "Responder con agresión o contraataque — escala el conflicto.",
      "Ignorarlo esperando que pase solo — sin intervención, tiende a escalar.",
      "Guardar silencio por miedo a represalias — el silencio sostiene el acoso.",
    ],
    noExpresar: [
      "No contar el acoso a nadie prolonga una situación que tiene solución con ayuda.",
      "Guardar el bullying como un secreto aumenta la sensación de vergüenza y soledad.",
      "No denunciar impide que el colegio active su protocolo de protección.",
    ],
    consecuencias: {
      fisicas: ["Dolores de cabeza y estómago frecuentes por estrés", "Insomnio y pesadillas recurrentes", "Pérdida de apetito o cambios bruscos de peso"],
      sociales: ["Aislamiento social y pérdida de amistades", "Desconfianza generalizada hacia los compañeros", "Dificultad para integrarse en nuevos grupos"],
      academicas: ["Ausentismo escolar frecuente", "Caída en el rendimiento académico", "Dificultad para concentrarse por el estado de alerta constante"],
    },
    musica: {
      titulo: "Playlist Calma Y Seguridad",
      artista: "YouTube · Música Relajante",
      url: "https://www.youtube.com/watch?v=UfcAVejslrU",
    },
    videos: [
      {
        titulo: "Qué hacer si sufres bullying — guía para adolescentes",
        url: "https://www.youtube.com/watch?v=FsMBvmHlXoQ",
      },
      {
        titulo: "Cómo reconocer el bullying y cómo actuar",
        url: "https://www.youtube.com/watch?v=2Z-0VLKvYdk",
      },
    ],
    reto: {
      titulo: "Protocolo De 5 Pasos",
      descripcion:
        "Marca cada paso a medida que lo vayas tomando:",
      pasos: [
        "No respondas con agresión — respira y aléjate.",
        "Guarda evidencia: captura o anota lo que pasó con fecha y hora.",
        "Cuéntalo hoy a un adulto de confianza (orientador, docente, familiar).",
        "Pide que se active el protocolo de convivencia de tu colegio.",
        "Recuerda: pedir ayuda es un acto de fuerza, no de debilidad.",
      ],
    },
  },
};
</script>

<template>
  <section id="regulacion" class="py-20 lg:py-32 relative bg-background scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgRegulacion"
        alt=""
        class="w-full h-full object-cover grayscale"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12 max-w-3xl mx-auto"
      >
        <span
          class="inline-block px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5"
        >
          Paso 2 · Regulación
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Técnicas Para
          <span class="text-primary">Regular Emociones</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Ya Identificamos La Emoción, Ahora Elige La Situación Y Encuentra
          Técnicas, Música, Videos Y Retos Para Acompañarla.
        </p>
      </div>

      <!-- Selector de grupo -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
        class="max-w-5xl mx-auto mb-6"
      >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            v-for="(grupo, key) in grupos"
            :key="key"
            type="button"
            class="flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="
              currentGroup === key
                ? 'border-primary bg-primary/[0.06] shadow-soft'
                : 'border-border/60 bg-surface/70 hover:border-primary/40 hover:bg-surface hover:shadow-soft'
            "
            @click="selectGroup(key as Grupo)"
          >
            <img :src="grupo.icon" :alt="grupo.label" class="w-8 h-8 flex-shrink-0 drop-shadow-sm" />
            <span
              class="text-sm font-bold leading-snug"
              :class="currentGroup === key ? 'text-primary' : 'text-foreground/80'"
            >
              {{ grupo.label }}
            </span>
            <span
              v-if="currentGroup === key"
              class="ml-auto w-2 h-2 rounded-full bg-primary flex-shrink-0"
            />
          </button>
        </div>
      </div>

      <!-- Sub-tabs + contenido -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 200 },
        }"
      >
        <AppTabs v-model="currentTab" class="max-w-5xl mx-auto">
          <!-- Sub-tabs positivas -->
          <AppTabsList
            v-if="currentGroup === 'positivas'"
            class="flex w-full overflow-x-auto md:grid md:grid-cols-3 gap-2 mb-8 bg-surface/70 backdrop-blur-sm rounded-3xl p-2 h-auto shadow-soft scrollbar-hide"
          >
            <AppTabsTrigger value="alegria" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Smiling%20face%20with%20smiling%20eyes/3D/smiling_face_with_smiling_eyes_3d.png`" alt="Alegría" />
                Alegría
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="motivacion" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`" alt="Motivación" />
                Motivación
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="gratitud" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Smiling%20face%20with%20open%20hands/3D/smiling_face_with_open_hands_3d.png`" alt="Gratitud" />
                Gratitud
              </span>
            </AppTabsTrigger>
          </AppTabsList>

          <!-- Sub-tabs negativas -->
          <AppTabsList
            v-else-if="currentGroup === 'negativas'"
            class="flex w-full overflow-x-auto md:grid md:grid-cols-3 gap-2 mb-8 bg-surface/70 backdrop-blur-sm rounded-3xl p-2 h-auto shadow-soft scrollbar-hide"
          >
            <AppTabsTrigger value="ansiedad" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`" alt="Ansiedad" />
                Ansiedad
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="ira" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`" alt="Ira" />
                Ira/Estrés
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="tristeza" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`" alt="Tristeza" />
                Tristeza
              </span>
            </AppTabsTrigger>
          </AppTabsList>

          <!-- Sub-tabs situaciones -->
          <AppTabsList
            v-else
            class="flex w-full overflow-x-auto md:grid md:grid-cols-2 gap-2 mb-8 bg-surface/70 backdrop-blur-sm rounded-3xl p-2 h-auto shadow-soft scrollbar-hide"
          >
            <AppTabsTrigger value="depresion" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Disappointed%20face/3D/disappointed_face_3d.png`" alt="Depresión" />
                Depresión
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="bullying" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5">
                <img class="w-4 h-4" :src="`${EMOJI_BASE}/Shield/3D/shield_3d.png`" alt="Bullying" />
                Bullying
              </span>
            </AppTabsTrigger>
          </AppTabsList>

          <!-- Contenido de todos los tabs (v-show = estado preservado) -->
          <AppTabsContent value="alegria" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.alegria" />
          </AppTabsContent>
          <AppTabsContent value="motivacion" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.motivacion" />
          </AppTabsContent>
          <AppTabsContent value="gratitud" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.gratitud" />
          </AppTabsContent>
          <AppTabsContent value="ansiedad" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.ansiedad" />
          </AppTabsContent>
          <AppTabsContent value="ira" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.ira" />
          </AppTabsContent>
          <AppTabsContent value="tristeza" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.tristeza" />
          </AppTabsContent>
          <AppTabsContent value="depresion" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.depresion" />
          </AppTabsContent>
          <AppTabsContent value="bullying" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.bullying" />
          </AppTabsContent>
        </AppTabs>
      </div>
    </div>
  </section>
</template>
