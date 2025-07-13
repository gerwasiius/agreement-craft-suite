
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCondition } from "@/types/template";
import { Plus, X, Minus, PlusCircle } from "lucide-react";
import { PlaceholderPicker } from "./PlaceholderPicker";
import { Placeholder } from "@/types/placeholder";

interface ConditionBuilderProps {
  condition: SectionCondition;
  onChange: (condition: SectionCondition) => void;
  onRemove: () => void;
  depth?: number;
}

export function ConditionBuilder({ condition, onChange, onRemove, depth = 0 }: ConditionBuilderProps) {
  const conditionTypes = [
    { value: 'always_visible', label: 'Uvijek vidljiva' },
    { value: 'always_hidden', label: 'Uvijek skrivena' },
    { value: 'variable_equals', label: 'Varijabla jednaka vrijednosti' },
    { value: 'variable_not_equals', label: 'Varijabla različita od vrijednosti' },
    { value: 'variable_contains', label: 'Varijabla sadrži vrijednost' }
  ];

  const needsVariable = (type: string) => {
    return ['variable_equals', 'variable_not_equals', 'variable_contains'].includes(type);
  };

  const handlePlaceholderSelect = (placeholder: Placeholder) => {
    onChange({
      ...condition,
      variableName: placeholder.value.replace(/[{}]/g, '')
    });
  };

  const addChildCondition = () => {
    const newChild: SectionCondition = {
      id: Date.now().toString(),
      type: 'variable_equals',
      variableName: '',
      expectedValue: '',
      description: `Uslov ${(condition.children?.length || 0) + 1}`,
      operator: 'AND'
    };

    onChange({
      ...condition,
      type: 'group',
      children: [...(condition.children || []), newChild]
    });
  };

  const updateChild = (childIndex: number, updatedChild: SectionCondition) => {
    const updatedChildren = [...(condition.children || [])];
    updatedChildren[childIndex] = updatedChild;
    onChange({
      ...condition,
      children: updatedChildren
    });
  };

  const removeChild = (childIndex: number) => {
    const updatedChildren = condition.children?.filter((_, index) => index !== childIndex) || [];
    
    if (updatedChildren.length === 0) {
      // Ako nema više djece, vrati na jednostavan uslov
      onChange({
        ...condition,
        type: 'always_visible',
        children: undefined
      });
    } else {
      onChange({
        ...condition,
        children: updatedChildren
      });
    }
  };

  const isGroup = condition.type === 'group';

  return (
    <Card className={`${depth > 0 ? 'ml-4 border-l-4 border-l-corporate-yellow' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">
            {isGroup ? `Grupa uslova (${condition.operator})` : 'Uslov'}
          </CardTitle>
          <div className="flex gap-2">
            {!isGroup && (
              <Button
                size="sm"
                variant="outline"
                onClick={addChildCondition}
                className="h-7 px-2 text-xs"
              >
                <PlusCircle size={12} className="mr-1" />
                Kombinuj
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onRemove}
              className="h-7 w-7 p-0 text-corporate-red-medium"
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {isGroup ? (
          <>
            {/* Operator izbor za grupu */}
            <div className="space-y-1">
              <Label className="text-xs">Logički operator</Label>
              <Select
                value={condition.operator}
                onValueChange={(value) => onChange({ ...condition, operator: value as 'AND' | 'OR' })}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">I (AND)</SelectItem>
                  <SelectItem value="OR">ILI (OR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opis grupe */}
            <div className="space-y-1">
              <Label className="text-xs">Opis kombinacije</Label>
              <Input
                value={condition.description}
                onChange={(e) => onChange({ ...condition, description: e.target.value })}
                placeholder="Opis kombinacije uslova..."
                className="h-8 text-sm"
              />
            </div>

            {/* Djeca uslovi */}
            <div className="space-y-2">
              {condition.children?.map((child, index) => (
                <div key={child.id}>
                  {index > 0 && (
                    <div className="text-center text-xs text-corporate-gray-medium py-1">
                      {condition.operator}
                    </div>
                  )}
                  <ConditionBuilder
                    condition={child}
                    onChange={(updatedChild) => updateChild(index, updatedChild)}
                    onRemove={() => removeChild(index)}
                    depth={depth + 1}
                  />
                </div>
              ))}
            </div>

            {/* Dodaj novi uslov u grupu */}
            <Button
              size="sm"
              variant="outline"
              onClick={addChildCondition}
              className="w-full h-8 text-xs"
            >
              <Plus size={12} className="mr-1" />
              Dodaj uslov u grupu
            </Button>
          </>
        ) : (
          <>
            {/* Obični uslov */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Tip uslova</Label>
                <Select
                  value={condition.type}
                  onValueChange={(value) => onChange({ ...condition, type: value as SectionCondition['type'] })}
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
                  value={condition.description}
                  onChange={(e) => onChange({ ...condition, description: e.target.value })}
                  placeholder="Kratki opis..."
                  className="h-8 text-sm"
                />
              </div>
            </div>

            {needsVariable(condition.type) && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Placeholder</Label>
                  <PlaceholderPicker
                    selectedValue={condition.variableName ? `{{${condition.variableName}}}` : undefined}
                    onSelect={handlePlaceholderSelect}
                    trigger={
                      <Button variant="outline" className="w-full h-8 justify-start text-xs">
                        {condition.variableName ? `{{${condition.variableName}}}` : "Odaberite placeholder..."}
                      </Button>
                    }
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Očekivana vrijednost</Label>
                  <Input
                    value={condition.expectedValue || ''}
                    onChange={(e) => onChange({ ...condition, expectedValue: e.target.value })}
                    placeholder="Vrijednost..."
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
