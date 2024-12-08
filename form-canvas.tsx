import { useDrop } from 'react-dnd'
import FormElement from './form-element'
import { FormElementType } from '@/types/form-builder'

interface FormCanvasProps {
  elements: FormElementType[]
  onMoveElement: (dragIndex: number, hoverIndex: number) => void
  onSelectElement: (element: FormElementType) => void
}

export default function FormCanvas({ elements, onMoveElement, onSelectElement }: FormCanvasProps) {
  const [, drop] = useDrop(() => ({ accept: 'form-element' }))

  return (
    <div ref={drop} className="min-h-[600px] border-2 border-dashed border-gray-300 p-4 rounded-lg">
      {elements.map((element, index) => (
        <FormElement
          key={element.id}
          element={element}
          index={index}
          onMoveElement={onMoveElement}
          onSelectElement={onSelectElement}
        />
      ))}
    </div>
  )
}

