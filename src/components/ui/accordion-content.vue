<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const itemValue = inject<string>("accordionItemValue")!;
const openItem = inject<Ref<string>>("accordionOpen")!;

const isOpen = computed(() => openItem.value === itemValue);

function collapseContent(el: Element) {
  const htmlEl = el as HTMLElement;
  htmlEl.style.height = `${htmlEl.scrollHeight}px`;
  globalThis.requestAnimationFrame(() => {
    htmlEl.style.height = "0";
  });
}
</script>

<template>
  <Transition
    name="accordion"
    @enter="
      (el: Element) => {
        (el as HTMLElement).style.height = el.scrollHeight + 'px';
      }
    "
    @after-enter="
      (el: Element) => {
        (el as HTMLElement).style.height = 'auto';
      }
    "
    @leave="
      (el: Element) => {
        collapseContent(el);
      }
    "
  >
    <div v-if="isOpen" :class="cn('overflow-hidden text-sm', props.class)">
      <div class="pb-4 pt-0">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.2s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
}
</style>
