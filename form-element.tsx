import { useDrag, useDrop } from 'react-dnd'
import { FormElementType } from '@/types/form-builder'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormElementProps {
  element: FormElementType
  index: number
  onMoveElement: (dragIndex: number, hoverIndex: number) => void
  onSelectElement: (element: FormElementType) => void
}

export default function FormElement({ element, index, onMoveElement, onSelectElement }: FormElementProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'form-element',
    item: { id: element.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'form-element',
    hover(item: { id: string; index: number }) {
      if (item.index !== index) {
        onMoveElement(item.index, index)
        item.index = index
      }
    },
  }))

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return <Input placeholder={element.placeholder} />
      case 'number':
        return <Input type="number" />
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
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
      case 'checkbox':
        return <Checkbox />
      default:
        return null
    }
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={() => onSelectElement(element)}
      className={`p-4 mb-4 border rounded-lg cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <label className="block mb-2 font-medium">{element.label}</label>
      {renderElement()}
    </div>
  )
}

