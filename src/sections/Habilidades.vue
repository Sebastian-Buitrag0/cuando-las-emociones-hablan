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
    color: "#5B8DEE",
    bgColor: "bg-[#5B8DEE]/10",
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
    color: "#81E6D9",
    bgColor: "bg-[#81E6D9]/20",
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
    color: "#BC6C8A",
    bgColor: "bg-[#BC6C8A]/10",
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
    color: "#F4A259",
    bgColor: "bg-[#F4A259]/10",
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
    color: "#F6E05E",
    bgColor: "bg-[#F6E05E]/20",
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
  <section id="habilidades" class="py-20 lg:py-32 relative bg-[#FEFBF7] scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgHabilidades"
        alt="Trabajo en equipo en el piso"
        class="w-full h-full object-cover grayscale"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-16"
      >
        <span
          class="inline-block px-4 py-2 rounded-full bg-[#5B8DEE]/10 text-[#5B8DEE] text-sm font-semibold mb-4"
        >
          Basado en el modelo de Daniel Goleman
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
          style="text-wrap: balance"
        >
          ¿Qué son las&nbsp;
          <span
            class="bg-gradient-to-r from-[#5B8DEE] to-[#BC6C8A] bg-clip-text text-transparent"
          >
            Habilidades Socioemocionales?
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Son las <span class="font-semibold text-[#2D3748]">competencias que nos hacen humanos</span>:
          la capacidad de entender lo que sentimos, responder con inteligencia en lugar de impulso,
          construir relaciones que de verdad importen y tomar decisiones que nos acerquen a quienes queremos ser.
        </p>
        <p class="mt-4 text-sm text-[#A0AEC0] max-w-xl mx-auto">
          No son emociones en sí mismas. Son las <span class="font-semibold text-[#718096]">cinco herramientas internas</span>
          que transforman lo que sentimos en cómo actuamos.
          Se entrenan con práctica, se fortalecen con cada decisión consciente y se conectan entre sí
          como eslabones de una cadena: comienzan en tu interior y se expanden hacia el mundo.
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
            class="bg-white rounded-2xl p-7 shadow-soft hover:shadow-hover transition-[transform,box-shadow] duration-300 h-full border border-transparent hover:border-[#5B8DEE]/20 relative overflow-hidden"
            :class="{ 'motion-safe:hover:-translate-y-2': true }"
          >
            <!-- Number badge -->
            <span
              class="absolute top-4 right-4 text-3xl font-black text-[#2D3748]/[0.04] select-none leading-none"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <!-- Emoji 3D -->
            <div
              :class="[
                'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300',
                habilidad.bgColor,
              ]"
            >
              <img
                :src="habilidad.emojiImg"
                :alt="habilidad.title"
                class="w-10 h-10 drop-shadow-sm"
              />
            </div>

            <!-- Content -->
            <h3
              class="text-lg font-bold text-[#2D3748] mb-1 group-hover:text-[#5B8DEE] transition-colors"
            >
              {{ habilidad.title }}
            </h3>
            <p class="text-xs font-semibold mb-2" :style="{ color: habilidad.color }">
              {{ habilidad.conector }}
            </p>
            <p class="text-[#718096] leading-relaxed text-sm">
              {{ habilidad.description }}
            </p>

            <!-- Visual indicator -->
            <div
              class="mt-4 h-1 rounded-full w-10 group-hover:w-full transition-[width] duration-500"
              :style="{ backgroundColor: habilidad.color }"
            />

            <!-- Tips toggle -->
            <button
              class="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B8DEE]/50"
              :style="{ color: habilidad.color }"
              @click.stop="toggle(habilidad.title)"
            >
              <span>{{
                expandido === habilidad.title
                  ? "Ocultar"
                  : habilidad.hasSubSkills
                    ? "Ver sub-habilidades"
                    : "Tips prácticos"
              }}</span>
              <ChevronDown
                class="w-4 h-4 transition-transform duration-300"
                :class="expandido === habilidad.title ? 'rotate-180' : ''"
              />
            </button>

            <Transition name="tip-slide">
              <div v-if="expandido === habilidad.title" class="mt-3">
                <HabilidadesSociales v-if="habilidad.hasSubSkills" />
                <div v-else class="space-y-4">
                  <!-- Señales -->
                  <div v-if="habilidad.señales.length">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] mb-2">
                      Señales de que me falta trabajarla
                    </p>
                    <ul class="space-y-1.5">
                      <li
                        v-for="(s, i) in habilidad.señales"
                        :key="'s' + i"
                        class="flex items-start gap-2 text-sm text-[#4A5568]"
                      >
                        <span class="mt-0.5 flex-shrink-0 text-[#C05621] font-bold">›</span>
                        {{ s }}
                      </li>
                    </ul>
                  </div>
                  <!-- Tips -->
                  <div>
                    <p class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] mb-2">
                      Cómo desarrollarla
                    </p>
                    <ul class="space-y-1.5">
                      <li
                        v-for="(tip, i) in habilidad.tips"
                        :key="'t' + i"
                        class="flex items-start gap-2 text-sm text-[#4A5568]"
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
                  <!-- Emilio CTA -->
                  <button
                    @click.stop="hablarConEmilio(habilidad)"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B8DEE]/10 text-[#5B8DEE] text-sm font-semibold mb-4">
            <img class="w-4 h-4 inline-block" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Performing%20arts/3D/performing_arts_3d.png" alt="Simulador" />
            Practica con el simulador
          </span>
          <h3 class="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-3" style="text-wrap: balance">
            ¿Cómo responderías en estas situaciones?
          </h3>
          <p class="text-[#718096] max-w-lg mx-auto">
            Pon a prueba tu comunicación asertiva con escenarios reales. Elige la mejor opción y recibe retroalimentación instantánea.
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
        <div class="bg-[#5B8DEE]/[0.04] rounded-3xl px-8 py-10 sm:px-12 sm:py-14 relative overflow-hidden">
          <span class="absolute top-2 left-4 text-8xl text-[#5B8DEE]/10 font-serif leading-none select-none" aria-hidden="true">"</span>
          <p class="text-xl sm:text-2xl text-[#2D3748] font-medium italic leading-relaxed relative z-10" style="text-wrap: balance">
            La inteligencia emocional no se opone a la inteligencia académica, sino que es un complemento necesario para el éxito en la vida.
          </p>
          <p class="mt-4 text-sm font-semibold text-[#5B8DEE] relative z-10">
            — Daniel Goleman
          </p>
        </div>
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
