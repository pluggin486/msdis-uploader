<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: string
    text?: string
    tag?: string
    error?: boolean
  }>(),
  {
    type: 'text-sm',
    text: '',
    tag: 'div',
  },
)

const className = computed(() => `typography--${props.type}`)
const textColorClass = computed(() => (props.error ? 'typography--error' : ''))
</script>

<template>
  <component :is="tag" class="typography" :class="[className, textColorClass]" v-bind="$attrs">
    <slot> {{ text }} </slot>
  </component>
</template>

<style scoped>
.typography {
  font-family: inherit;
  margin: 0;
  padding: 0;
}

.typography--heading-xs {
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
}

.typography--heading-sm {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
}

.typography--heading-md {
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
}

.typography--heading-lg {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.typography--heading-xl {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}

.typography--body-xs {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}

.typography--body-sm {
  color: var(--color-text-hint);
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

.typography--body-md {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.typography--body-lg {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
}

.typography--caption {
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.typography--overline {
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.typography--text-sm {
  color: var(--vt-c-text-dark-2);
  font-size: 13px;
  line-height: 1.38;
  font-weight: 400;
  letter-spacing: 0.16px;
}

.typography--error {
  color: #ef4444;
}
</style>
