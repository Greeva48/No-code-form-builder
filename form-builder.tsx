'use client'

import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ElementPanel from './element-panel'
import FormArea from './form-area'
import ConfigDrawer from './config-drawer'
import { FormElement, FormMetadata } from '@/types/form-builder'
import FormPreview from './form-preview'
import { FormTemplates } from './form-templates'
import { saveForm, getForms } from '@/app/actions'

export default function FormBuilder() {
  const [formElements, setFormElements] = useState<FormElement[]>([])
  const [selectedElements, setSelectedElements] = useState<FormElement[]>([])
  const [formMetadata, setFormMetadata] = useState<FormMetadata>({
    name: 'Untitled Form',
    description: '',
    layout: 'single-column'
  })
  const [savedForms, setSavedForms] = useState<any[]>([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchSavedForms()
  }, [])

  const addElement = (element: FormElement) => {
    setFormElements([...formElements, element])
  }

  const updateElements = (updatedElements: FormElement[]) => {
    setFormElements(formElements.map(el => {
      const updatedElement = updatedElements.find(updated => updated.id === el.id)
      return updatedElement ? updatedElement : el
    }))
    setSelectedElements([])
  }

  const removeElements = (ids: string[]) => {
    setFormElements(formElements.filter(el => !ids.includes(el.id)))
    setSelectedElements([])
  }

  const toggleElementSelection = (element: FormElement, isMultiSelect: boolean) => {
    setSelectedElements(prev => {
      if (prev.some(el => el.id === element.id)) {
        return prev.filter(el => el.id !== element.id)
      } else {
        return isMultiSelect ? [...prev, element] : [element]
      }
    })
  }

  const moveElements = (draggedIds: string[], targetIndex: number) => {
    const newElements = formElements.filter(el => !draggedIds.includes(el.id))
    const draggedElements = formElements.filter(el => draggedIds.includes(el.id))
    newElements.splice(targetIndex, 0, ...draggedElements)
    setFormElements(newElements)
  }

  const handleSaveForm = async () => {
    setIsLoading(true)
    try {
      const result = await saveForm({ metadata: formMetadata, elements: formElements })
      if (result.success) {
        console.log('Form saved successfully:', result.id)
        fetchSavedForms()
      } else {
        console.error('Error saving form:', result.error)
      }
    } catch (error) {
      console.error('Error saving form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectTemplate = (template: { metadata: FormMetadata; elements: FormElement[] }) => {
    setFormMetadata(template.metadata)
    setFormElements(template.elements)
  }

  const fetchSavedForms = async () => {
    setIsLoading(true)
    try {
      const result = await getForms()
      if (result.success) {
        setSavedForms(result.forms)
      } else {
        console.error('Error fetching forms:', result.error)
      }
    } catch (error) {
      console.error('Error fetching forms:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">No-Code Form Builder</h1>
          <div className="flex gap-8">
            <div className="w-64">
              <ElementPanel onAddElement={addElement} />
              <div className="mt-4">
                <FormTemplates onSelectTemplate={handleSelectTemplate} />
              </div>
            </div>
            <div className="flex-1">
              <FormArea
                elements={formElements}
                selectedElements={selectedElements}
                onToggleElementSelection={toggleElementSelection}
                onRemoveElements={removeElements}
                onMoveElements={moveElements}
                metadata={formMetadata}
                onUpdateMetadata={setFormMetadata}
              />
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Preview Form
                </button>
                <button
                  onClick={handleSaveForm}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                  {isLoading ? 'Saving...' : 'Save Form'}
                </button>
              </div>
            </div>
            <ConfigDrawer
              elements={selectedElements}
              onUpdateElements={updateElements}
              onClose={() => setSelectedElements([])}
              allElements={formElements}
            />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Saved Forms</h2>
            {isLoading ? (
              <p>Loading saved forms...</p>
            ) : savedForms.length === 0 ? (
              <p>No saved forms yet.</p>
            ) : (
              <ul className="space-y-2">
                {savedForms.map((form: any) => (
                  <li key={form._id} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold">{form.metadata.name}</h3>
                    <p className="text-sm text-gray-600">{form.metadata.description}</p>
                    <p className="text-sm text-gray-500">{form.elements.length} elements</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {isPreviewOpen && (
        <FormPreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          metadata={formMetadata}
          elements={formElements}
        />
      )}
    </DndProvider>
  )
}