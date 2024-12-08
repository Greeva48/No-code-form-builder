'use server'

import { FormElementType } from '@/types/form-builder'
import clientPromise from '@/lib/mongodb'

export async function saveForm(formData: { metadata: any; elements: FormElementType[] }) {
  try {
    const client = await clientPromise
    const db = client.db("formBuilder")
    const result = await db.collection("forms").insertOne(formData)
    console.log("Form saved successfully:", result.insertedId)
    return { success: true, id: result.insertedId }
  } catch (error) {
    console.error("Failed to save form:", error)
    return { success: false, error: String(error) }
  }
}

export async function getForms() {
  try {
    const client = await clientPromise
    const db = client.db("formBuilder")
    const forms = await db.collection("forms").find({}).toArray()
    console.log("Retrieved forms:", forms.length)
    return { success: true, forms }
  } catch (error) {
    console.error("Failed to retrieve forms:", error)
    return { success: false, error: String(error) }
  }
}

