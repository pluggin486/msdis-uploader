<script setup lang="ts">
import type { SpinnerProps } from './types'
import { computed } from 'vue'

defineOptions({
  name: 'MsSpinner',
})

const props = withDefaults(defineProps<SpinnerProps>(), {
  ui: 'light',
  size: 'm',
  direction: 'horizontal',
  text: '',
})

const labelSize = computed(() => {
  switch (props.size) {
    case 'xl':
      return 'l'
    default:
      return props.size
  }
})
</script>

<template>
  <div class="ms-spinner-vertical">
    <SpinnerIcon :size="size"></SpinnerIcon>
    <MsLabel v-if="text" :text="text" :size="labelSize"></MsLabel>
  </div>
</template>

<style scoped>
.ms-spinner-horizontal {
  @apply flex flex-row gap-2 items-center;
}

.ms-spinner-vertical {
  @apply flex flex-col gap-2 items-center;
}
</style>
