
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionCondition } from "@/types/template";
import { Plus } from "lucide-react";
import { ConditionBuilder } from "./ConditionBuilder";

interface SectionConditionsProps {
  conditions: SectionCondition[];
  onChange: (conditions: SectionCondition[]) => void;
}

export function SectionConditions({ conditions, onChange }: SectionConditionsProps) {
  const addCondition = () => {
    const newCondition: SectionCondition = {
      id: Date.now().toString(),
      type: 'always_visible',
      description: `Uslov ${conditions.length + 1}`
    };

    onChange([...conditions, newCondition]);
  };

  const updateCondition = (index: number, updatedCondition: SectionCondition) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = updatedCondition;
    onChange(updatedConditions);
  };

  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-corporate-black">Uslovi vidljivosti</h4>
        <Button
          size="sm"
          onClick={addCondition}
          className="corporate-button-primary h-8"
        >
          <Plus size={14} className="mr-1" />
          Dodaj uslov
        </Button>
      </div>
      
      {conditions.length === 0 ? (
        <div className="text-center py-8 text-corporate-gray-medium">
          <p>Nema definisanih uslova</p>
          <p className="text-xs mt-1">Sekcija će biti uvijek vidljiva</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conditions.map((condition, index) => (
            <div key={condition.id}>
              {index > 0 && (
                <div className="text-center text-sm text-corporate-gray-medium py-2">
                  I (AND)
                </div>
              )}
              <ConditionBuilder
                condition={condition}
                onChange={(updatedCondition) => updateCondition(index, updatedCondition)}
                onRemove={() => removeCondition(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
