<script setup lang="ts">
import type { StoreFileInfo, UploaderProps } from './types'
import { computed, ref, useTemplateRef } from 'vue'
import { ComponentSize } from '../index'
import MsButton from '../button/msButton.vue'
import MsLabel from '../label/msLabel.vue'
import MsSpinner from '../spinner/MsSpinner.vue'
import MsTypogrphy from '../typography/msTypogrphy.vue'
import { useI18n } from 'vue-i18n'
import { usingProgress } from '@/utils/progress'

defineOptions({
  name: 'FileUploader',
})

const props = withDefaults(defineProps<UploaderProps>(), {
  label: 'Label',
  hint: 'Hint text',
  editable: true,
  showUploadButton: true,
})

const fileInput = useTemplateRef('fileInput')

const modelFile = defineModel<StoreFileInfo | File | null>()

const { t } = useI18n()

const isLoading = ref(false)
const mockDownload = () => new Promise((resolve) => setTimeout(resolve, 1000))

const downloadFile = async () => {
  const storeFile = fileInfo.value as StoreFileInfo

  if (modelFile.value instanceof File) {
    const url = URL.createObjectURL(modelFile.value)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', fileInfo.value?.name || 'file')
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
  } else if (storeFile?.downloadUrl) {
    window.open(storeFile?.downloadUrl)
  }
}

const indicator = computed({
  get: () => props.isLoading ?? isLoading.value,
  set: (value) => !props.isLoading && (isLoading.value = value),
})

const downloadFileWithProgress = usingProgress(indicator, mockDownload)

const selectFile = (file: File | undefined | null) => {
  modelFile.value = file
}

const inputAttributes = {
  type: 'file',
  accept: props.accept,
  disabled: props.disabled,
  multiple: props.multiple,
  onChange: (e: Event) => {
    const fileInput = e.target as HTMLFormElement
    const file = fileInput.files[0] as File | undefined | null

    fileInput.value = null

    if (file) {
      selectFile(file)
    }
  },
}

const fileInfo = computed(() => {
  if (!modelFile.value) {
    return undefined
  }

  if (props.parseValue && !(modelFile.value instanceof File)) {
    return props.parseValue(modelFile.value)
  }

  return modelFile.value
})

const buttonLabelText = computed(() => {
  if (isLoading.value) {
    return t('uploadFile.cancel')
  }

  return fileInfo.value ? t('uploadFile.delete') : t('uploadFile.chooseFile')
})

const clearValue = () => {
  selectFile(null)
  isLoading.value = false
}

const chooseFile = async () => {
  fileInput.value?.click()
}

const handler = () => (!modelFile.value ? chooseFile() : clearValue())

const eventMap = {
  onClick: handler,
  'onKeydown.enter': handler,
}

defineExpose({ fileInput, downloadFile, downloadFileWithProgress })
</script>

<template>
  <div class="file-uploader">
    <MsLabel class="file-uploader__label" :size="ComponentSize.MD" :text="label" />

    <div class="file-uploader__container">
      <MsButton
        class="file-uploader__button"
        :label="buttonLabelText"
        :size="ComponentSize.MD"
        :type="editable ? 'Outline' : 'Primary'"
        :disabled
        v-bind="eventMap"
      />

      <MsSpinner v-if="isLoading" class="file-uploader__spinner" />

      <MsTypogrphy
        tag="span"
        class="file-uploader__filename"
        :class="{ 'file-uploader__filename--select': !!fileInfo?.name }"
        :text="fileInfo?.name ?? t('uploadFile.noFileSelected')"
      />
      <input ref="fileInput" class="file-uploader__input" v-bind="inputAttributes" />
    </div>

    <MsTypogrphy tag="span" class="file-uploader__hint" :text="hint" />
  </div>
</template>

<style scoped>
.file-uploader {
  display: flex;
  flex-direction: column;
}

.file-uploader__container {
  padding: 12px 0 8px;
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  align-items: center;
  justify-content: start;
}

.file-uploader__button {
  position: relative;
}

.file-uploader__spinner {
  margin-left: 16px;
}

.file-uploader__filename {
  color: var(--color-text-not-active);
}

.file-uploader__filename--select {
  color: var(--color-text-hint);
}

.file-uploader__hint {
  color: var(--color-text-hint);
  font-size: 0.875rem;
}

.file-uploader__input {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
</style>
