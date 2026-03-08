<script setup lang="ts">
import { ref, provide } from "vue";

const props = withDefaults(
  defineProps<{ defaultValue?: string; class?: string }>(),
  {
    defaultValue: "",
  },
);

const activeTab = ref(props.defaultValue);
provide("activeTab", activeTab);
provide("setActiveTab", (val: string) => {
  activeTab.value = val;
});
</script>

<template>
  <div :class="props.class"><slot /></div>
</template>
