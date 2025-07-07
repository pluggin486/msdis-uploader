<script setup lang="ts">
import MsIcon from './MsIcon.vue'
import { type IconProps, IconSize } from './types'

withDefaults(defineProps<IconProps>(), {
  name: 'required-s',
  prefix: 'plex-system',
  size: IconSize.S,
})
</script>

<template>
  <MsIcon :size="size" :prefix="prefix" :name="name" class="plex-required-icon" />
</template>
