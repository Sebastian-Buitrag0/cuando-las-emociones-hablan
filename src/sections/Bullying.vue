<script setup lang="ts">
import { ref } from "vue";
import { LifeBuoy, Shield, Phone, BotMessageSquare, CheckCircle2, Circle } from "lucide-vue-next";

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const tipos = [
  {
    titulo: "Físico",
    descripcion: "Golpes, empujones, daño a pertenencias. El más visible pero no el único.",
    emojiImg: `${EMOJI_BASE}/Oncoming%20fist/3D/oncoming_fist_3d.png`,
    color: "#F6AD55",
  },
  {
    titulo: "Verbal",
    descripcion: "Insultos, apodos hirientes, burlas repetidas. Deja marcas aunque no se vean.",
    emojiImg: `${EMOJI_BASE}/Speaking%20head/3D/speaking_head_3d.png`,
    color: "#B794F4",
  },
  {
    titulo: "Social",
    descripcion: "Exclusión deliberada, rumores, manipulación de grupos para aislar.",
    emojiImg: `${EMOJI_BASE}/Broken%20heart/3D/broken_heart_3d.png`,
    color: "#90CDF4",
  },
  {
    titulo: "Ciberbullying",
    descripcion: "Acoso por redes, mensajes o fotos. No termina al salir del colegio.",
    emojiImg: `${EMOJI_BASE}/Laptop/3D/laptop_3d.png`,
    color: "#FC8181",
  },
];

const señales = [
  "¿Le cuesta encontrar razones para ir al colegio sin poder explicar exactamente por qué?",
  "¿Sus pertenencias aparecen dañadas o perdidas con más frecuencia de lo normal?",
  "¿Cambia de ánimo drásticamente antes o después de estar en ciertos grupos o espacios?",
  "¿Evita hablar de lo que pasa en el colegio o en redes sociales?",
  "¿Tiene cambios bruscos en sueño o apetito sin causa física conocida?",
  "¿Dejó de usar las redes sociales de forma repentina o parece angustiado/a al verlas?",
];

const pasos = [
  "No responder con agresión — es lo que el agresor busca para justificarse.",
  "Alejarse físicamente si es presencial; bloquear y reportar si es digital.",
  "Guardar evidencia desde el primer momento: capturas, mensajes, fechas.",
  "Hablar hoy con alguien de confianza: orientador, docente, familiar cercano.",
  "Recordar: pedir ayuda es un acto de fuerza, no de debilidad.",
];

const pasosChecked = ref<boolean[]>(pasos.map(() => false));

function togglePaso(i: number) {
  pasosChecked.value[i] = !pasosChecked.value[i];
}

function hablarConEmilio() {
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: "Necesito orientación sobre bullying o acoso escolar. Quiero entender cómo reconocerlo y qué pasos concretos puede dar una persona para manejarlo o buscar ayuda.",
    },
  }));
}
</script>

