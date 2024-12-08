export interface FormElement {
  id: string
  type: 'label' | 'text' | 'select' | 'multiselect' | 'textarea' | 'file' | 'date' | 'number' | 'checkbox'
  label: string
  name: string
  placeholder?: string
  required: boolean
  size: 'small' | 'medium' | 'large' | 'custom'
  customWidth?: number
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  options?: string[]
  validation?: string
  conditionalLogic?: {
    dependsOn: string
    condition: 'equals' | 'notEquals' | 'contains' | 'notContains'
    value: string
  }
  visible: boolean
}

export interface FormMetadata {
  name: string
  description: string
  layout: 'single-column' | 'two-column'
}

