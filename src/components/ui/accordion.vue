<script setup lang="ts">
import { ref, provide } from "vue";

withDefaults(
  defineProps<{
    type?: "single" | "multiple";
    collapsible?: boolean;
    class?: string;
  }>(),
  {
    type: "single",
    collapsible: false,
  },
);

const openItem = ref<string>("");
provide("accordionOpen", openItem);
provide("setAccordionOpen", (val: string) => {
  openItem.value = openItem.value === val ? "" : val;
});
</script>

<template>
  <div :class="$props.class"><slot /></div>
</template>
