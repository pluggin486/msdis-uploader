<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    prefix: string
    name: string
    size?: string
    color?: string
  }>(),
  {
    size: 's',
  },
)

const classes: Record<string, string> = {
  s: 'svg-icon-s',
  m: 'svg-icon-m',
  l: 'svg-icon-l',
  xl: 'svg-icon-xl',
}

const symbolId = computed(() => `#icon-${props.prefix}-${props.name}`)

const className = computed(() => {
  const sizeClass = classes[props.size] ? classes[props.size] : classes['s']

  return `svg-icon ${sizeClass}`
})
const style = computed(() => (props.color ? { color: props.color } : {}))
</script>

<template>
  <svg :class="className" :style="style" xmlns="http://www.w3.org/2000/svg">
    <use :href="symbolId" />
  </svg>
</template>
