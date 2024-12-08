import { useDrag, useDrop } from 'react-dnd'
import { FormElement } from '@/types/form-builder'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'

interface FormElementComponentProps {
  element: FormElement
  index: number
  isSelected: boolean
  onToggleSelection: (element: FormElement, isMultiSelect: boolean) => void
  onMoveElement: (draggedIds: string[], targetIndex: number) => void
  onRemoveElement: () => void
}

export default function FormElementComponent({
  element,
  index,
  isSelected,
  onToggleSelection,
  onMoveElement,
  onRemoveElement
}: FormElementComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'form-element',
    item: { id: element.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'form-element',
    hover: (item: { id: string, index: number }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return
      if (item.index === index) return
      onMoveElement([item.id], index)
      item.index = index
    },
  }))

  const handleClick = (e: React.MouseEvent) => {
    onToggleSelection(element, e.ctrlKey || e.metaKey)
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={handleClick}
      className={`relative mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={(e) => {
          e.stopPropagation()
          onRemoveElement()
        }}
      >
        <XIcon className="h-4 w-4" />
      </Button>
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1">{element.label}</Label>
        {renderFormElement(element)}
      </div>
    </div>
  )
}

function renderFormElement(element: FormElement) {
  switch (element.type) {
    case 'text':
      return <Input placeholder={element.placeholder} />
    case 'textarea':
      return <Textarea placeholder={element.placeholder} />
    case 'select':
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={element.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {element.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case 'multiselect':
      return (
        <Select multiple>
          <SelectTrigger>
            <SelectValue placeholder={element.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {element.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case 'file':
      return <Input type="file" />
    case 'date':
      return <Input type="date" />
    default:
      return null
  }
}

