export interface StoreFileInfo {
  name: string
  size: number
  type: string
  downloadUrl?: string
}

export interface UploaderProps {
  label?: string
  hint?: string
  error?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  editable?: boolean
  isLoading?: boolean
  required?: boolean
  parseValue?: (value: unknown) => StoreFileInfo
}
