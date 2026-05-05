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

const currentTab = ref("ansiedad");

function handlePreset(e: Event) {
  const evt = e as CustomEvent<string>;
  if (typeof evt.detail === "string") {
    currentTab.value = evt.detail;
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
  ansiedad: {
    titulo: "Ansiedad",
    subtitulo:
      "Esa sensación de alerta, nudo en el estómago o la mente acelerada. Es normal y se puede regular.",
    color: "#B794F4",
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
      "Dite en voz baja: “esto pasará, ya lo he sentido antes y se ha calmado”.",
    ],
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
    ],
    reto: {
      titulo: "Diario de preocupaciones · 5 días",
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
    titulo: "Ira o Estrés",
    subtitulo:
      "Cuando algo te desborda, te frustra o sientes que vas a estallar. La ira da información — no te define.",
    color: "#F6AD55",
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
      "Aprende a decir “no” sin sentir culpa — el estrés crónico viene de cargar más de la cuenta.",
      "Crea rutinas de descanso: 10 min sin pantalla entre clases o tareas.",
    ],
    inmediato: [
      "Aléjate físicamente del lugar o la persona durante al menos 5 minutos.",
      "Cuenta hacia atrás desde 20 en voz baja.",
      "Aprieta los puños 10 segundos y luego suéltalos — repite 3 veces.",
      'Usa frases en primera persona: "Yo me siento… cuando pasa X, necesito Y".',
    ],
    musica: {
      titulo: "Playlist Lo-fi para calmarte",
      artista: "Lofi Girl",
      url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    },
    videos: [
      {
        titulo: "Cómo manejar el estrés — video 1",
        url: "https://www.youtube.com/watch?v=SB6VCPDFeiw",
      },
      {
        titulo: "Cómo manejar el estrés — video 2",
        url: "https://www.youtube.com/watch?v=ihLiNXyaHoM",
      },
      {
        titulo: "Cómo controlar la ira — técnicas efectivas",
        url: "https://www.youtube.com/shorts/RCGmD1Fwzd8",
      },
    ],
    reto: {
      titulo: "El semáforo emocional · 1 semana",
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
    color: "#90CDF4",
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
      "Envía un mensaje a alguien de confianza: “Necesito hablar un rato”.",
      "Haz una actividad que antes disfrutabas, aunque no tengas ganas (10 min mínimo).",
      "Escribe una carta a la tristeza: “¿Qué me estás tratando de decir?”",
    ],
    musica: {
      titulo: "Playlist para sentirte acompañado",
      artista: "Spotify · abrazo sonoro",
      url: "https://www.youtube.com/watch?v=4N3N1MlvVc4",
    },
    videos: [
      {
        titulo: "La tristeza no es tu enemiga — video para jóvenes",
        url: "https://www.youtube.com/watch?v=hnfdgrsfVYg",
      },
    ],
    reto: {
      titulo: "3 cosas buenas · 7 días",
      descripcion:
        "Probado en estudios de psicología positiva: reduce la tristeza y mejora el sueño.",
      pasos: [
        "Cada noche escribe 3 cosas buenas que te pasaron hoy (pueden ser pequeñas).",
        "Junto a cada una, anota por qué crees que pasó.",
        "Si no se te ocurre nada grande, sirve “un café rico”, “un mensaje”, “una canción”.",
        "Repite durante 7 días sin saltarte ninguno.",
        "Al final: relee los 7 días del tirón y observa cómo te sientes.",
      ],
    },
  },
  bullying: {
    titulo: "Bullying o Acoso",
    subtitulo:
      "Si alguien te hace daño de forma repetida, no es tu culpa y no tienes que resolverlo solo/a.",
    color: "#BC6C8A",
    emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,
    sintomas: [
      "No quieres ir al colegio y no puedes explicar exactamente por qué.",
      "Llegas a casa con objetos perdidos, ropa dañada o sin explicación de lo que pasó.",
      "Cambias de ánimo drásticamente antes o después de estar en ciertos grupos o espacios.",
      "Evitas hablar de lo que pasa en el colegio o en redes sociales.",
    ],
    tipos: "Acoso físico (golpes, empujones), verbal (insultos, apodos hirientes), social/relacional (exclusión deliberada, rumores) y ciberbullying (acoso por redes o mensajes). Todos son igual de serios y todos tienen ruta de atención.",
    prevencion: [
      "Guarda evidencia (capturas, mensajes) desde el primer incidente.",
      "Identifica al menos 1 adulto de confianza (docente, orientador, familiar) al que puedas acudir.",
      "Rodéate de grupos donde te sientas seguro/a: un amigo de verdad vale más que 20 de apariencia.",
      "Conoce tus derechos: en Colombia la Ley 1620 de 2013 te protege.",
    ],
    inmediato: [
      "No respondas con agresión — es lo que el agresor busca para justificarse.",
      "Aléjate físicamente si es presencial; bloquea y reporta si es digital.",
      "Habla hoy mismo con alguien: orientador, docente, familiar o amistad cercana.",
      "Si te sientes en peligro, llama a la Línea 106 (Bogotá) o al 141 (ICBF) — ver sección Apoyo.",
    ],
    musica: {
      titulo: "Brave",
      artista: "Sara Bareilles",
      url: "https://www.youtube.com/watch?v=QUQsqBqxoR4",
    },
    videos: [
      {
        titulo: "Qué hacer si sufres bullying — guía práctica",
        url: "https://www.youtube.com/watch?v=6jF71Z_dyxo",
      },
    ],
    reto: {
      titulo: "Red de protección · hoy mismo",
      descripcion:
        "No puedes detenerlo tú solo/a — pero sí puedes activar tu red de protección hoy:",
      pasos: [
        "Escribe en una nota 3 personas adultas en las que confías.",
        "Elige UNA y envíale un mensaje pidiendo hablar hoy o mañana.",
        "Guarda en una carpeta capturas o evidencias del acoso.",
        "Revisa la sección “Apoyo” de esta página y guarda 1 número de emergencia.",
        "Recuérdate: pedir ayuda es un acto de fuerza, no de debilidad.",
      ],
    },
  },
};
</script>

