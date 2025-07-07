<script setup lang="ts">
import type { LabelProps } from './types'
import { computed } from 'vue'

const props = defineProps<LabelProps>()

defineEmits<{
  'icon-click': []
}>()

const textLastWord = computed(() => {
  const splittedText = props.text.split(' ')
  return splittedText.length > 1 ? splittedText[splittedText.length - 1] : undefined
})

const textToLastWord = computed(() => {
  const splittedText = props.text.split(' ')
  return splittedText.length > 1
    ? splittedText.slice(0, splittedText.length - 1).join(' ')
    : undefined
})

const sizeClass = computed(() => ({
  'label__text--md': props.size === 'MD',
  'label__text--sm': props.size === 'SM',
}))
</script>

<template>
  <div class="label">
    <label :class="['label__text', sizeClass]">
      {{ textToLastWord ?? text }}
      <span>
        {{ textLastWord ?? '' }}
        <span v-if="isRequired" class="label__required">✱</span>
      </span>
    </label>
    <div v-if="tag" class="label__tag">{{ tag }}</div>
  </div>
</template>

<style scoped>
.label {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label__text {
  color: #111827;
}

.label__text--md {
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
}

.label__text--sm {
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
}

.label__required {
  color: #ef4444;
  margin-left: 4px;
}

.label__tag {
  color: #3b82f6;
  padding-left: 2px;
  align-self: flex-start;
  font-size: 11px;
  line-height: 16px;
}
</style>
