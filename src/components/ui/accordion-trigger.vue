<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const itemValue = inject<string>("accordionItemValue")!;
const openItem = inject<Ref<string>>("accordionOpen")!;
const setOpen = inject<(val: string) => void>("setAccordionOpen")!;

const isOpen = computed(() => openItem.value === itemValue);
</script>

<template>
  <button
    :class="
      cn(
        'flex flex-1 w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left',
        props.class,
      )
    "
    @click="setOpen(itemValue)"
  >
    <slot />
    <ChevronDown
      class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
      :class="{ 'rotate-180': isOpen }"
    />
  </button>
</template>