<template>
  <section id="bullying" class="py-20 lg:py-32 relative bg-background scroll-mt-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-16 max-w-3xl mx-auto"
      >
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-crisis/10 mb-5">
          <LifeBuoy class="w-7 h-7 text-crisis" />
        </div>
        <span class="inline-block px-3.5 py-1.5 rounded-full bg-crisis/10 text-crisis text-xs font-semibold uppercase tracking-wider mb-5">
          Protocolo de convivencia
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Bullying: reconocerlo
          <span class="text-crisis">y actuar</span>
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          El acoso escolar no es un conflicto normal entre iguales. Es una dinámica de
          <span class="font-semibold text-foreground">poder repetida</span> que afecta el bienestar.
          Reconocerlo es el primer paso para romperlo.
        </p>
      </div>

      <!-- 4 tipos de bullying -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
        class="mb-20"
      >
        <h3 class="text-xl font-bold text-foreground text-center mb-8">¿Qué formas puede tomar?</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          <div
            v-for="tipo in tipos"
            :key="tipo.titulo"
            class="rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-soft"
          >
            <div
              class="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              :style="{ backgroundColor: tipo.color + '20' }"
            >
              <img :src="tipo.emojiImg" :alt="tipo.titulo" class="w-9 h-9 drop-shadow-sm" />
            </div>
            <h4 class="font-bold text-foreground mb-2" :style="{ color: tipo.color }">
              {{ tipo.titulo }}
            </h4>
            <p class="text-sm text-muted-foreground leading-relaxed">
              {{ tipo.descripcion }}
            </p>
          </div>
        </div>
      </div>

      <!-- Señales (preguntas reflexivas) -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }"
        class="mb-20 max-w-4xl mx-auto"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 class="text-xl font-bold text-foreground mb-2">¿Cómo reconocerlo?</h3>
            <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
              Estas preguntas ayudan a identificar si alguien en el entorno puede estar viviendo acoso.
              No se necesita que estén todas presentes.
            </p>
            <ul class="space-y-3">
              <li
                v-for="s in señales"
                :key="s"
                class="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/85 px-4 py-3"
              >
                <Shield class="w-4 h-4 text-crisis flex-shrink-0 mt-0.5" />
                <span class="text-sm text-foreground/85 leading-relaxed">{{ s }}</span>
              </li>
            </ul>
          </div>

          <!-- Dato de contexto -->
          <div class="rounded-2xl bg-crisis/[0.06] border border-crisis/15 p-6">
            <p class="text-xs font-bold uppercase tracking-wider text-crisis mb-4">Contexto</p>
            <p class="text-sm text-foreground/80 leading-relaxed mb-4">
              En Colombia la <span class="font-semibold">Ley 1620 de 2013</span> establece el Sistema
              Nacional de Convivencia Escolar. Todos los colegios están obligados a tener un protocolo
              de atención al bullying.
            </p>
            <p class="text-sm text-foreground/80 leading-relaxed mb-4">
              El acoso <span class="font-semibold">no desaparece solo</span>. Tiende a escalar sin
              intervención. La ruta de atención siempre empieza con un adulto de confianza.
            </p>
            <p class="text-sm text-foreground/80 leading-relaxed">
              Ser testigo y no decir nada también es una forma de sostener el acoso.
              <span class="font-semibold text-crisis">Hablar es lo correcto.</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Pasos a seguir (checklist) -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }"
        class="mb-20 max-w-2xl mx-auto"
      >
        <h3 class="text-xl font-bold text-foreground mb-2 text-center">¿Qué puede hacer una persona?</h3>
        <p class="text-sm text-muted-foreground text-center mb-7">
          Marca cada paso a medida que lo vayas tomando.
        </p>
        <ul class="space-y-3">
          <li
            v-for="(paso, i) in pasos"
            :key="i"
            class="flex items-start gap-3 rounded-2xl border px-5 py-4 cursor-pointer transition-all duration-200"
            :class="pasosChecked[i]
              ? 'border-crisis/30 bg-crisis/[0.06]'
              : 'border-border/60 bg-surface hover:border-crisis/30'"
            @click="togglePaso(i)"
          >
            <component
              :is="pasosChecked[i] ? CheckCircle2 : Circle"
              class="w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-200"
              :class="pasosChecked[i] ? 'text-crisis' : 'text-muted-foreground/50'"
            />
            <span
              class="text-sm leading-relaxed transition-colors duration-200"
              :class="pasosChecked[i] ? 'text-foreground line-through text-muted-foreground' : 'text-foreground'"
            >{{ paso }}</span>
          </li>
        </ul>
      </div>

      <!-- Líneas de ayuda -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 250 } }"
        class="mb-16 max-w-2xl mx-auto"
      >
        <h3 class="text-xl font-bold text-foreground mb-6 text-center">Líneas de ayuda</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="tel:106"
            class="flex items-center gap-4 rounded-2xl border border-crisis/20 bg-crisis/[0.06] px-5 py-4 hover:bg-crisis/[0.10] transition-colors duration-200 group"
          >
            <div class="w-12 h-12 rounded-xl bg-crisis/15 flex items-center justify-center flex-shrink-0">
              <Phone class="w-5 h-5 text-crisis" />
            </div>
            <div>
              <p class="font-bold text-crisis text-lg leading-none mb-0.5">106</p>
              <p class="text-sm text-foreground font-semibold">Línea de Apoyo</p>
              <p class="text-xs text-muted-foreground">Bogotá · 24 horas</p>
            </div>
          </a>

          <a
            href="tel:141"
            class="flex items-center gap-4 rounded-2xl border border-calm/30 bg-calm/[0.06] px-5 py-4 hover:bg-calm/[0.10] transition-colors duration-200 group"
          >
            <div class="w-12 h-12 rounded-xl bg-calm/20 flex items-center justify-center flex-shrink-0">
              <Phone class="w-5 h-5 text-calm" />
            </div>
            <div>
              <p class="font-bold text-calm text-lg leading-none mb-0.5">141</p>
              <p class="text-sm text-foreground font-semibold">ICBF</p>
              <p class="text-xs text-muted-foreground">Nacional · gratuita · 24 horas</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Emilio CTA -->
      <div class="text-center">
        <button
          @click="hablarConEmilio"
          class="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <BotMessageSquare class="w-4 h-4" />
          Hablar con Emilio sobre este tema
        </button>
        <p class="mt-3 text-xs text-muted-foreground">
          Emilio puede orientarte con calma y sin juicios.
        </p>
      </div>

    </div>
  </section>
</template>
