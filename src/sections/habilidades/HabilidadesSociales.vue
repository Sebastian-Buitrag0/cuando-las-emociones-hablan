<script setup lang="ts">
import { ref } from "vue";
import { MessageSquare, Ear, Users, Handshake, Target, ChevronRight } from "lucide-vue-next";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const subHabilidades = [
  {
    id: "asertiva",
    titulo: "Comunicación asertiva",
    icon: MessageSquare,
    color: "#5B8DEE",
    resumen:
      "Expresar lo que piensas y sientes con claridad y respeto, sin agredir ni someterte.",
    claves: [
      'Usa la fórmula: "Yo siento… cuando pasa X… necesito Y".',
      "Habla en primera persona: evita acusaciones tipo “tú siempre…”.",
      "Mantén un tono firme pero tranquilo — el grito no es asertividad.",
      "Escucha la respuesta antes de insistir en tu punto.",
    ],
    practica:
      "Hoy, piensa en una situación que te molesta y escribe qué le dirías usando la fórmula.",
  },
  {
    id: "escucha",
    titulo: "Escucha activa",
    icon: Ear,
    color: "#81E6D9",
    resumen:
      "Entender de verdad lo que la otra persona quiere decir, no solo esperar tu turno para hablar.",
    claves: [
      "Guarda el celular y haz contacto visual durante la conversación.",
      "No interrumpas ni termines las frases del otro.",
      'Repite lo que entendiste: "Entonces lo que te pasa es…".',
      "Pregunta antes de dar consejo: “¿quieres que te escuche o que te dé una idea?”",
    ],
    practica:
      "En tu próxima conversación, propon­te no interrumpir ni una sola vez. Observa cómo cambia.",
  },
  {
    id: "equipo",
    titulo: "Trabajo en equipo",
    icon: Users,
    color: "#F4A259",
    resumen:
      "Colaborar con otros reconociendo tus fortalezas y las de los demás, hacia un objetivo común.",
    claves: [
      "Define con el grupo qué vamos a lograr y con qué tiempo.",
      "Reparte tareas según fortalezas, no por quedar bien.",
      "Comunica si te atrasas: el equipo prefiere saber a que lo sorprendan.",
      "Celebra el logro colectivo: no lo personalices.",
    ],
    practica:
      "En el próximo trabajo en grupo, propón una “minireunión” de 5 min al inicio para repartir roles.",
  },
  {
    id: "conflictos",
    titulo: "Resolución de conflictos",
    icon: Handshake,
    color: "#BC6C8A",
    resumen:
      "Abordar los desacuerdos buscando acuerdos, no ganadores ni perdedores.",
    claves: [
      "Separa a la persona del problema: no ataques quién es.",
      "Busca intereses (lo que cada uno necesita), no posiciones (lo que cada uno exige).",
      "Propón al menos 2 soluciones antes de cerrar el tema.",
      "Si la emoción está muy alta, pausa y retoma en 30 min o al día siguiente.",
    ],
    practica:
      "Recuerda un conflicto reciente. ¿Cuál era el interés del otro? ¿Y el tuyo?",
  },
  {
    id: "toma-decisiones",
    titulo: "Toma De Decisiones",
    icon: Target,
    color: "#48BB78",
    resumen:
      "Evaluar opciones, anticipar consecuencias y elegir el camino que se alinea con tus valores y metas personales.",
    claves: [
      "Antes de decidir, escribe las opciones posibles y una consecuencia de cada una.",
      "Consulta a alguien de confianza, pero recuerda que la decisión final es tuya.",
      "Acepta que equivocarse es parte del aprendizaje: ninguna decisión es definitiva.",
      "Distingue lo urgente de lo importante para no decidir desde el pánico.",
    ],
    practica:
      "Escoge una decisión pendiente, lista 2 opciones y anota 1 consecuencia de cada una. Elige la que te dé más paz.",
  },
];

const seleccionada = ref(subHabilidades[0].id);
const activa = () =>
  subHabilidades.find((s) => s.id === seleccionada.value) ?? subHabilidades[0];
</script>

<template>
  <div class="mt-4">
    <p class="mb-3 text-xs font-semibold text-secondary uppercase tracking-wide">
      Sub-habilidades para trabajar
    </p>
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="sub in subHabilidades"
        :key="sub.id"
        class="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        :class="
          seleccionada === sub.id
            ? 'text-primary-foreground shadow-soft'
            : 'bg-surface text-foreground/80 border border-border hover:border-foreground/30'
        "
        :style="
          seleccionada === sub.id
            ? { backgroundColor: sub.color }
            : {}
        "
        @click.stop="seleccionada = sub.id"
      >
        <component :is="sub.icon" class="h-3.5 w-3.5" />
        {{ sub.titulo }}
      </button>
    </div>

    <Transition name="sub-fade" mode="out-in">
      <div
        :key="seleccionada"
        class="rounded-2xl p-4 border"
        :style="{
          backgroundColor: `${activa().color}10`,
          borderColor: `${activa().color}25`,
        }"
      >
        <p class="text-sm text-foreground/80 mb-3 leading-relaxed">
          {{ activa().resumen }}
        </p>
        <ul class="space-y-1.5 mb-3">
          <li
            v-for="(clave, i) in activa().claves"
            :key="i"
            class="flex items-start gap-2 text-xs text-foreground/80"
          >
            <ChevronRight
              class="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
              :style="{ color: activa().color }"
            />
            <span>{{ clave }}</span>
          </li>
        </ul>
        <div
          class="rounded-xl bg-surface/85 p-3 border"
          :style="{ borderColor: `${activa().color}30` }"
        >
          <p
            class="text-xs font-semibold mb-0.5"
            :style="{ color: activa().color }"
          >
            <img class="w-4 h-4 inline-block" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Flexed%20biceps/Default/3D/flexed_biceps_3d_default.png" alt="Práctica" />
            Práctica de hoy
          </p>
          <p class="text-xs text-foreground/80 leading-relaxed">
            {{ activa().practica }}
          </p>
        </div>

      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sub-fade-enter-active,
.sub-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.sub-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.sub-fade-leave-to     { opacity: 0; transform: translateY(-6px); }

@media (prefers-reduced-motion: reduce) {
  .sub-fade-enter-active,
  .sub-fade-leave-active { transition: none; }
  .sub-fade-enter-from,
  .sub-fade-leave-to { transform: none; }
}
</style>
