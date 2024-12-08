import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const colorSchemes = [
  { name: 'Default', primary: 'bg-blue-500', secondary: 'bg-blue-100' },
  { name: 'Sunset', primary: 'bg-orange-500', secondary: 'bg-yellow-100' },
  { name: 'Forest', primary: 'bg-green-500', secondary: 'bg-green-100' },
  { name: 'Ocean', primary: 'bg-teal-500', secondary: 'bg-blue-100' },
  { name: 'Berry', primary: 'bg-purple-500', secondary: 'bg-pink-100' },
]

interface ColorPaletteProps {
  selectedScheme: string;
  onSelectScheme: (scheme: string) => void;
}

export function ColorPalette({ selectedScheme, onSelectScheme }: ColorPaletteProps) {
  return (
    <div className="space-y-4">
      <Label>Color Scheme</Label>
      <RadioGroup value={selectedScheme} onValueChange={onSelectScheme}>
        <div className="grid grid-cols-2 gap-4">
          {colorSchemes.map((scheme) => (
            <Label
              key={scheme.name}
              className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer ${
                selectedScheme === scheme.name ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <RadioGroupItem value={scheme.name} id={scheme.name} />
              <span>{scheme.name}</span>
              <div className={`w-6 h-6 rounded-full ${scheme.primary}`}></div>
              <div className={`w-6 h-6 rounded-full ${scheme.secondary}`}></div>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

