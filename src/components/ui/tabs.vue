<script setup lang="ts">
import { ref, provide, watch } from "vue";

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    modelValue?: string;
    class?: string;
  }>(),
  {
    defaultValue: "",
    modelValue: undefined,
  },
);

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const activeTab = ref(props.modelValue ?? props.defaultValue);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== activeTab.value) {
      activeTab.value = val;
    }
  },
);

provide("activeTab", activeTab);
provide("setActiveTab", (val: string) => {
  activeTab.value = val;
  emit("update:modelValue", val);
});
</script>

<template>
  <div :class="props.class"><slot /></div>
</template>
