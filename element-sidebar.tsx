import { Button } from '@/components/ui/button'
import { FormElementType } from '@/types/form-builder'

interface ElementSidebarProps {
  onAddElement: (type: FormElementType['type']) => void
}

export default function ElementSidebar({ onAddElement }: ElementSidebarProps) {
  const elementTypes: FormElementType['type'][] = ['text', 'number', 'select', 'checkbox']

  return (
    <div className="w-48 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Form Elements</h2>
      <div className="space-y-2">
        {elementTypes.map((type) => (
          <Button
            key={type}
            onClick={() => onAddElement(type)}
            className="w-full justify-start"
            variant="outline"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  )
}

