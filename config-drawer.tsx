import { useState, useEffect } from 'react'
import { FormElement } from '@/types/form-builder'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface ConfigDrawerProps {
  elements: FormElement[]
  onUpdateElements: (elements: FormElement[]) => void
  onClose: () => void
  allElements: FormElement[]
}

export default function ConfigDrawer({ elements, onUpdateElements, onClose, allElements }: ConfigDrawerProps) {
  const [configs, setConfigs] = useState<FormElement[]>([])

  useEffect(() => {
    setConfigs(elements)
  }, [elements])

  const handleChange = (index: number, key: string, value: any) => {
    const newConfigs = [...configs]
    newConfigs[index] = { ...newConfigs[index], [key]: value }
    setConfigs(newConfigs)
  }

  const handleSave = () => {
    onUpdateElements(configs)
    onClose()
  }

  if (configs.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Element Configuration</h2>
      {configs.map((config, index) => (
        <div key={config.id} className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-xl font-semibold mb-4">{config.label}</h3>
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
              <TabsTrigger value="conditional">Conditional</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="basic-settings">
                  <AccordionTrigger>Basic Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`name-${index}`}>Name</Label>
                        <Input
                          id={`name-${index}`}
                          value={config.name}
                          onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`label-${index}`}>Label</Label>
                        <Input
                          id={`label-${index}`}
                          value={config.label}
                          onChange={(e) => handleChange(index, 'label', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`placeholder-${index}`}>Placeholder</Label>
                        <Input
                          id={`placeholder-${index}`}
                          value={config.placeholder || ''}
                          onChange={(e) => handleChange(index, 'placeholder', e.target.value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`required-${index}`}>Required</Label>
                        <Switch
                          id={`required-${index}`}
                          checked={config.required}
                          onCheckedChange={(checked) => handleChange(index, 'required', checked)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`size-${index}`}>Size</Label>
                        <Select
                          value={config.size}
                          onValueChange={(value) => handleChange(index, 'size', value)}
                        >
                          <SelectTrigger id={`size-${index}`}>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {config.size === 'custom' && (
                        <div>
                          <Label htmlFor={`customWidth-${index}`}>Custom Width (px)</Label>
                          <Input
                            id={`customWidth-${index}`}
                            type="number"
                            value={config.customWidth || ''}
                            onChange={(e) => handleChange(index, 'customWidth', parseInt(e.target.value))}
                          />
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="validation">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="validation-rules">
                  <AccordionTrigger>Validation Rules</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {(config.type === 'text' || config.type === 'textarea') && (
                        <>
                          <div>
                            <Label htmlFor={`minLength-${index}`}>Min Length</Label>
                            <Input
                              id={`minLength-${index}`}
                              type="number"
                              value={config.minLength || ''}
                              onChange={(e) => handleChange(index, 'minLength', parseInt(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`maxLength-${index}`}>Max Length</Label>
                            <Input
                              id={`maxLength-${index}`}
                              type="number"
                              value={config.maxLength || ''}
                              onChange={(e) => handleChange(index, 'maxLength', parseInt(e.target.value))}
                            />
                          </div>
                        </>
                      )}
                      {config.type === 'number' && (
                        <>
                          <div>
                            <Label htmlFor={`min-${index}`}>Min Value</Label>
                            <Input
                              id={`min-${index}`}
                              type="number"
                              value={config.min || ''}
                              onChange={(e) => handleChange(index, 'min', parseInt(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`max-${index}`}>Max Value</Label>
                            <Input
                              id={`max-${index}`}
                              type="number"
                              value={config.max || ''}
                              onChange={(e) => handleChange(index, 'max', parseInt(e.target.value))}
                            />
                          </div>
                        </>
                      )}
                      <div>
                        <Label htmlFor={`validation-${index}`}>Custom Validation (RegEx)</Label>
                        <Input
                          id={`validation-${index}`}
                          value={config.validation || ''}
                          onChange={(e) => handleChange(index, 'validation', e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="conditional">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="conditional-logic">
                  <AccordionTrigger>Conditional Logic</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`dependsOn-${index}`}>Depends On</Label>
                        <Select
                          value={config.conditionalLogic?.dependsOn || ''}
                          onValueChange={(value) => handleChange(index, 'conditionalLogic', { ...config.conditionalLogic, dependsOn: value })}
                        >
                          <SelectTrigger id={`dependsOn-${index}`}>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {allElements.filter(el => el.id !== config.id).map(el => (
                              <SelectItem key={el.id} value={el.id}>{el.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`condition-${index}`}>Condition</Label>
                        <Select
                          value={config.conditionalLogic?.condition || ''}
                          onValueChange={(value) => handleChange(index, 'conditionalLogic', { ...config.conditionalLogic, condition: value })}
                        >
                          <SelectTrigger id={`condition-${index}`}>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="notEquals">Not Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="notContains">Not Contains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`conditionalValue-${index}`}>Value</Label>
                        <Input
                          id={`conditionalValue-${index}`}
                          value={config.conditionalLogic?.value || ''}
                          onChange={(e) => handleChange(index, 'conditionalLogic', { ...config.conditionalLogic, value: e.target.value })}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      ))}
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}

