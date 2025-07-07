import { ComponentSize } from '../index'

export const typographyType = [
  'heading-4xs',
  'heading-3xs',
  'heading-2xs',
  'heading-xs',
  'heading-s',
  'heading-m',
  'heading-l',
  'heading-xl',
  'heading-2xl',
  'heading-3xl',
]

export enum SizeClasses {
  S = 'ms-btn-s',
  M = 'ms-btn-m',
  L = 'ms-btn-l',
  X = 'ms-btn-xl',
  XX = 'ms-btn-2xl',
}

/** Тип компонента Button */
export type ButtonType = 'Primary' | 'Ghost' | 'Outline' | 'Dashed' | 'Icon'

/** Пропсы компонента Button */
export interface MsButtonProps {
  /** Тип кнопки */
  type: ButtonType

  buttonType?: 'submit' | 'reset' | 'button'

  /** Текст кнопки  */
  label?: string

  /** Выключена ли кнопка */
  disabled?: boolean

  /** Размер кнопки */
  size: Extract<keyof typeof ComponentSize, 'SM' | 'MD' | 'XL' | 'XXL'>
}
