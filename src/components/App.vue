<script lang="ts" setup>
import { ref } from 'vue'

const file = ref<File>()
</script>

<template>
  <div class="centered">
    <FileUploader v-model="file" label="Label" required />
  </div>
</template>

<style scoped>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
