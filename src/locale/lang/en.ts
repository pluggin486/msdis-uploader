import type { LocaleConfig } from '../locale-config'

const locale: LocaleConfig = {
  locale: 'en',
  uploadFile: {
    chooseFile: 'Choose file',
    cancel: 'Cancel',
    delete: 'Delete',
    noFileSelected: 'No file selected',
    uploading: 'Uploading...',
  },

  fileSize: {
    invalid: 'Invalid file size',
    format: '{size} {unit}',
    units: {
      bytes: 'bytes',
      kb: 'KB',
      mb: 'MB',
      gb: 'GB',
      tb: 'TB',
    },
  },
}

export default locale
