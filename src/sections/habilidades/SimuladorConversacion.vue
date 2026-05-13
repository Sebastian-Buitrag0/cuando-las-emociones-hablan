<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { RotateCcw, ChevronRight, BotMessageSquare } from "lucide-vue-next";
import gsap from "gsap";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

type TipoRespuesta = "asertiva" | "pasiva" | "agresiva";

interface Opcion {
  texto: string;
  tipo: TipoRespuesta;
  feedback: string;
}

interface Situacion {
  situacion: string;
  opciones: Opcion[];
  aprendizaje: string;
}

const situaciones: Situacion[] = [
  {
    situacion: "Un compañero te habla de forma agresiva porque está estresado. ¿Qué respuesta demuestra comunicación asertiva?",
    opciones: [
      {
        texto: "Responder con el mismo tono.",
        tipo: "agresiva",
        feedback:
          "Responder con agresividad solo escala el conflicto. La otra persona probablemente está desahogando su estrés, no atacándote.",
      },
      {
        texto: '"Entiendo que estés molesto, pero prefiero que conversemos con respeto."',
        tipo: "asertiva",
        feedback:
          "¡Perfecto! Reconoces su emoción, pero pones un límite claro y respetuoso sobre cómo quieres ser tratado/a.",
      },
      {
        texto: "Ignorarlo completamente.",
        tipo: "pasiva",
        feedback:
          "Ignorar no resuelve el problema. La situación puede repetirse y tú te quedas con la incomodidad.",
      },
      {
        texto: '"Tus problemas no me importan."',
        tipo: "agresiva",
        feedback:
          "Responder con indiferencia hostil daña la relación y no ayuda a que la otra persona maneje mejor su estrés.",
      },
    ],
    aprendizaje:
      "Validar la emoción del otro mientras defiendes tu derecho al respeto es una habilidad clave de la comunicación asertiva.",
  },
  {
    situacion:
      "En una reunión, alguien se atribuye una idea que fue tuya. ¿Cuál sería una respuesta adecuada?",
    opciones: [
      {
        texto: '"Eso fue idea mía y tú lo sabes."',
        tipo: "agresiva",
        feedback:
          "Confrontar con enojo pone a la otra persona a la defensiva y cierra el diálogo.",
      },
      {
        texto: "Guardar silencio aunque te moleste.",
        tipo: "pasiva",
        feedback:
          "Callar cuando te han invisibilizado puede generar resentimiento con el tiempo.",
      },
      {
        texto:
          '"Quisiera aclarar que esa propuesta también surgió de mi aporte al trabajo."',
        tipo: "asertiva",
        feedback:
          "¡Exacto! Aclaras tu contribución sin atacar, usando un tono colaborativo y profesional.",
      },
      {
        texto: "Hablar mal de la persona después de la reunión.",
        tipo: "agresiva",
        feedback:
          "Hablar mal a espaldas de alguien daña el ambiente del equipo y no resuelve el problema original.",
      },
    ],
    aprendizaje:
      "Visibilizar tu trabajo no es presumir: es comunicar con claridad y respeto lo que aportaste.",
  },
  {
    situacion:
      "Un amigo divulga algo personal que le contaste en confianza. ¿Cuál es una respuesta asertiva?",
    opciones: [
      {
        texto: '"Eres la peor persona que conozco."',
        tipo: "agresiva",
        feedback:
          "Los insultos cierran la posibilidad de reparar la confianza y dañan más la relación.",
      },
      {
        texto: "Dejar de hablarle sin explicación.",
        tipo: "pasiva",
        feedback:
          "Alejarte sin explicación deja el conflicto sin resolver y puede hacerte sentir peor.",
      },
      {
        texto:
          '"Me sentí incómodo porque era algo privado y esperaba discreción."',
        tipo: "asertiva",
        feedback:
          "¡Muy bien! Expresaste cómo te afectó su acción sin atacarlo, y dejaste claro lo que esperabas.",
      },
      {
        texto: "Contar un secreto suyo como venganza.",
        tipo: "agresiva",
        feedback:
          "La venganza escala el daño y te pone al mismo nivel. La asertividad busca reparar, no devolver el golpe.",
      },
    ],
    aprendizaje:
      "Expresar cómo te sientes ante una traición de confianza es el primer paso para sanar la relación.",
  },
  {
    situacion:
      "Un compañero hace comentarios sarcásticos sobre ti y te incomoda. ¿Cuál es una respuesta asertiva?",
    opciones: [
      {
        texto: '"Si sigues molestando, vas a ver."',
        tipo: "agresiva",
        feedback:
          "Las amenazas escalan la hostilidad y te ponen en una posición de conflicto abierto.",
      },
      {
        texto:
          '"No me siento cómodo con esos comentarios; preferiría que no los hicieras."',
        tipo: "asertiva",
        feedback:
          "¡Genial! Nombraste cómo te sientes y pediste un cambio de conducta de forma directa y respetuosa.",
      },
      {
        texto: 'Responder con sarcasmo para "devolverle" el comentario.',
        tipo: "agresiva",
        feedback:
          "Devolver el sarcasmo te pone en el mismo nivel y puede intensificar la situación.",
      },
      {
        texto: "Ignorarlo aunque continúe.",
        tipo: "pasiva",
        feedback:
          "Ignorar el acoso repetido puede hacer que la conducta continúe y que tú acumules malestar.",
      },
    ],
    aprendizaje:
      "Poner límites claros ante el sarcasmo incómodo protege tu bienestar sin necesidad de entrar en conflicto.",
  },
  {
    situacion:
      "En un trabajo grupal, sientes que tus ideas son ignoradas constantemente. ¿Qué sería lo más adecuado?",
    opciones: [
      {
        texto: '"Como nunca escuchan, no vuelvo a ayudar."',
        tipo: "agresiva",
        feedback:
          "Abandonar el grupo con una acusación daña la dinámica y te deja fuera de la solución.",
      },
      {
        texto: "Permanecer callado para evitar conflictos.",
        tipo: "pasiva",
        feedback:
          "Callar para evitar conflictos te invisibiliza y no le da al grupo la oportunidad de escuchar tus ideas.",
      },
      {
        texto:
          '"Me gustaría que también tomaran en cuenta mis propuestas antes de decidir."',
        tipo: "asertiva",
        feedback:
          "¡Exacto! Expresas tu necesidad de ser escuchado/a de forma clara y constructiva.",
      },
      {
        texto: "Criticar el trabajo del grupo por detrás.",
        tipo: "agresiva",
        feedback:
          "Criticar por detrás daña la confianza del equipo y no mejora tu participación en el grupo.",
      },
    ],
    aprendizaje:
      "Alzar la voz para pedir ser incluido/a en las decisiones no es confrontar: es participar activamente.",
  },
  {
    situacion:
      "Un amigo llega tarde repetidamente y eso afecta el trabajo en equipo. ¿Cómo actuar de forma asertiva?",
    opciones: [
      {
        texto: '"Nunca sirves para nada."',
        tipo: "agresiva",
        feedback:
          "Insultar no resuelve el problema y daña la relación y la confianza del equipo.",
      },
      {
        texto:
          '"Me preocupa que los retrasos afecten el trabajo; ¿cómo podemos organizarnos mejor?"',
        tipo: "asertiva",
        feedback:
          "¡Perfecto! Expresas tu preocupación, describes el impacto y abres la conversación para buscar soluciones juntos.",
      },
      {
        texto: "Ignorarlo completamente.",
        tipo: "pasiva",
        feedback:
          "Ignorar el problema permite que siga afectando al equipo y puede generar frustración acumulada.",
      },
      {
        texto: "Hablar mal de él con otros compañeros.",
        tipo: "agresiva",
        feedback:
          "Hablar mal de un compañero no soluciona el retraso y deteriora la confianza del grupo.",
      },
    ],
    aprendizaje:
      "Señalar un problema desde la preocupación —no desde la acusación— invita a colaborar en lugar de defenderse.",
  },
  {
    situacion:
      "Alguien te pide un favor, pero no tienes tiempo para ayudar. ¿Cuál es una respuesta asertiva?",
    opciones: [
      {
        texto: '"No puedo ayudarte ahora porque tengo otras responsabilidades."',
        tipo: "asertiva",
        feedback:
          "¡Exacto! Dices que no de forma clara, breve y honesta, sin necesidad de dar excusas exageradas.",
      },
      {
        texto: '"Déjame en paz."',
        tipo: "agresiva",
        feedback:
          "Responder con hostilidad daña la relación innecesariamente cuando podrías simplemente decir que no.",
      },
      {
        texto: '"Sí", aunque no puedas hacerlo.',
        tipo: "pasiva",
        feedback:
          "Decir 'sí' cuando quieres decir 'no' te sobrecarga y puede generar frustración contigo mismo/a.",
      },
      {
        texto: "Ignorar los mensajes.",
        tipo: "pasiva",
        feedback:
          "Ignorar no es decir que no: deja a la otra persona esperando y a ti con la carga mental.",
      },
    ],
    aprendizaje:
      "Decir 'no' con claridad y sin culpa es un acto de autocuidado y una habilidad asertiva fundamental.",
  },
  {
    situacion:
      "Durante una discusión, ¿qué caracteriza a la comunicación asertiva?",
    opciones: [
      {
        texto: "Hablar gritando para ganar.",
        tipo: "agresiva",
        feedback: "Gritar e imponer no es comunicación, es dominación.",
      },
      {
        texto: "Expresar ideas con respeto y escuchar a los demás.",
        tipo: "asertiva",
        feedback:
          "¡Correcto! La asertividad combina expresar tus ideas con respeto y escuchar genuinamente al otro.",
      },
      {
        texto: "Evitar hablar para no tener problemas.",
        tipo: "pasiva",
        feedback:
          "Evitar hablar para no tener problemas te invisibiliza y puede hacer que otros decidan por ti.",
      },
      {
        texto: "Imponer siempre la opinión propia.",
        tipo: "agresiva",
        feedback:
          "La comunicación asertiva busca acuerdos, no imponer. Imponer siempre genera resistencia.",
      },
    ],
    aprendizaje:
      "La asertividad es el equilibrio entre defender tus derechos y respetar los de los demás.",
  },
  {
    situacion:
      "Un compañero critica tus decisiones personales frente a otros. ¿Qué sería lo más asertivo?",
    opciones: [
      {
        texto: '"Ocúpate de tu vida."',
        tipo: "agresiva",
        feedback:
          "Responder con hostilidad te pone a la defensiva y puede escalar la situación frente a otros.",
      },
      {
        texto:
          '"Respeto tu opinión, pero prefiero decidir eso por mí mismo."',
        tipo: "asertiva",
        feedback:
          "¡Muy bien! Respetas su opinión pero afirmas tu autonomía sin agredir ni justificarte de más.",
      },
      {
        texto: "Sentirte obligado a justificarte.",
        tipo: "pasiva",
        feedback:
          "Sentirte obligado a justificarte cede el control de tus decisiones a la opinión ajena.",
      },
      {
        texto: "Responder burlándote de él.",
        tipo: "agresiva",
        feedback:
          "Burlarte te pone al mismo nivel y puede hacer que pierdas la razón ante los demás.",
      },
    ],
    aprendizaje:
      "Puedes respetar la opinión de alguien sin aceptarla como válida para tu vida. Esa es tu autonomía.",
  },
  {
    situacion:
      "Un amigo te pide copiarse de tu trabajo y tú no quieres. ¿Qué respondes de forma asertiva?",
    opciones: [
      {
        texto: '"No, porque eres un irresponsable."',
        tipo: "agresiva",
        feedback:
          "Insultar mientras dices que no daña la relación y hace que tu negativa se sienta como un ataque.",
      },
      {
        texto: '"Sí, aunque no quiera."',
        tipo: "pasiva",
        feedback:
          "Decir 'sí' cuando no quieres compromete tus valores y puede meterte en problemas.",
      },
      {
        texto:
          '"Prefiero no prestarlo, pero puedo ayudarte a estudiar."',
        tipo: "asertiva",
        feedback:
          "¡Genial! Dices que no con firmeza, explicas tu razón y ofreces una alternativa constructiva.",
      },
      {
        texto: "No responderle.",
        tipo: "pasiva",
        feedback:
          "No responder deja el problema abierto y puede hacer que la otra persona insista o se sienta ignorada.",
      },
    ],
    aprendizaje:
      "Decir 'no' y ofrecer una alternativa muestra que tu límite no es rechazo a la persona, sino cuidado mutuo.",
  },
  {
    situacion:
      "Tu grupo quiere imponer una idea con la que no estás de acuerdo. ¿Qué haces?",
    opciones: [
      {
        texto: '"Esa idea es terrible."',
        tipo: "agresiva",
        feedback:
          "Descalificar la idea de otros cierra el diálogo y no invita a considerar tu punto de vista.",
      },
      {
        texto:
          '"Estoy en desacuerdo y me gustaría proponer otra opción."',
        tipo: "asertiva",
        feedback:
          "¡Perfecto! Expresas tu desacuerdo con respeto y te ofreces a construir una alternativa.",
      },
      {
        texto: "Aceptar aunque no quieras.",
        tipo: "pasiva",
        feedback:
          "Aceptar en contra de tu opinión genera frustración y no contribuye a una mejor decisión grupal.",
      },
      {
        texto: "Irte del grupo sin decir nada.",
        tipo: "pasiva",
        feedback:
          "Irte sin decir nada te excluye del proceso y el grupo se pierde tu perspectiva valiosa.",
      },
    ],
    aprendizaje:
      "Disentir con respeto y proponer alternativas es una forma madura de participar en decisiones grupales.",
  },
];

