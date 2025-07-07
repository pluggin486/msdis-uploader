import { useI18n } from 'vue-i18n'

export const UNIT_SYSTEMS = ['metric', 'binary'] as const
export type UnitSystem = (typeof UNIT_SYSTEMS)[number]

export const UNITS: Record<UnitSystem, readonly string[]> = {
  metric: ['bytes', 'kB', 'MB', 'GB', 'TB'],
  binary: ['bytes', 'KiB', 'MiB', 'GiB', 'TiB'],
} as const

export const ERROR_MESSAGE = 'Invalid file size'

export const UNIT_TRANSLATION_KEYS: Record<string, string> = {
  B: 'bytes',
  kB: 'kilobyte',
  MB: 'megabyte',
  GB: 'gigabyte',
  TB: 'terabyte',
  KiB: 'kibibyte',
  MiB: 'mebibyte',
  GiB: 'gibibyte',
  TiB: 'tebibyte',
}

/**
 * Форматирует размер файла в удобочитаемые единицы измерения
 *
 * @param bytes - Размер в байтах
 * @param format - Система единиц (1000 или 1024)
 * @returns Отформатированная строка с единицей измерения
 */
export default function formatFileSize(bytes: number, format?: string): string {
  const system: UnitSystem =
    format && UNIT_SYSTEMS.includes(format as UnitSystem) ? (format as UnitSystem) : 'metric'

  if (!Number.isFinite(bytes)) return ERROR_MESSAGE

  const absBytes = Math.abs(bytes)
  if (absBytes === 0) return '0 bytes'

  const base = format === 'metric' ? 1000 : 1024
  const units = UNITS[system]

  const exponent = Math.min(Math.floor(Math.log(absBytes) / Math.log(base)), units.length - 1)

  return `${(absBytes / base ** exponent).toFixed(2)} ${units[exponent]}`
}

/**
 * Composable для форматирования размера файла с поддержкой `i18n`
 */
export function useFileSize() {
  const { t, te } = useI18n()

  /**
   * Форматирует размер файла с учетом локализации
   *
   * @param bytes - Размер в байтах
   * @param system - Система единиц
   * @returns Локализованная строка с размером
   */
  const format = (bytes: number, system: UnitSystem = 'metric'): string => {
    const result = formatFileSize(bytes, system)

    if (result === ERROR_MESSAGE) {
      return te('fileSize.invalid') ? t('fileSize.invalid') : result
    }

    const [value, unit] = result.split(' ')
    const translationKey = `fileSizeUnits.${UNIT_TRANSLATION_KEYS[unit]}`

    return te(translationKey)
      ? t('fileSize.format', { size: value, unit: t(translationKey) })
      : result
  }

  return {
    format, // Локализованная версия
    formatRaw: formatFileSize, // Оригинальная функция
  }
}
