import { FormElement, FormMetadata } from '@/types/form-builder'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface FormPreviewProps {
  isOpen: boolean
  onClose: () => void
  metadata: FormMetadata
  elements: FormElement[]
  customCSS: string
}

export default function FormPreview({ isOpen, onClose, metadata, elements, customCSS }: FormPreviewProps) {
  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case 'text':
        return (
          <Input
            placeholder={element.placeholder}
            required={element.required}
            className={`${element.size === 'small' ? 'w-1/2' : element.size === 'large' ? 'w-full' : 'w-3/4'}`}
          />
        )
      case 'textarea':
        return (
          <Textarea
            placeholder={element.placeholder}
            required={element.required}
            className={`${element.size === 'small' ? 'w-1/2' : element.size === 'large' ? 'w-full' : 'w-3/4'}`}
          />
        )
      case 'select':
        return (
          <Select>
            <SelectTrigger className={`${element.size === 'small' ? 'w-1/2' : element.size === 'large' ? 'w-full' : 'w-3/4'}`}>
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
            <SelectTrigger className={`${element.size === 'small' ? 'w-1/2' : element.size === 'large' ? 'w-full' : 'w-3/4'}`}>
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
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={element.id} />
            <label
              htmlFor={element.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {element.label}
            </label>
          </div>
        )
      case 'file':
        return <Input type="file" className={`${element.size === 'small' ? 'w-1/2' : element.size === 'large' ? 'w-full' : 'w-3/4'}`} />
      case 'date':
        return <Input type="date" className={`${element.size === 'small' ? 'w-1/2' : element.size === 'large' ? 'w-full' : 'w-3/4'}`} />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{metadata.name}</DialogTitle>
          <DialogDescription>{metadata.description}</DialogDescription>
        </DialogHeader>
        <div className={`space-y-6 ${metadata.layout === 'two-column' ? 'sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0' : ''}`}>
          {elements.map((element) => (
            <div key={element.id} className="space-y-2">
              <Label htmlFor={element.id} className="text-sm font-medium text-gray-700">
                {element.label}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderFormElement(element)}
            </div>
          ))}
        </div>
        {customCSS && (
          <style dangerouslySetInnerHTML={{ __html: customCSS }} />
        )}
      </DialogContent>
    </Dialog>
  )
}

