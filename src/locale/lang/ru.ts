import type { LocaleConfig } from '../locale-config'

const locale: LocaleConfig = {
  locale: 'ru',
  uploadFile: {
    chooseFile: 'Выбрать файл',
    cancel: 'Отменить',
    delete: 'Удалить',
    noFileSelected: 'Файл не выбран',
  },

  fileSize: {
    invalid: 'Некорректный размер файла',
    format: '{size} {unit}',
  },
}

export default locale
