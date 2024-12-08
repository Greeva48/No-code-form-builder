import { FormElementType } from '@/types/form-builder'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ConfigPanelProps {
  element: FormElementType | null
  onUpdateElement: (id: string, updates: Partial<FormElementType>) => void
}

export default function ConfigPanel({ element, onUpdateElement }: ConfigPanelProps) {
  if (!element) {
    return (
      <div className="w-64 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select an element to configure</p>
      </div>
    )
  }

  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Element Settings</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={element.label}
            onChange={(e) => onUpdateElement(element.id, { label: e.target.value })}
          />
        </div>
        {element.type === 'text' && (
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={element.placeholder || ''}
              onChange={(e) => onUpdateElement(element.id, { placeholder: e.target.value })}
            />
          </div>
        )}
        {element.type === 'select' && (
          <div>
            <Label htmlFor="options">Options (comma-separated)</Label>
            <Input
              id="options"
              value={element.options?.join(', ') || ''}
              onChange={(e) => onUpdateElement(element.id, { options: e.target.value.split(',').map(s => s.trim()) })}
            />
          </div>
        )}
      </div>
    </div>
  )
}

