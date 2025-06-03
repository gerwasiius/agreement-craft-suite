
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Template, TemplateSection, SectionCondition } from "@/types/template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const visibleSections = template.sections.filter(isSectionVisible);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-corporate-black">Pregled dokumenta: {template.name}</DialogTitle>
          <DialogDescription>
            Kompletni prikaz dokumenta sa svim vidljivim sekcijama
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
            
            {visibleSections.length === 0 ? (
              <div className="text-center py-8 text-corporate-gray-medium">
                <p>Nema vidljivih sekcija na osnovu trenutnih uslova.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {visibleSections.map((section, index) => (
                  <div key={section.id + index} className="space-y-3">
                    <h3 className="text-lg font-semibold text-corporate-black border-l-4 border-corporate-yellow pl-3">
                      {section.name}
                    </h3>
                    <div 
                      className="prose max-w-none text-corporate-black leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                    {index < visibleSections.length - 1 && (
                      <hr className="border-gray-200 my-6" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-sm text-corporate-gray-medium bg-corporate-gray-light p-3 rounded-md">
            <p><strong>Statistike:</strong></p>
            <p>Ukupno sekcija: {template.sections.length}</p>
            <p>Vidljivih sekcija: {visibleSections.length}</p>
            {template.sections.length !== visibleSections.length && (
              <p>Skrivenih sekcija: {template.sections.length - visibleSections.length}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
