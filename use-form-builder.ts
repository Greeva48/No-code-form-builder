import { useState } from 'react'
import { FormElementType } from '@/types/form-builder'

export function useFormBuilder() {
  const [formElements, setFormElements] = useState<FormElementType[]>([])
  const [selectedElement, setSelectedElement] = useState<FormElementType | null>(null)

  const addElement = (type: FormElementType['type']) => {
    const newElement: FormElementType = {
      id: `element-${Date.now()}`,
      type,
      label: `New ${type} field`,
    }
    setFormElements([...formElements, newElement])
  }

  const updateElement = (id: string, updates: Partial<FormElementType>) => {
    setFormElements(formElements.map(el => el.id === id ? { ...el, ...updates } : el))
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...updates })
    }
  }

  const moveElement = (dragIndex: number, hoverIndex: number) => {
    const dragElement = formElements[dragIndex]
    setFormElements(prevElements => {
      const newElements = [...prevElements]
      newElements.splice(dragIndex, 1)
      newElements.splice(hoverIndex, 0, dragElement)
      return newElements
    })
  }

  return {
    formElements,
    addElement,
    updateElement,
    selectedElement,
    setSelectedElement,
    moveElement,
  }
}

