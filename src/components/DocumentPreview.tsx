
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Template, TemplateSection, SectionCondition } from "@/types/template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

interface DocumentPreviewProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentPreview({ template, isOpen, onClose }: DocumentPreviewProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});

  // Funkcija za provjeru da li je sekcija vidljiva na osnovu uslova
  const isSectionVisible = (section: TemplateSection): boolean => {
    if (!section.conditions || section.conditions.length === 0) {
      return true; // Bez uslova, sekcija je uvijek vidljiva
    }

    return section.conditions.every(condition => {
      switch (condition.type) {
        case 'always_visible':
          return true;
        case 'always_hidden':
          return false;
        case 'variable_equals':
          return variables[condition.variableName || ''] === condition.expectedValue;
        case 'variable_not_equals':
          return variables[condition.variableName || ''] !== condition.expectedValue;
        case 'variable_contains':
          return (variables[condition.variableName || ''] || '').includes(condition.expectedValue || '');
        default:
          return true;
      }
    });
  };

  // Dobijanje svih varijabli koje se koriste u uslovima
  const getAllVariables = (): string[] => {
    const vars = new Set<string>();
    template.sections.forEach(section => {
      section.conditions?.forEach(condition => {
        if (condition.variableName && condition.type !== 'always_visible' && condition.type !== 'always_hidden') {
          vars.add(condition.variableName);
        }
      });
    });
    return Array.from(vars);
  };

  // Funkcija za formatiranje opisa uslova
  const formatConditionDescription = (condition: SectionCondition): string => {
    switch (condition.type) {
      case 'always_visible':
        return 'Uvijek vidljiva';
      case 'always_hidden':
        return 'Uvijek skrivena';
      case 'variable_equals':
        return `${condition.variableName} = "${condition.expectedValue}"`;
      case 'variable_not_equals':
        return `${condition.variableName} ≠ "${condition.expectedValue}"`;
      case 'variable_contains':
        return `${condition.variableName} sadrži "${condition.expectedValue}"`;
      default:
        return condition.description;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-corporate-black">Pregled dokumenta: {template.name}</DialogTitle>
          <DialogDescription>
            Kompletni prikaz dokumenta sa svim sekcijama i označenim uslovima
          </DialogDescription>
        </DialogHeader>
        
        {getAllVariables().length > 0 && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Varijable dokumenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getAllVariables().map(variableName => (
                <div key={variableName} className="space-y-1">
                  <Label htmlFor={variableName}>{variableName}</Label>
                  <Input
                    id={variableName}
                    value={variables[variableName] || ''}
                    onChange={(e) => setVariables(prev => ({
                      ...prev,
                      [variableName]: e.target.value
                    }))}
                    placeholder={`Unesite vrijednost za ${variableName}...`}
                    className="corporate-input"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold text-corporate-black mb-6 text-center border-b pb-4">
              {template.name}
            </h2>
            
            <div className="space-y-8">
              {template.sections.map((section, index) => {
                const isVisible = isSectionVisible(section);
                const hasConditions = section.conditions && section.conditions.length > 0;
                
                return (
                  <div key={section.id + index} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-corporate-black border-l-4 border-corporate-yellow pl-3 flex-1">
                        {section.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {/* Indikator vidljivosti */}
                        <div className="flex items-center gap-1">
                          {isVisible ? (
                            <Eye size={16} className="text-green-600" />
                          ) : (
                            <EyeOff size={16} className="text-red-600" />
                          )}
                          <span className={`text-xs font-medium ${isVisible ? 'text-green-600' : 'text-red-600'}`}>
                            {isVisible ? 'Vidljiva' : 'Skrivena'}
                          </span>
                        </div>
                        
                        {/* Oznaka za uslove */}
                        {hasConditions && (
                          <Badge variant="outline" className="flex items-center gap-1 text-xs">
                            <AlertCircle size={12} />
                            {section.conditions!.length} uslov(a)
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Prikaz uslova ako postoje */}
                    {hasConditions && (
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle size={14} className="text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">Uslovi vidljivosti:</span>
                        </div>
                        <div className="space-y-1">
                          {section.conditions!.map((condition, condIndex) => (
                            <div key={condition.id} className="text-xs text-amber-700 pl-4">
                              • {formatConditionDescription(condition)}
                              {condition.description && condition.description !== formatConditionDescription(condition) && (
                                <span className="text-amber-600 ml-2">({condition.description})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Sadržaj sekcije sa kondicionalno obojenim pozadinom */}
                    <div 
                      className={`prose max-w-none leading-relaxed p-4 rounded-md border ${
                        !isVisible 
                          ? 'bg-red-50 border-red-200 text-red-800 opacity-60' 
                          : hasConditions 
                            ? 'bg-amber-50 border-amber-200 text-corporate-black'
                            : 'bg-white border-gray-200 text-corporate-black'
                      }`}
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                    
                    {index < template.sections.length - 1 && (
                      <hr className="border-gray-200 my-6" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-sm text-corporate-gray-medium bg-corporate-gray-light p-3 rounded-md">
            <p><strong>Statistike:</strong></p>
            <p>Ukupno sekcija: {template.sections.length}</p>
            <p>Vidljivih sekcija: {template.sections.filter(isSectionVisible).length}</p>
            <p>Sekcija sa uslovima: {template.sections.filter(s => s.conditions && s.conditions.length > 0).length}</p>
            {template.sections.length !== template.sections.filter(isSectionVisible).length && (
              <p>Skrivenih sekcija: {template.sections.length - template.sections.filter(isSectionVisible).length}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
