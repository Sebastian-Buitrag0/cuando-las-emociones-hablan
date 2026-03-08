<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  variant?: "default" | "secondary" | "outline" | "destructive";
  class?: string;
  style?: string | Record<string, string>;
}>();

const classes = computed(() =>
  cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
    {
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80":
        props.variant === "default" || !props.variant,
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80":
        props.variant === "secondary",
      "text-foreground": props.variant === "outline",
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80":
        props.variant === "destructive",
    },
    props.class,
  ),
);
</script>

<template>
  <div :class="classes" :style="props.style"><slot /></div>
</template>
