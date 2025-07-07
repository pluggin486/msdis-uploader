export type SpinnerSize = 's' | 'm' | 'l' | 'xl'
export type SpinnerDirection = 'vertical' | 'horizontal'
export type SpinnerUi = 'light' | 'dark' | 'primary' | 'secondary'

export interface SpinnerProps {
  size?: SpinnerSize
  text?: string | null
  direction?: SpinnerDirection
  ui?: string
}