<template>
  <section id="regulacion" class="py-20 lg:py-32 relative bg-[#FEFBF7] scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgRegulacion"
        alt="Charla de convivencia"
        class="w-full h-full object-cover grayscale"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12"
      >
        <span
          class="inline-block px-4 py-2 rounded-full bg-[#5B8DEE]/10 text-[#5B8DEE] text-sm font-semibold mb-4"
        >
          Paso 2 · Regulación
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
        >
          Técnicas para&nbsp;
          <span
            class="bg-gradient-to-r from-[#5B8DEE] to-[#81E6D9] bg-clip-text text-transparent"
          >
            regular lo que sientes
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Ya pusiste nombre a tu emoción. Elige tu situación y encuentra
          técnicas, música, videos y retos diseñados para ti.
        </p>
      </div>

      <!-- Tabs -->
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
          <AppTabsList
            class="flex w-full overflow-x-auto md:grid md:grid-cols-4 gap-2 mb-8 bg-white/70 backdrop-blur-sm rounded-3xl p-2 h-auto shadow-soft scrollbar-hide"
          >
            <AppTabsTrigger value="ansiedad" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-4 h-4" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png" alt="Ansiedad" />
                Ansiedad
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="ira" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-4 h-4" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png" alt="Ira" />
                Ira/Estrés
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="tristeza" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-4 h-4" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Pensive%20face/3D/pensive_face_3d.png" alt="Tristeza" />
                Tristeza
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="bullying" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-4 h-4" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Shield/3D/shield_3d.png" alt="Bullying" />
                Bullying
              </span>
            </AppTabsTrigger>
          </AppTabsList>

          <AppTabsContent value="ansiedad" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.ansiedad" />
          </AppTabsContent>

          <AppTabsContent value="ira" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.ira" />
          </AppTabsContent>

          <AppTabsContent value="tristeza" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.tristeza" />
          </AppTabsContent>

          <AppTabsContent value="bullying" class="mt-6 regulacion-tab-content">
            <TecnicaRegulacion v-bind="tecnicas.bullying" />
          </AppTabsContent>
        </AppTabs>
      </div>
    </div>
  </section>
</template>
