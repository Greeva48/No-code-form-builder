import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormElement, FormMetadata } from "@/types/form-builder"

interface FormTemplate {
  name: string
  description: string
  metadata: FormMetadata
  elements: FormElement[]
}

const templates: FormTemplate[] = [
  {
    name: "Contact Form",
    description: "A simple contact form with name, email, and message fields",
    metadata: {
      name: "Contact Us",
      description: "Get in touch with us",
      layout: "single-column"
    },
    elements: [
      {
        id: "name",
        type: "text",
        label: "Name",
        name: "name",
        placeholder: "Enter your name",
        required: true,
        size: "medium",
        visible: true
      },
      {
        id: "email",
        type: "text",
        label: "Email",
        name: "email",
        placeholder: "Enter your email",
        required: true,
        size: "medium",
        visible: true
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "Enter your message",
        required: true,
        size: "large",
        visible: true
      }
    ]
  },
  {
    name: "Event Registration",
    description: "A form for event registration with personal details and preferences",
    metadata: {
      name: "Event Registration",
      description: "Register for our upcoming event",
      layout: "two-column"
    },
    elements: [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        name: "fullName",
        placeholder: "Enter your full name",
        required: true,
        size: "medium",
        visible: true
      },
      {
        id: "email",
        type: "text",
        label: "Email",
        name: "email",
        placeholder: "Enter your email",
        required: true,
        size: "medium",
        visible: true
      },
      {
        id: "phone",
        type: "text",
        label: "Phone Number",
        name: "phone",
        placeholder: "Enter your phone number",
        required: false,
        size: "medium",
        visible: true
      },
      {
        id: "eventDate",
        type: "date",
        label: "Preferred Date",
        name: "eventDate",
        required: true,
        size: "medium",
        visible: true
      },
      {
        id: "dietaryRestrictions",
        type: "select",
        label: "Dietary Restrictions",
        name: "dietaryRestrictions",
        placeholder: "Select dietary restrictions",
        required: false,
        size: "medium",
        options: ["None", "Vegetarian", "Vegan", "Gluten-free", "Kosher", "Halal"],
        visible: true
      },
      {
        id: "specialRequests",
        type: "textarea",
        label: "Special Requests",
        name: "specialRequests",
        placeholder: "Enter any special requests",
        required: false,
        size: "large",
        visible: true
      }
    ]
  }
]

interface FormTemplatesProps {
  onSelectTemplate: (template: FormTemplate) => void
}

export function FormTemplates({ onSelectTemplate }: FormTemplatesProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Choose Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {templates.map((template) => (
            <Button
              key={template.name}
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="text-left">
                <h3 className="font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

