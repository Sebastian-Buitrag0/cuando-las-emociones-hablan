<script setup lang="ts">
import { ChevronDown, BotMessageSquare } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import bgHabilidades from "@/img/trabajo_equipo_piso.jpeg";
import HabilidadesSociales from "./habilidades/HabilidadesSociales.vue";
import SimuladorConversacion from "./habilidades/SimuladorConversacion.vue";
import MindMapHabilidades from "./habilidades/MindMapHabilidades.vue";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const habilidades = [
  {
    title: "Autoconciencia",
    conector: "Es el punto de partida: sin reconocer lo que sentimos, no podemos gestionarlo.",
    description:
      "Reconocer y comprender nuestras propias emociones, fortalezas, limitaciones y cómo afectan nuestro comportamiento.",
    color: "hsl(var(--primary))",
    bgColor: "bg-primary/10",
    emojiImg: `${EMOJI_BASE}/Face%20in%20clouds/3D/face_in_clouds_3d.png`,
    señales: [
      "No sabes con certeza por qué reaccionas de cierta manera ante situaciones concretas.",
      "Tus emociones te sorprenden y te desbordan con frecuencia.",
      "Te cuesta responder honestamente '¿cómo estoy?' más allá de 'bien' o 'mal'.",
    ],
    tips: [
      "Pregúntate: ¿Qué estoy sintiendo en este momento?",
      "Identifica en qué parte del cuerpo sientes esa emoción.",
      "Escribe 3 pensamientos que acompañan esa emoción.",
      "Practica el 'check-in' diario: antes de dormir, nombra 3 emociones que sentiste hoy.",
    ],
    hasSubSkills: false,
  },
  {
    title: "Autorregulación",
    conector: "Reconocer es el primer paso; autorregularse es expresar esa emoción sin que nos controle.",
    description:
      "Gestionar las emociones de manera saludable, controlar impulsos y adaptarse a los cambios con flexibilidad.",
    color: "hsl(var(--calm))",
    bgColor: "bg-calm/20",
    emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,
    señales: [
      "Reaccionas de formas que después lamentas, y el ciclo se repite.",
      "Sientes que las emociones 'te explotan' antes de que puedas pensar.",
      "Te cuesta calmarte después de enojarte, asustarte o sentirte herido/a.",
    ],
    tips: [
      "Respira profundo durante 4 segundos antes de reaccionar.",
      "Cuenta hasta 10 cuando sientas que pierdes el control.",
      "Cambia el pensamiento negativo por uno más realista: ¿qué evidencia tengo de esto?",
      "Practica la pausa: aléjate 5 minutos antes de responder en caliente.",
    ],
    hasSubSkills: false,
  },
  {
    title: "Empatía",
    conector: "La empatía convierte la convivencia en algo más que coexistir: es la base de las relaciones reales.",
    description:
      "Comprender los sentimientos de los demás, ponerse en su lugar y responder con compasión.",
    color: "hsl(var(--accent))",
    bgColor: "bg-accent/10",
    emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png`,
    señales: [
      "Sientes que nadie te entiende, pero tampoco logras entender a otros.",
      "Juzgas rápidamente sin esperar escuchar el contexto completo.",
      "Te cuesta reconocer cuándo alguien cercano está mal si no te lo dice directamente.",
    ],
    tips: [
      "Ponte en el lugar del otro antes de juzgar.",
      "Pregunta: '¿Cómo te sientes?' y escucha sin interrumpir.",
      "Escucha sin dar consejos inmediatos — a veces solo necesitan ser escuchados.",
      "Antes de responder en un conflicto, repite con tus palabras lo que la otra persona dijo.",
    ],
    hasSubSkills: false,
  },
  {
    title: "Habilidades Sociales",
    conector: "Son las herramientas concretas para poner en práctica todo lo anterior en tus relaciones.",
    description:
      "Competencias específicas para relacionarte con otros: comunicar, escuchar, cooperar y resolver desacuerdos.",
    color: "hsl(var(--secondary))",
    bgColor: "bg-secondary/10",
    emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`,
    señales: [],
    tips: [],
    hasSubSkills: true,
  },
  {
    title: "Motivación",
    conector: "La motivación no es un estado fijo: es una habilidad que se entrena para sostener el esfuerzo cuando la emoción decae.",
    description:
      "Orientar las emociones hacia objetivos personales, mantener la perseverancia y la actitud positiva.",
    color: "hsl(50,88%,65%)",
    bgColor: "bg-[hsl(50,88%,65%)]/20",
    emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`,
    señales: [
      "Empiezas muchos proyectos pero los abandonas cuando se vuelven difíciles.",
      "Necesitas que alguien más te empuje para hacer lo que tú mismo/a quieres.",
      "El aburrimiento o la apatía son tu estado habitual, no una excepción.",
    ],
    tips: [
      "Define una meta clara y divídela en pasos pequeños.",
      "Celebra tus logros, por pequeños que sean.",
      "Rodéate de personas que te inspiren y apoyen.",
      "Define un 'para qué' personal: no solo '¿qué quiero hacer?' sino '¿por qué me importa?'",
    ],
    hasSubSkills: false,
  },
];

const expandido = ref<string | null>(null);

function toggle(title: string) {
  expandido.value = expandido.value === title ? null : title;
}

function hablarConEmilio(habilidad: typeof habilidades[number]) {
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: `Estoy explorando la habilidad de "${habilidad.title}". ${habilidad.conector} ${habilidad.description} ¿Puedes ayudarme a desarrollarla?`,
    },
  }));
}

// GSAP stagger animation for cards
onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const cards = document.querySelectorAll(".habilidad-card");
  if (cards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            cards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
          observer.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );

  const grid = document.querySelector(".habilidades-grid");
  if (grid) observer.observe(grid);
});
</script>

<template>
  <section id="habilidades" class="py-20 lg:py-32 relative bg-background scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgHabilidades"
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
        class="text-center mb-16 max-w-3xl mx-auto"
      >
        <span
          class="inline-block px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5"
        >
          Modelo de Daniel Goleman
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          ¿Qué son las
          <span class="text-primary">habilidades socioemocionales</span>?
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Son las
          <span class="font-semibold text-foreground">competencias que nos hacen humanos</span>:
          entender lo que sentimos, responder con inteligencia en lugar de impulso, construir
          relaciones que de verdad importen y tomar decisiones que nos acerquen a quienes queremos ser.
        </p>
        <p class="mt-5 text-sm text-muted-foreground/80 max-w-prose-tight mx-auto leading-relaxed">
          No son emociones; son las
          <span class="font-semibold text-muted-foreground">cinco herramientas internas</span>
          que transforman lo que sentimos en cómo actuamos. Se entrenan con práctica
          y se conectan entre sí como eslabones que empiezan dentro y se expanden hacia afuera.
        </p>
      </div>

      <!-- Animated Mind Map -->
      <MindMapHabilidades />

      <!-- Cards Grid -->
      <div
        class="habilidades-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        <div
          v-for="(habilidad, index) in habilidades"
          :key="habilidad.title"
          class="group habilidad-card"
        >
          <div
            class="relative bg-surface rounded-2xl p-7 shadow-soft hover:shadow-lift motion-safe:hover:-translate-y-1 transition-[transform,box-shadow] duration-300 h-full border border-transparent hover:border-foreground/[0.04] overflow-hidden"
          >
            <!-- Number badge — quieter, no longer screaming -->
            <span
              class="absolute top-5 right-6 text-4xl font-black select-none leading-none tabular-nums text-foreground/[0.06]"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <!-- Emoji -->
            <div
              :class="[
                'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 motion-safe:group-hover:scale-105 transition-transform duration-300',
                habilidad.bgColor,
              ]"
            >
              <img
                :src="habilidad.emojiImg"
                :alt="habilidad.title"
                class="w-9 h-9 drop-shadow-sm"
              />
            </div>

            <h3
              class="text-lg font-bold text-foreground mb-1.5 transition-colors"
            >
              {{ habilidad.title }}
            </h3>
            <p
              class="text-xs font-semibold mb-2.5 tracking-wide"
              :style="{ color: habilidad.color }"
            >
              {{ habilidad.conector }}
            </p>
            <p class="text-muted-foreground leading-relaxed text-sm">
              {{ habilidad.description }}
            </p>

            <!-- Color rule -->
            <div
              class="mt-5 h-[3px] rounded-full w-10 group-hover:w-full transition-[width] duration-500 ease-out"
              :style="{ backgroundColor: habilidad.color }"
              aria-hidden="true"
            />

            <button
              class="mt-5 flex items-center gap-1.5 text-sm font-semibold transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
              :style="{ color: habilidad.color }"
              :aria-expanded="expandido === habilidad.title"
              @click.stop="toggle(habilidad.title)"
            >
              <span>{{
                expandido === habilidad.title
                  ? "Ocultar"
                  : habilidad.hasSubSkills
                    ? "Ver sub-habilidades"
                    : "Cómo entrenarla"
              }}</span>
              <ChevronDown
                class="w-4 h-4 motion-safe:transition-transform duration-300"
                :class="expandido === habilidad.title ? 'rotate-180' : ''"
              />
            </button>

            <Transition name="tip-slide">
              <div v-if="expandido === habilidad.title" class="mt-3">
                <HabilidadesSociales v-if="habilidad.hasSubSkills" />
                <div v-else class="space-y-4">
                  <div v-if="habilidad.señales.length">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-2">
                      Señales de que falta trabajarla
                    </p>
                    <ul class="space-y-1.5">
                      <li
                        v-for="(s, i) in habilidad.señales"
                        :key="'s' + i"
                        class="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span class="mt-0.5 flex-shrink-0 font-bold text-crisis">›</span>
                        {{ s }}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-2">
                      Cómo desarrollarla
                    </p>
                    <ul class="space-y-1.5">
                      <li
                        v-for="(tip, i) in habilidad.tips"
                        :key="'t' + i"
                        class="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span
                          class="mt-0.5 flex-shrink-0 font-bold"
                          :style="{ color: habilidad.color }"
                          >›</span
                        >
                        {{ tip }}
                      </li>
                    </ul>
                  </div>
                  <button
                    @click.stop="hablarConEmilio(habilidad)"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-foreground text-background shadow-sm motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <BotMessageSquare class="w-4 h-4" />
                    Practicar con Emilio
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Simulador destacado -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
        class="mt-20 max-w-3xl mx-auto"
      >
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <img class="w-3.5 h-3.5 inline-block" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Performing%20arts/3D/performing_arts_3d.png" alt="" />
            Simulador
          </span>
          <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-3" style="text-wrap: balance">
            ¿Cómo responderías en estas situaciones?
          </h3>
          <p class="text-muted-foreground max-w-prose-tight mx-auto leading-relaxed">
            Pon a prueba tu comunicación asertiva con escenarios reales.
            Elige la mejor opción y recibe retroalimentación al instante.
          </p>
        </div>
        <SimuladorConversacion />
      </div>

      <!-- Quote -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{
          opacity: 1,
          transition: { duration: 800, delay: 600 },
        }"
        class="mt-20 text-center max-w-3xl mx-auto relative"
      >
        <figure class="relative rounded-3xl px-8 py-10 sm:px-12 sm:py-14 bg-primary/[0.04] overflow-hidden">
          <span
            class="absolute top-2 left-5 text-8xl text-primary/15 font-serif leading-none select-none"
            aria-hidden="true"
          >&ldquo;</span>
          <blockquote class="text-xl sm:text-2xl text-foreground font-medium italic leading-relaxed relative z-10" style="text-wrap: balance">
            La inteligencia emocional no se opone a la inteligencia académica:
            es un complemento necesario para vivir bien.
          </blockquote>
          <figcaption class="mt-5 text-sm font-semibold text-primary relative z-10">
            — Daniel Goleman
          </figcaption>
        </figure>
      </div>

      <!-- Marco de referencia eliminado -->
    </div>
  </section>
</template>

<style scoped>
.tip-slide-enter-active,
.tip-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease;
  overflow: hidden;
}
.tip-slide-enter-from,
.tip-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}
.tip-slide-enter-to,
.tip-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1200px;
}

@media (prefers-reduced-motion: reduce) {
  .tip-slide-enter-active,
  .tip-slide-leave-active {
    transition: none;
  }
  .tip-slide-enter-from,
  .tip-slide-leave-to {
    opacity: 1;
    transform: none;
    max-height: none;
  }
}
</style>
