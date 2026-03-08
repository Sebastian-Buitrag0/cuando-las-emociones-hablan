<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ value: string; class?: string }>();

const activeTab = inject<Ref<string>>("activeTab")!;
const setActiveTab = inject<(val: string) => void>("setActiveTab")!;

const isActive = computed(() => activeTab.value === props.value);
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-white text-[#2D3748] shadow'
          : 'text-[#718096] hover:text-[#2D3748]',
        props.class,
      )
    "
    @click="setActiveTab(props.value)"
  >
    <slot />
  </button>
</template>