const currentIndex = ref(0);
const seleccion = ref<number | null>(null);
const asertivas = ref(0);
const terminado = ref(false);

const situacion = computed(() => situaciones[currentIndex.value]);
const opcionElegida = computed(() =>
  seleccion.value !== null ? situacion.value.opciones[seleccion.value] : null
);
const esUltima = computed(() => currentIndex.value === situaciones.length - 1);

// Color choices are intentional:
// - asertiva → primary (confident, the correct path)
// - pasiva   → secondary (warm orange, not negative — passive isn't 'bad', just incomplete)
// - agresiva → crisis warm coral (warning without alarm-red. Per the emotion-safe principle,
//              we never use destructive cool-red for emotional content; that hue is reserved
//              for form errors elsewhere.)
const tipoStyle: Record<
  TipoRespuesta,
  { color: string; label: string; bgHex: string }
> = {
  asertiva: { color: "#5B8DEE", label: "Respuesta asertiva ✓", bgHex: "12" },
  pasiva:   { color: "#F4A259", label: "Respuesta pasiva",     bgHex: "15" },
  agresiva: { color: "#C2735A", label: "Respuesta agresiva",   bgHex: "14" },
};

function elegir(i: number) {
  if (seleccion.value !== null) return;
  seleccion.value = i;
  if (situacion.value.opciones[i].tipo === "asertiva") asertivas.value++;

  // Animate feedback in
  nextTick(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const feedback = document.querySelector(".sim-feedback");
    if (feedback) {
      gsap.fromTo(feedback, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  });
}

function siguiente() {
  if (esUltima.value) {
    terminado.value = true;
    nextTick(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const result = document.querySelector(".sim-resultado");
      if (result) {
        gsap.fromTo(result, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" });
      }
    });
  } else {
    const oldIndex = currentIndex.value;
    currentIndex.value++;
    seleccion.value = null;
    nextTick(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const opciones = document.querySelectorAll(".sim-opcion");
      if (opciones.length) {
        gsap.fromTo(opciones, { x: oldIndex < currentIndex.value ? 30 : -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" });
      }
    });
  }
}

function hablarConEmilio() {
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: `Acabo de completar el simulador de comunicación asertiva y obtuve ${asertivas.value} de ${situaciones.length} respuestas asertivas. ¿Puedes ayudarme a seguir practicando y mejorar mis habilidades de comunicación?`,
    },
  }));
}

