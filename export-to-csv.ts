import { FormElement, FormMetadata } from "@/types/form-builder"

export function exportToCSV(metadata: FormMetadata, elements: FormElement[]) {
  const headers = elements.map(element => element.label).join(',')
  const csvContent = `data:text/csv;charset=utf-8,Form Name: ${metadata.name}\nForm Description: ${metadata.description}\n\n${headers}\n`

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `${metadata.name.replace(/\s+/g, '_')}_template.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

