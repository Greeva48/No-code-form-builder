import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CustomCSSInputProps {
  onApplyCSS: (css: string) => void
}

export function CustomCSSInput({ onApplyCSS }: CustomCSSInputProps) {
  const [css, setCSS] = useState("")

  const handleApplyCSS = () => {
    onApplyCSS(css)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="custom-css">Custom CSS</Label>
        <Textarea
          id="custom-css"
          placeholder="Enter your custom CSS here"
          value={css}
          onChange={(e) => setCSS(e.target.value)}
          className="font-mono"
          rows={10}
        />
      </div>
      <Button onClick={handleApplyCSS}>Apply Custom CSS</Button>
    </div>
  )
}

