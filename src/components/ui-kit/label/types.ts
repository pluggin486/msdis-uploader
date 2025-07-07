import type { ComponentSize } from '../index'

/** Пропсы компонента лейбла */
export interface LabelProps {
  /** Текст лейбла */
  text: string

  /** Отображается ли иконка обязательности заполнения */
  isRequired?: boolean

  /** Текст тега */
  tag?: string

  /** Размер лейбла */
  size: Extract<keyof typeof ComponentSize, 'MD' | 'SM'>

  /** Текст подсказки (отображается по клику на иконку с подсказкой) */
  tooltipText?: string
}
