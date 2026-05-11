<script setup lang="ts">
import {
  Heart,
  BookOpen,
  AlertTriangle,
  Users,
  Lightbulb,
  MessageSquare,
  Shield,
} from "lucide-vue-next";
import AppCard from "@/components/ui/card.vue";
import AppCardHeader from "@/components/ui/card-header.vue";
import AppCardTitle from "@/components/ui/card-title.vue";
import AppCardContent from "@/components/ui/card-content.vue";
import AppButton from "@/components/ui/button.vue";
import bgFamilias from "@/img/votacion_personero.jpeg";

const recursos = [
  {
    icon: Heart,
    title: "Acompañamiento Emocional",
    description:
      "Guía práctica para apoyar el desarrollo emocional de tu hijo/a en cada etapa.",
    color: "hsl(var(--accent))",
    cuando: [
      "Tu hijo/a llega del colegio visiblemente alterado/a o en silencio inusual.",
      "Después de una discusión o conflicto entre pares que menciona en casa.",
      "Cuando atraviesan cambios importantes: inicio de año, cambio de curso, pubertad.",
    ],
    puntos: [
      "Valida las emociones de tu hijo/a sin juzgar.",
      "Crea espacios seguros para conversar sin distracción de pantallas.",
      "Modela la gestión emocional saludable con tu propio ejemplo.",
      "Establece rutinas que generen seguridad y previsibilidad.",
    ],
  },
  {
    icon: BookOpen,
    title: "Crianza Positiva",
    description:
      "Estrategias basadas en el respeto mutuo y el fortalecimiento de vínculos.",
    color: "hsl(var(--primary))",
    cuando: [
      "Cuando los límites en casa no están funcionando y hay conflicto frecuente.",
      "Si notas que tu hijo/a actúa por miedo al castigo más que por convicción propia.",
      "Al establecer nuevas normas o rutinas familiares que necesitan acuerdo de todos.",
    ],
    puntos: [
      "Usa refuerzos positivos específicos ('hiciste X muy bien' en vez de 'eres bueno').",
      "Establece límites claros y consistentes explicando el por qué.",
      "Practica la disciplina conectiva: primero conexión, luego corrección.",
      "Fomenta la autonomía gradual acorde a su edad.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Señales de Alerta",
    description:
      "Identifica cuándo tu hijo/a puede necesitar apoyo profesional adicional.",
    color: "hsl(var(--secondary))",
    cuando: [
      "Si llevan más de 2 semanas con cambios notorios sin mejora.",
      "Cuando el rendimiento escolar baja abruptamente sin causa académica clara.",
      "Si expresan frases como 'no sirvo para nada' o 'todo estaría mejor sin mí'.",
    ],
    puntos: [
      "Cambios significativos en comportamiento o carácter sin causa obvia.",
      "Aislamiento social persistente o pérdida de amistades cercanas.",
      "Dificultades de sueño o alimentación por más de 2 semanas.",
      "Expresiones frecuentes de tristeza, desesperanza o ansiedad.",
    ],
  },
];

const consejosRapidos = [
  {
    icon: MessageSquare,
    titulo: "Conversaciones Diarias",
    texto:
      "Dedica 10 minutos al día a conversar sin distracciones sobre el día de tu hijo/a.",
  },
  {
    icon: Shield,
    titulo: "Espacio Seguro",
    texto:
      "Asegúrate de que tu hogar sea un lugar donde se puedan expresar emociones sin miedo.",
  },
  {
    icon: Lightbulb,
    titulo: "Modelado",
    texto:
      "Recuerda que los hijos aprenden más de lo que ven que de lo que escuchan.",
  },
];
</script>

<template>
  <section id="familias" class="py-20 lg:py-32 relative bg-surface-warm scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.04]" aria-hidden="true">
      <img
        :src="bgFamilias"
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
          Para padres y madres
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Apoyo para <span class="text-accent">familias</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Recursos y guías para acompañar el desarrollo socioemocional de tus hijos
          desde el hogar.
        </p>
      </div>

      <!-- Resource Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
      >
        <div
          v-for="(recurso, index) in recursos"
          :key="recurso.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: index * 150 },
          }"
        >
          <AppCard
            class="h-full bg-surface rounded-2xl shadow-soft hover:shadow-lift transition-[transform,box-shadow] duration-300 border border-border/60 overflow-hidden group motion-safe:hover:-translate-y-1"
          >
            <AppCardHeader class="pb-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 motion-safe:group-hover:scale-105 transition-transform"
                :style="{ backgroundColor: recurso.color + '15' }"
              >
                <component
                  :is="recurso.icon"
                  class="w-7 h-7"
                  :style="{ color: recurso.color }"
                />
              </div>
              <AppCardTitle class="text-xl font-bold text-foreground">{{
                recurso.title
              }}</AppCardTitle>
            </AppCardHeader>
            <AppCardContent>
              <p class="text-muted-foreground mb-4 leading-relaxed">{{ recurso.description }}</p>
              <div class="rounded-xl p-3.5 mb-4" :style="{ backgroundColor: recurso.color + '10' }">
                <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: recurso.color }">Aplícalo cuando…</p>
                <ul class="space-y-1.5">
                  <li v-for="(c, ci) in recurso.cuando" :key="ci" class="text-xs text-foreground/75 leading-relaxed flex items-start gap-1.5">
                    <span class="mt-0.5 font-bold flex-shrink-0" :style="{ color: recurso.color }">›</span>
                    {{ c }}
                  </li>
                </ul>
              </div>
              <ul class="space-y-2">
                <li
                  v-for="(punto, i) in recurso.puntos"
                  :key="i"
                  class="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <div
                    class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    :style="{ backgroundColor: recurso.color }"
                  />
                  {{ punto }}
                </li>
              </ul>
            </AppCardContent>
          </AppCard>
        </div>
      </div>

      <!-- Quick Tips -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 400 },
        }"
        class="mb-16"
      >
        <h3 class="text-2xl font-bold text-foreground text-center mb-8" style="text-wrap: balance">
          Consejos rápidos
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(consejo, index) in consejosRapidos"
            :key="consejo.titulo"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visibleOnce="{
              opacity: 1,
              scale: 1,
              transition: { duration: 500, delay: 500 + index * 100 },
            }"
            class="bg-surface rounded-2xl p-6 shadow-soft border border-border/50 text-center"
          >
            <component
              :is="consejo.icon"
              class="w-10 h-10 mx-auto mb-4 text-secondary"
            />
            <h4 class="font-semibold text-foreground mb-2">
              {{ consejo.titulo }}
            </h4>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ consejo.texto }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 600 },
        }"
        class="text-center"
      >
        <div class="bg-foreground rounded-3xl p-8 lg:p-12 text-background">
          <Users class="w-12 h-12 mx-auto mb-5 text-background/85" />
          <h3 class="text-2xl lg:text-3xl font-bold mb-4" style="text-wrap: balance">
            ¿Necesitas más apoyo?
          </h3>
          <p class="text-background/80 mb-8 max-w-prose-tight mx-auto leading-relaxed">
            Pedir ayuda es un signo de fortaleza. El colegio cuenta con
            profesionales dispuestos a acompañarte en el proceso de crianza.
          </p>
          <AppButton
            size="lg"
            class="rounded-full px-8 bg-background text-foreground hover:bg-background/90"
          >
            <Heart class="w-5 h-5 mr-2" />
            Contactar al colegio
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
