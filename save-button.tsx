'use client'

import { Button } from '@/components/ui/button'
import { FormElementType } from '@/types/form-builder'
import { saveForm } from '@/app/actions'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface SaveButtonProps {
  formData: FormElementType[]
}

export default function SaveButton({ formData }: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveForm(formData)
      toast({
        title: 'Form saved successfully',
        description: 'Your form has been saved to the database.',
      })
    } catch (error) {
      toast({
        title: 'Error saving form',
        description: 'There was an error saving your form. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Button onClick={handleSave} disabled={isSaving} className="mt-4">
      {isSaving ? 'Saving...' : 'Save Form'}
    </Button>
  )
}

