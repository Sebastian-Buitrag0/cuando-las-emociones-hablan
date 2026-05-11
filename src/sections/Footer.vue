<script setup lang="ts">
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-vue-next";

const quickLinks = [
  { label: "Habilidades", href: "#habilidades" },
  { label: "Emociones", href: "#emociones" },
  { label: "Convivencia", href: "#convivencia" },
  { label: "Familias", href: "#familias" },
  { label: "Docentes", href: "#docentes" },
];

const recursos = [
  { label: "Test de emociones", href: "#emociones" },
  { label: "Ejercicio de respiración", href: "#emociones" },
  { label: "Estrategias de aula", href: "#docentes" },
  { label: "Guía para padres", href: "#familias" },
];

const currentYear = new Date().getFullYear();

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <footer class="bg-foreground text-background">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand block -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-11 h-11 bg-background/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart class="w-5 h-5 text-accent" />
            </div>
            <div>
              <p class="font-bold text-lg leading-snug">
                Cuando las emociones hablan
              </p>
              <p class="text-background/60 text-sm">
                Gimnasio Pedagógico Thomas Paine
              </p>
            </div>
          </div>
          <p class="text-background/70 max-w-md leading-relaxed text-sm">
            Un espacio para reconocer lo que sientes, aprender a regularlo y
            saber a quién acudir cuando lo necesites.
          </p>
        </div>

        <!-- Secciones -->
        <nav aria-label="Secciones">
          <h4 class="font-semibold text-sm uppercase tracking-wider text-background/85 mb-4">
            Secciones
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.href">
              <button
                class="text-background/70 hover:text-background transition-colors text-sm focus-visible:outline-none focus-visible:text-background"
                @click="scrollToSection(link.href)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </nav>

        <!-- Recursos -->
        <nav aria-label="Recursos">
          <h4 class="font-semibold text-sm uppercase tracking-wider text-background/85 mb-4">
            Recursos
          </h4>
          <ul class="space-y-2.5">
            <li v-for="recurso in recursos" :key="recurso.label">
              <button
                class="text-background/70 hover:text-background transition-colors text-sm inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:text-background"
                @click="scrollToSection(recurso.href)"
              >
                {{ recurso.label }}
                <ArrowUpRight class="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Contact -->
      <div class="mt-12 pt-8 border-t border-background/10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MapPin class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-xs text-background/60 uppercase tracking-wider">Ubicación</p>
              <p class="text-background mt-1">Carrera 36 # 20 — 18</p>
              <p class="text-background/75 text-sm">Barrio San Benito</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Phone class="w-5 h-5 text-accent" />
            </div>
            <div>
              <p class="text-xs text-background/60 uppercase tracking-wider">Teléfono</p>
              <a href="tel:+573202823664" class="block text-background hover:text-accent mt-1 transition-colors focus-visible:outline-none focus-visible:text-accent">320 282 3664</a>
              <a href="tel:+573115216508" class="block text-background hover:text-accent transition-colors focus-visible:outline-none focus-visible:text-accent">311 521 6508</a>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Mail class="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p class="text-xs text-background/60 uppercase tracking-wider">Email</p>
              <a href="mailto:g.p.thomaspaine@gmail.com" class="block text-background hover:text-secondary mt-1 transition-colors break-all focus-visible:outline-none focus-visible:text-secondary">g.p.thomaspaine@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-foreground/[0.96] border-t border-background/5 py-5">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
          <p class="text-background/60 text-sm text-center md:text-left">
            © {{ currentYear }} Cuando las emociones hablan · Gimnasio Pedagógico Thomas Paine.
          </p>
          <p class="text-background/60 text-sm flex items-center gap-1.5">
            Hecho con <Heart class="w-3.5 h-3.5 text-accent fill-accent" /> para el bienestar estudiantil
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
