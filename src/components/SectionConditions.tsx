
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCondition } from "@/types/template";
import { Plus, X } from "lucide-react";

interface SectionConditionsProps {
  conditions: SectionCondition[];
  onChange: (conditions: SectionCondition[]) => void;
}

export function SectionConditions({ conditions, onChange }: SectionConditionsProps) {
  const [newCondition, setNewCondition] = useState<Partial<SectionCondition>>({
    type: 'always_visible',
    description: ''
  });

  const conditionTypes = [
    { value: 'always_visible', label: 'Uvijek vidljiva' },
    { value: 'always_hidden', label: 'Uvijek skrivena' },
    { value: 'variable_equals', label: 'Varijabla jednaka vrijednosti' },
    { value: 'variable_not_equals', label: 'Varijabla različita od vrijednosti' },
    { value: 'variable_contains', label: 'Varijabla sadrži vrijednost' }
  ];

  const addCondition = () => {
    if (!newCondition.type || !newCondition.description) return;

    const condition: SectionCondition = {
      id: Date.now().toString(),
      type: newCondition.type as SectionCondition['type'],
      variableName: newCondition.variableName || '',
      expectedValue: newCondition.expectedValue || '',
      description: newCondition.description
    };

    onChange([...conditions, condition]);
    setNewCondition({
      type: 'always_visible',
      description: ''
    });
  };

  const removeCondition = (conditionId: string) => {
    onChange(conditions.filter(c => c.id !== conditionId));
  };

  const needsVariable = (type: string) => {
    return ['variable_equals', 'variable_not_equals', 'variable_contains'].includes(type);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h4 className="font-medium text-corporate-black">Uslovi vidljivosti</h4>
        
        {conditions.length > 0 && (
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition.id} className="flex items-center justify-between p-3 bg-corporate-gray-light rounded-md">
                <div className="flex-1">
                  <span className="font-medium text-sm">{condition.description}</span>
                  <div className="text-xs text-corporate-gray-medium mt-1">
                    {condition.type === 'always_visible' && 'Uvijek vidljiva'}
                    {condition.type === 'always_hidden' && 'Uvijek skrivena'}
                    {condition.type === 'variable_equals' && `${condition.variableName} = "${condition.expectedValue}"`}
                    {condition.type === 'variable_not_equals' && `${condition.variableName} ≠ "${condition.expectedValue}"`}
                    {condition.type === 'variable_contains' && `${condition.variableName} sadrži "${condition.expectedValue}"`}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeCondition(condition.id)}
                  className="h-7 w-7 p-0 text-corporate-red-medium"
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Dodaj novi uslov</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Tip uslova</Label>
                <Select
                  value={newCondition.type}
                  onValueChange={(value) => setNewCondition(prev => ({ ...prev, type: value as SectionCondition['type'] }))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs">Opis uslova</Label>
                <Input
                  value={newCondition.description}
                  onChange={(e) => setNewCondition(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Kratki opis..."
                  className="h-8 text-sm"
                />
              </div>
            </div>

            {needsVariable(newCondition.type || '') && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Ime varijable</Label>
                  <Input
                    value={newCondition.variableName || ''}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, variableName: e.target.value }))}
                    placeholder="npr. ime_klijenta"
                    className="h-8 text-sm"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Očekivana vrijednost</Label>
                  <Input
                    value={newCondition.expectedValue || ''}
                    onChange={(e) => setNewCondition(prev => ({ ...prev, expectedValue: e.target.value }))}
                    placeholder="Vrijednost..."
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            )}

            <Button
              size="sm"
              onClick={addCondition}
              disabled={!newCondition.description || (needsVariable(newCondition.type || '') && (!newCondition.variableName || !newCondition.expectedValue))}
              className="corporate-button-primary h-8"
            >
              <Plus size={14} className="mr-1" />
              Dodaj uslov
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
