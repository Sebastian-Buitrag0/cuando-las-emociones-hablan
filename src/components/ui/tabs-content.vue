<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ value: string; class?: string }>();

const activeTab = inject<Ref<string>>("activeTab")!;

const isActive = computed(() => activeTab.value === props.value);
</script>

<template>
  <div v-show="isActive" :class="cn('mt-2', props.class)">
    <slot />
  </div>
</template>
