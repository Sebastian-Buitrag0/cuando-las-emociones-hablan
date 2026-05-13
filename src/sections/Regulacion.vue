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
    color: "hsl(263,73%,77%)",
    emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`,
    sintomas: [
      "Siente el corazón acelerado o el pecho apretado sin causa física clara.",
      "La mente produce pensamientos repetitivos del tipo '¿y si pasa algo malo?'",
      "Evita situaciones que antes no causaban problema (hablar en clase, estar en grupos).",
      "Duerme mal o se despierta con la sensación de que algo malo puede pasar.",
    ],
    tipos: "Ansiedad generalizada (preocupación constante por casi todo), ansiedad social (miedo intenso a ser juzgado/a), ansiedad por rendimiento (pánico ante exámenes) y crisis de pánico (episodios intensos y repentinos de miedo físico). Todas tienen solución.",
    prevencion: [
      "Dormir al menos 8 horas y reducir la cafeína.",
      "Hacer actividad física 3 veces por semana: el cuerpo descarga la ansiedad.",
      "Escribir en un diario lo que preocupa antes de dormir.",
      "Limitar el tiempo en redes sociales a 1 hora al día.",
    ],
    inmediato: [
      "Hacer la técnica 4-4-4: inhalar 4s, sostener 4s, exhalar 4s.",
      "Nombrar 5 cosas que ve, 4 que toca, 3 que oye, 2 que huele, 1 que saborea.",
      "Poner hielo en las manos o mojarlas con agua fría: activa el nervio vago.",
      'Decirse en voz baja: "esto pasará, ya lo he sentido antes y se ha calmado".',
    ],
    noRecomendadas: [
      "Evitar las situaciones que generan ansiedad (a largo plazo la aumenta).",
      "Distraerse con el teléfono para no pensar: pospone, no regula.",
      "Pedir que otros tranquilicen constantemente sin trabajar la tolerancia propia.",
    ],
    noExpresar: [
      "Mantener la ansiedad callada puede generar tensión muscular crónica y problemas digestivos.",
      "No pedir ayuda cuando se necesita aumenta el aislamiento y la sensación de estar solo/a.",
      "Guardar todo para uno/a mismo/a puede llevar a crisis de pánico inesperadas.",
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
    color: "hsl(var(--secondary))",
    emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`,
    sintomas: [
      "Siente tensión muscular, mandíbula apretada o calor en la cara ante situaciones cotidianas.",
      "Cualquier pequeño obstáculo la desborda de manera que parece desproporcionada.",
      "Después de perder el control, siente culpa o vergüenza profunda.",
      "Duerme poco, le irrita el ruido o tiene dolores de cabeza frecuentes.",
    ],
    tipos: "Estrés crónico (tensión sostenida en el tiempo), frustración (cuando algo bloquea las metas), rabia reactiva (explosiones rápidas) e ira pasiva (silencio, sarcasmo, 'hacerse el/la indiferente'). Reconocer el patrón es el primer paso.",
    prevencion: [
      "Identificar los detonantes: ¿qué personas o situaciones suelen activarla?",
      "Hacer ejercicio intenso (correr, bailar, boxear) para liberar tensión acumulada.",
      'Aprender a decir "no" sin sentir culpa: el estrés crónico viene de cargar más de la cuenta.',
      "Crear rutinas de descanso: 10 min sin pantalla entre clases o tareas.",
    ],
    inmediato: [
      "Alejarse físicamente del lugar o la persona durante al menos 5 minutos.",
      "Contar hacia atrás desde 20 en voz baja.",
      "Apretar los puños 10 segundos y luego soltarlos: repetir 3 veces.",
      'Usar frases en primera persona: "Yo me siento… cuando pasa X, necesito Y".',
    ],
    noRecomendadas: [
      "Explotar verbalmente en el momento: daña relaciones y genera culpa posterior.",
      "Rumiar dándole vueltas al mismo pensamiento sin buscar solución.",
      "Guardar silencio indefinidamente sin comunicar lo que se siente.",
    ],
    noExpresar: [
      "No decir lo que molesta genera resentimiento acumulado que explota después.",
      "Guardar la ira puede convertirse en dolores de cabeza crónicos y contracturas.",
      "Callar lo que se siente hace que otros no sepan qué límites respetar.",
    ],
    consecuencias: {
      fisicas: ["Tensión muscular y contracturas", "Problemas de presión arterial", "Alteraciones digestivas crónicas"],
      sociales: ["Conflictos relacionales frecuentes", "Pérdida de confianza de otros", "Aislamiento por miedo a perder el control"],
      academicas: ["Problemas de concentración sostenida", "Conflictos con compañeros o docentes", "Bajo rendimiento por estrés crónico"],
    },
    musica: {
      titulo: "Playlist Lo-fi para calmarte",
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
    color: "hsl(var(--primary))",
    emojiImg: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`,
    sintomas: [
      "Tiene pocas ganas de hacer cosas que antes disfrutaba, aunque intente forzarse.",
      "Siente un peso en el cuerpo, lentitud o ganas de llorar sin una razón clara.",
      "Se aísla de amigos o familia y prefiere estar solo/a sin saber bien por qué.",
      "Tiene pensamientos recurrentes de que 'nada tiene sentido' o 'no sirvo para nada'.",
    ],
    tipos: "Tristeza situacional (ante una pérdida o decepción concreta), tristeza persistente (dura semanas sin mejorar) o depresión, que requiere acompañamiento profesional. Si pasan más de 2 semanas sintiéndose así, es importante buscar apoyo.",
    prevencion: [
      "Mantener contacto frecuente con al menos 2 personas que le hagan sentir bien.",
      "Salir a caminar 20 minutos al día: la luz natural regula el ánimo.",
      "Cuidar lo que consume: reducir contenido que haga comparar o sentir peor.",
      "Dormir y comer con horarios regulares: el cuerpo influye en la mente.",
    ],
    inmediato: [
      "Permitirse llorar si lo necesita: es una liberación, no una debilidad.",
      'Enviar un mensaje a alguien de confianza: "Necesito hablar un rato".',
      "Hacer una actividad que antes disfrutaba, aunque no tenga ganas (10 min mínimo).",
      'Escribir una carta a la tristeza: "¿Qué me estás tratando de decir?"',
    ],
    noRecomendadas: [
      "Aislarse y no responder mensajes: prolonga y profundiza el estado.",
      "Consumir contenido que haga sentir peor o que haga compararse.",
      "Esperar que pase sola sin hacer nada: sin acción, tiende a cronificarse.",
    ],
    noExpresar: [
      "No contar la tristeza a nadie puede hacer que la soledad se sienta permanente.",
      "Ocultar lo que se siente agota energía que se podría usar para sanar.",
      "Guardar todo para uno/a mismo/a dificulta que otros puedan acompañar.",
    ],
    consecuencias: {
      fisicas: ["Fatiga crónica y falta de energía", "Cambios en apetito y sueño", "Sistema inmune debilitado"],
      sociales: ["Aislamiento social progresivo", "Pérdida de relaciones cercanas", "Dificultad para conectar con otros"],
      academicas: ["Falta de motivación para estudiar", "Bajo rendimiento sostenido", "Dificultad para concentrarse en tareas"],
    },
    musica: {
      titulo: "Música de piano para acompañar la tristeza",
      artista: "YouTube · instrumental relajante",
      url: "https://www.youtube.com/watch?v=7vHCPYWzYU8",
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
        'Si no se te ocurre nada grande, sirve "un café rico", "un mensaje", "una canción".',
        "Repite durante 7 días sin saltarte ninguno.",
        "Al final: relee los 7 días del tirón y observa cómo te sientes.",
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
          Técnicas para
          <span class="text-primary">regular lo que se siente</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Ya le pusiste nombre a la emoción. Elige la situación y encuentra
          técnicas, música, videos y retos para acompañarla.
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
            class="flex w-full overflow-x-auto md:grid md:grid-cols-3 gap-2 mb-8 bg-surface/70 backdrop-blur-sm rounded-3xl p-2 h-auto shadow-soft scrollbar-hide"
          >
            <AppTabsTrigger value="ansiedad" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-5 h-5 shrink-0 object-contain drop-shadow-sm" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png" alt="Ansiedad" />
                Ansiedad
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="ira" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-5 h-5 shrink-0 object-contain drop-shadow-sm" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png" alt="Ira" />
                Ira/Estrés
              </span>
            </AppTabsTrigger>
            <AppTabsTrigger value="tristeza" class="rounded-full py-3 text-sm flex-shrink-0 whitespace-nowrap">
              <span class="inline-flex items-center gap-1">
                <img class="w-5 h-5 shrink-0 object-contain drop-shadow-sm" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Pensive%20face/3D/pensive_face_3d.png" alt="Tristeza" />
                Tristeza
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

        </AppTabs>
      </div>
    </div>
  </section>
</template>
