<script setup lang="ts">
import type { MsButtonProps } from './types'

defineProps<MsButtonProps>()

defineEmits<{
  click: [MouseEvent]
}>()

defineSlots<{
  icon(slotProps?: Record<string, unknown>): void
}>()
</script>

<template>
  <button
    :disabled="disabled"
    class="ms-button"
    :type="buttonType ?? 'button'"
    @click="$emit('click', $event)"
  >
    <div class="ms-button__content">
      <div class="ms-button__icon" v-if="$slots.icon">
        <slot name="icon" />
      </div>
      <div class="ms-button__label" v-if="type !== 'Icon'">
        {{ label }}
      </div>
    </div>
  </button>
</template>

<style scoped>
.ms-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 0 12px;
  height: 40px;
  min-width: 68px;
  gap: 6px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: inherit;

  &:hover:not(:disabled) {
    background-color: var(--hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.ms-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
}

.ms-button__label {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.006em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ms-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ms-button--with-icon .ms-button__icon {
  margin-right: 8px;
}
</style>