function reiniciar() {
  currentIndex.value = 0;
  seleccion.value = null;
  asertivas.value = 0;
  terminado.value = false;
  nextTick(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const opciones = document.querySelectorAll(".sim-opcion");
    if (opciones.length) {
      gsap.fromTo(opciones, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" });
    }
  });
}
</script>

<template>
  <div class="mt-5 rounded-2xl border border-primary/20 bg-surface/85 p-5">
    <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-4">
      <img class="w-5 h-5 shrink-0 object-contain inline-block drop-shadow-sm" :src="`${EMOJI_BASE}/Performing%20arts/3D/performing_arts_3d.png`" alt="Simulador" />
      Simulador · Comunicación asertiva
    </p>

    <!-- Pantalla final -->
    <div v-if="terminado" class="sim-resultado text-center py-4">
      <div class="text-5xl mb-4">
        <img
          v-if="asertivas === situaciones.length"
          class="w-12 h-12 shrink-0 object-contain inline-block mx-auto drop-shadow-md"
          :src="`${EMOJI_BASE}/Glowing%20star/3D/glowing_star_3d.png`"
          alt="Excelente"
        />
        <img
          v-else-if="asertivas >= 7"
          class="w-12 h-12 shrink-0 object-contain inline-block mx-auto drop-shadow-md"
          :src="`${EMOJI_BASE}/Flexed%20biceps/Default/3D/flexed_biceps_3d_default.png`"
          alt="Buen avance"
        />
        <img
          v-else
          class="w-12 h-12 shrink-0 object-contain inline-block mx-auto drop-shadow-md"
          :src="`${EMOJI_BASE}/Books/3D/books_3d.png`"
          alt="Sigue practicando"
        />
      </div>
      <p class="text-xl font-bold text-foreground mb-2">
        {{ asertivas }}/{{ situaciones.length }} respuestas asertivas
      </p>
      <p class="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
        {{
          asertivas === situaciones.length
            ? "¡Excelente dominio de la comunicación asertiva!"
            : asertivas >= 7
              ? "Buen avance — sigue practicando en el día a día."
              : "La asertividad se aprende con la práctica. ¡Intenta de nuevo!"
        }}
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground shadow-soft motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          @click="reiniciar"
        >
          <RotateCcw class="h-4 w-4" />
          Volver a intentar
        </button>
        <button
          @click="hablarConEmilio"
          class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <BotMessageSquare class="h-4 w-4" />
          Seguir practicando con Emilio
        </button>
      </div>
    </div>

    <!-- Simulador activo -->
    <template v-else>
      <!-- Progreso -->
      <div class="flex items-center gap-1.5 mb-4">
        <div
          v-for="(_, i) in situaciones"
          :key="i"
          class="h-1.5 flex-1 rounded-full transition-[background-color] duration-300"
          :class="
            i < currentIndex
              ? 'bg-primary'
              : i === currentIndex
                ? 'bg-primary/50'
                : 'bg-border'
          "
        />
        <span class="ml-2 text-xs text-muted-foreground/70 font-medium tabular-nums">
          {{ currentIndex + 1 }}/{{ situaciones.length }}
        </span>
      </div>

      <!-- Situación -->
      <div class="rounded-xl bg-surface-warm p-4 mb-4">
        <p
          class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5"
        >
          Situación
        </p>
        <p class="text-sm text-foreground font-medium leading-relaxed">
          {{ situacion.situacion }}
        </p>
      </div>

      <!-- Opciones -->
      <p class="text-xs text-muted-foreground mb-2.5">¿Cómo respondes?</p>
      <div class="space-y-2">
        <button
          v-for="(opcion, i) in situacion.opciones"
          :key="i"
          class="sim-opcion w-full text-left rounded-xl border-2 p-3 text-sm transition-[border-color,background-color,color,opacity] duration-200 leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring"
          :style="
            seleccion === i
              ? {
                  borderColor: tipoStyle[opcion.tipo].color,
                  backgroundColor:
                    tipoStyle[opcion.tipo].color +
                    tipoStyle[opcion.tipo].bgHex,
                }
              : {}
          "
          :class="[
            seleccion === null
              ? 'border-border hover:border-primary/40 hover:bg-primary/5 text-foreground/80'
              : seleccion === i
                ? 'text-foreground'
                : 'border-border/40 text-muted-foreground/60 opacity-70',
          ]"
          :disabled="seleccion !== null"
          @click="elegir(i)"
        >
          <span class="font-bold mr-1.5 text-muted-foreground/70">{{
            String.fromCharCode(65 + i) }}.
          </span>{{ opcion.texto }}
        </button>
      </div>

      <!-- Resultado -->
      <Transition name="sim-slide">
        <div v-if="opcionElegida" class="mt-4 space-y-3">
          <!-- Feedback -->
          <div
            class="sim-feedback rounded-xl border p-4"
            :style="{
              backgroundColor:
                tipoStyle[opcionElegida.tipo].color +
                tipoStyle[opcionElegida.tipo].bgHex,
              borderColor: tipoStyle[opcionElegida.tipo].color + '40',
            }"
          >
            <p
              class="text-xs font-bold mb-1"
              :style="{ color: tipoStyle[opcionElegida.tipo].color }"
            >
              {{ tipoStyle[opcionElegida.tipo].label }}
            </p>
            <p class="text-sm text-foreground/80 leading-relaxed">
              {{ opcionElegida.feedback }}
            </p>
          </div>

          <!-- Aprendizaje -->
          <div class="rounded-xl p-3 bg-primary/[0.06] border border-primary/15">
            <p class="text-xs font-semibold text-primary mb-1">
              <img class="w-5 h-5 shrink-0 object-contain inline-block drop-shadow-sm" :src="`${EMOJI_BASE}/Light%20bulb/3D/light_bulb_3d.png`" alt="" />
              Para recordar
            </p>
            <p class="text-xs text-foreground/80 leading-relaxed">
              {{ situacion.aprendizaje }}
            </p>
          </div>

          <!-- Botón siguiente -->
          <div class="flex justify-end">
            <button
              class="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground shadow-soft motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
              @click="siguiente"
            >
              {{ esUltima ? "Ver resultado" : "Siguiente situación" }}
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.sim-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.sim-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .sim-slide-enter-active {
    transition: none;
  }
  .sim-slide-enter-from {
    opacity: 1;
    transform: none;
  }
}
</style>
