<script setup lang="ts">
import { Heart, Mail, Phone, MapPin, ExternalLink } from "lucide-vue-next";

const quickLinks = [
  { label: "Habilidades", href: "#habilidades" },
  { label: "Emociones", href: "#emociones" },
  { label: "Convivencia", href: "#convivencia" },
  { label: "Familias", href: "#familias" },
  { label: "Docentes", href: "#docentes" },
];

const recursos = [
  { label: "Test de Emociones", href: "#emociones" },
  { label: "Ejercicio de Respiración", href: "#emociones" },
  { label: "Estrategias de Aula", href: "#docentes" },
  { label: "Guía para Padres", href: "#familias" },
];

const currentYear = new Date().getFullYear();

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <footer class="bg-[#2D3748] text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Logo & Description -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 bg-gradient-to-br from-[#BC6C8A] to-[#F4A259] rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <Heart class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-bold text-xl leading-snug">
                Cuando las emociones hablan
              </h3>
              <p class="text-white/60 text-sm">
                Gimnasio Pedagógico Thomas Paine
              </p>
            </div>
          </div>
          <p class="text-white/70 mb-6 max-w-md leading-relaxed">
            Un espacio digital para escuchar, comprender y transformar las
            emociones en herramientas de crecimiento personal y convivencia
            escolar.
          </p>
          <div class="flex items-center gap-4">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5B8DEE] transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#BC6C8A] transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-lg mb-4">Secciones</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.href">
              <button
                class="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                @click="scrollToSection(link.href)"
              >
                <ExternalLink class="w-4 h-4" />
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="font-semibold text-lg mb-4">Recursos</h4>
          <ul class="space-y-3">
            <li v-for="recurso in recursos" :key="recurso.label">
              <button
                class="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                @click="scrollToSection(recurso.href)"
              >
                <ExternalLink class="w-4 h-4" />
                {{ recurso.label }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Contact -->
      <div class="mt-12 pt-8 border-t border-white/10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-[#5B8DEE]/20 flex items-center justify-center"
            >
              <MapPin class="w-5 h-5 text-[#5B8DEE]" />
            </div>
            <div>
              <p class="text-sm text-white/60">Ubicación</p>
              <p class="text-white">Gimnasio Pedagógico Thomas Paine</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-[#BC6C8A]/20 flex items-center justify-center"
            >
              <Phone class="w-5 h-5 text-[#BC6C8A]" />
            </div>
            <div>
              <p class="text-sm text-white/60">Teléfono</p>
              <p class="text-white">Contacto institucional</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-[#F4A259]/20 flex items-center justify-center"
            >
              <Mail class="w-5 h-5 text-[#F4A259]" />
            </div>
            <div>
              <p class="text-sm text-white/60">Email</p>
              <p class="text-white">contacto@gptp.edu.co</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-[#1a202c] py-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-white/60 text-sm text-center md:text-left">
            © {{ currentYear }} Cuando las emociones hablan — Gimnasio
            Pedagógico Thomas Paine.
          </p>
          <p class="text-white/60 text-sm flex items-center gap-1">
            Hecho con <Heart class="w-4 h-4 text-[#BC6C8A] mx-1" /> para el
            bienestar estudiantil
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
