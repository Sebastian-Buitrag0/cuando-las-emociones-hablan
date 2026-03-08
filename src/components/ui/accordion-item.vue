<script setup lang="ts">
import { provide } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ value: string; class?: string }>();
provide("accordionItemValue", props.value);
</script>

<template>
  <div :class="cn('border-b', props.class)"><slot /></div>
</template>
