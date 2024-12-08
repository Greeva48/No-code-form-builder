import { useDrop } from 'react-dnd'
import { FormElement, FormMetadata } from '@/types/form-builder'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import FormElementComponent from './form-element-component'

interface FormAreaProps {
  elements: FormElement[]
  selectedElements: FormElement[]
  onToggleElementSelection: (element: FormElement, isMultiSelect: boolean) => void
  onRemoveElements: (ids: string[]) => void
  onMoveElements: (draggedIds: string[], targetIndex: number) => void
  metadata: FormMetadata
  onUpdateMetadata: (metadata: FormMetadata) => void
  colorScheme: string;
}

export default function FormArea({
  elements,
  selectedElements,
  onToggleElementSelection,
  onRemoveElements,
  onMoveElements,
  metadata,
  onUpdateMetadata,
  colorScheme
}: FormAreaProps) {
  const [, drop] = useDrop(() => ({ 
    accept: 'form-element',
    drop: (item: { id: string }, monitor) => {
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        onMoveElements([item.id], elements.length)
      }
    }
  }))
  const [generatedCode, setGeneratedCode] = useState('')

  const handleLayoutChange = (layout: 'single-column' | 'two-column') => {
    onUpdateMetadata({ ...metadata, layout })
  }

  useEffect(() => {
    const generateSourceCode = () => {
      const formData = {
        metadata,
        elements
      }
      return JSON.stringify(formData, null, 2)
    }

    setGeneratedCode(generateSourceCode())
  }, [metadata, elements])

  return (
    <div className={`bg-gray-50 p-6 rounded-lg shadow-inner ${
  colorScheme === 'Sunset' ? 'bg-yellow-50' :
  colorScheme === 'Forest' ? 'bg-green-50' :
  colorScheme === 'Ocean' ? 'bg-blue-50' :
  colorScheme === 'Berry' ? 'bg-pink-50' :
  'bg-gray-50'
}`}>
      <div className="mb-6 space-y-4">
        <div>
          <Label htmlFor="formName" className="text-lg font-semibold text-gray-700">Form Name</Label>
          <Input
            id="formName"
            value={metadata.name}
            onChange={(e) => onUpdateMetadata({ ...metadata, name: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="formDescription" className="text-lg font-semibold text-gray-700">Description</Label>
          <Textarea
            id="formDescription"
            value={metadata.description}
            onChange={(e) => onUpdateMetadata({ ...metadata, description: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="formLayout" className="text-lg font-semibold text-gray-700">Layout</Label>
          <Select
            value={metadata.layout}
            onValueChange={(value: 'single-column' | 'two-column') => handleLayoutChange(value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single-column">Single Column</SelectItem>
              <SelectItem value="two-column">Two Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        ref={drop}
        className={`min-h-[400px] border-2 border-dashed p-6 rounded-lg transition-all duration-300 ${
          metadata.layout === 'two-column' ? 'grid grid-cols-2 gap-6' : ''
        } ${
          colorScheme === 'Default' ? 'bg-white border-gray-300' :
          colorScheme === 'Sunset' ? 'bg-orange-50 border-orange-200' :
          colorScheme === 'Forest' ? 'bg-green-50 border-green-200' :
          colorScheme === 'Ocean' ? 'bg-teal-50 border-teal-200' :
          colorScheme === 'Berry' ? 'bg-purple-50 border-purple-200' :
          'bg-white border-gray-300'
        }`}
      >
        {elements.map((element, index) => (
          <FormElementComponent
            key={element.id}
            element={element}
            index={index}
            isSelected={selectedElements.some(el => el.id === element.id)}
            onToggleSelection={onToggleElementSelection}
            onMoveElement={onMoveElements}
            onRemoveElement={() => onRemoveElements([element.id])}
          />
        ))}
        {elements.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            Drag and drop elements here
          </div>
        )}
      </div>
      {selectedElements.length > 0 && (
        <div className="mt-4">
          <Button 
            variant="destructive" 
            onClick={() => onRemoveElements(selectedElements.map(el => el.id))}
          >
            Remove Selected Elements ({selectedElements.length})
          </Button>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Generated Source Code</h3>
        <div className="relative">
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
            <code>{generatedCode}</code>
          </pre>
          <Button
            onClick={() => navigator.clipboard.writeText(generatedCode)}
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white"
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  )
}

