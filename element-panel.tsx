import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormElement } from '@/types/form-builder'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const elementTypes = [
  { type: 'text', label: 'Text Box' },
  { type: 'textarea', label: 'Text Area' },
  { type: 'select', label: 'Select Box' },
  { type: 'multiselect', label: 'Multiple Dropdown' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'file', label: 'File Upload' },
  { type: 'date', label: 'Date Picker' },
]

interface ElementPanelProps {
  onAddElement: (element: FormElement) => void
}

export default function ElementPanel({ onAddElement }: ElementPanelProps) {
  const [selectedType, setSelectedType] = useState<string>('')
  const [elementLabel, setElementLabel] = useState<string>('')

  const handleAddElement = () => {
    if (selectedType && elementLabel) {
      const newElement: FormElement = {
        id: `element-${Date.now()}`,
        type: selectedType as FormElement['type'],
        label: elementLabel,
        name: elementLabel.toLowerCase().replace(/\s+/g, '_'),
        required: false,
        size: 'medium',
        visible: true,
      }
      onAddElement(newElement)
      setSelectedType('')
      setElementLabel('')
    }
  }

  return (
    <div className="w-64 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Add Form Elements</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="elementType">Element Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger id="elementType">
              <SelectValue placeholder="Select element type" />
            </SelectTrigger>
            <SelectContent>
              {elementTypes.map((element) => (
                <SelectItem key={element.type} value={element.type}>
                  {element.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="elementLabel">Element Label</Label>
          <Input
            id="elementLabel"
            value={elementLabel}
            onChange={(e) => setElementLabel(e.target.value)}
            placeholder="Enter element label"
          />
        </div>
        <Button
          onClick={handleAddElement}
          disabled={!selectedType || !elementLabel}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Element
        </Button>
      </div>
    </div>
  )
}

