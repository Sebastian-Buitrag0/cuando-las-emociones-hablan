<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    variant?: "default" | "outline" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
    class?: string;
  }>(),
  {
    variant: "default",
    size: "default",
  },
);

const emit = defineEmits<{ click: [e: MouseEvent] }>();

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-[#5B8DEE] text-white shadow hover:bg-[#4a7bd9]":
        props.variant === "default",
      "border-2 border-current bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground":
        props.variant === "outline",
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80":
        props.variant === "secondary",
      "hover:bg-accent hover:text-accent-foreground": props.variant === "ghost",
    },
    {
      "h-9 px-4 py-2": props.size === "default",
      "h-8 rounded-md px-3 text-xs": props.size === "sm",
      "h-10 rounded-md px-8 text-base": props.size === "lg",
      "h-9 w-9": props.size === "icon",
    },
    props.class,
  ),
);
</script>

<template>
  <button :class="classes" @click="emit('click', $event)">
    <slot />
  </button>
</template>
