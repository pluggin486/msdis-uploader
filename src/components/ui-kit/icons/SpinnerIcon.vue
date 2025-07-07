<script setup lang="ts">
defineProps<{
  size: string
  prefix: string
  iconName: string
}>()
</script>
<template>
  <PlexIcon :size="size" :prefix="prefix" :name="iconName" />
</template>
