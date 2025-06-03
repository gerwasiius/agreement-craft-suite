
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, X, ArrowUp, ArrowDown, Maximize } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  sections: TemplateSection[];
}

interface TemplateSection {
  id: string;
  name: string;
  content: string;
}

interface Section {
  id: string;
  name: string;
  description: string;
  content: string;
  groupName: string;
}

const availableSections: Section[] = [
  {
    id: "1",
    name: "Osnovna sekcija ugovora",
    description: "Osnovne informacije o ugovoru",
    content: "<p>Ovo je osnovna sekcija koja sadrži <strong>važne informacije</strong> o ugovoru.</p>",
    groupName: "Ugovori o radu"
  },
  {
    id: "2",
    name: "Prava i obaveze",
    description: "Definisanje prava i obaveza ugovornih strana",
    content: "<p>U ovoj sekciji su definisana sva <strong>prava i obaveze</strong> ugovornih strana.</p>",
    groupName: "Ugovori o radu"
  },
  {
    id: "3",
    name: "Licenciranje",
    description: "Detalji o licencama i pravima korišćenja",
    content: "<p>Ova sekcija definiše uslove <strong>licenciranja</strong> i detalje o pravima korišćenja.</p>",
    groupName: "Licencni ugovori"
  }
];

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Standardni ugovor o radu",
      description: "Template za kreiranje standardnog ugovora o radu",
      createdAt: "2024-01-20",
      sections: [
        {
          id: "1",
          name: "Osnovna sekcija ugovora",
          content: "<p>Ovo je osnovna sekcija koja sadrži <strong>važne informacije</strong> o ugovoru.</p>"
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSectionPickerOpen, setIsSectionPickerOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sections: [] as TemplateSection[]
  });
  const [previewSection, setPreviewSection] = useState<TemplateSection | null>(null);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { 
              ...t, 
              name: formData.name, 
              description: formData.description,
              sections: formData.sections
            }
          : t
      ));
    } else {
      const newTemplate: Template = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        sections: formData.sections,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
    }
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setFormData({ name: "", description: "", sections: [] });
  };

  const openDialog = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        description: template.description,
        sections: [...template.sections]
      });
    } else {
      setEditingTemplate(null);
      setFormData({ name: "", description: "", sections: [] });
    }
    setIsDialogOpen(true);
  };

  const addSection = (section: Section) => {
    const newSection: TemplateSection = {
      id: section.id,
      name: section.name,
      content: section.content
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setIsSectionPickerOpen(false);
  };

  const removeSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...formData.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setFormData(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const openPreview = (section: TemplateSection) => {
    setPreviewSection(section);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-corporate-black">Document Template-i</h1>
          <p className="text-corporate-gray-medium mt-1">
            Kreiranje i organizacija template-a od postojećih sekcija
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="corporate-button-primary flex items-center gap-2"
            >
              <Plus size={16} />
              Novi Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-corporate-black">
                {editingTemplate ? "Izmena Template-a" : "Novi Template"}
              </DialogTitle>
              <DialogDescription>
                {editingTemplate 
                  ? "Izmenite podatke template-a i organizujte sekcije." 
                  : "Kreirajte novi template i dodajte odgovarajuće sekcije."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Naziv template-a</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Unesite naziv template-a..."
                    className="corporate-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Opis</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Kratki opis template-a..."
                    className="corporate-input"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Sekcije dokumenta</Label>
                  <Dialog open={isSectionPickerOpen} onOpenChange={setIsSectionPickerOpen}>
                    <DialogTrigger asChild>
                      <Button className="corporate-button-primary flex items-center gap-2" size="sm">
                        <Plus size={14} />
                        Dodaj sekciju
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-white">
                      <DialogHeader>
                        <DialogTitle>Dodaj sekciju</DialogTitle>
                        <DialogDescription>
                          Izaberite sekciju koju želite da dodate u template.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="my-4 space-y-4">
                        {availableSections.map((section) => (
                          <Card key={section.id} className="corporate-card hover:border-corporate-yellow cursor-pointer transition-colors duration-200" onClick={() => addSection(section)}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium text-corporate-black">{section.name}</h3>
                                  <p className="text-sm text-corporate-gray-medium">{section.description}</p>
                                </div>
                                <span className="text-xs bg-corporate-yellow-light text-corporate-black px-2 py-1 rounded-full">
                                  {section.groupName}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="border border-gray-200 rounded-md p-1 bg-gray-50 min-h-[200px]">
                  {formData.sections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[200px] text-corporate-gray-medium">
                      <p>Nema dodatih sekcija</p>
                      <Button className="mt-2" variant="outline" size="sm" onClick={() => setIsSectionPickerOpen(true)}>
                        Dodaj sekciju
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {formData.sections.map((section, index) => (
                        <div key={section.id + index} className="bg-white border border-gray-200 rounded-md p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="bg-corporate-yellow-light text-corporate-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="font-medium">{section.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => moveSection(index, 'up')}
                              disabled={index === 0}
                              className="h-7 w-7 p-0 text-corporate-gray-medium"
                            >
                              <ArrowUp size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => moveSection(index, 'down')}
                              disabled={index === formData.sections.length - 1}
                              className="h-7 w-7 p-0 text-corporate-gray-medium"
                            >
                              <ArrowDown size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => openPreview(section)}
                              className="h-7 w-7 p-0 text-corporate-gray-medium"
                            >
                              <Maximize size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => removeSection(section.id)}
                              className="h-7 w-7 p-0 text-corporate-red-medium"
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleSubmit}
                className="corporate-button-primary"
              >
                {editingTemplate ? "Sačuvaj izmene" : "Kreiraj template"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!previewSection} onOpenChange={() => setPreviewSection(null)}>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-corporate-black">Pregled sekcije</DialogTitle>
            </DialogHeader>
            {previewSection && (
              <div className="py-4">
                <h3 className="font-medium text-xl mb-4">{previewSection.name}</h3>
                <div 
                  className="p-4 border border-gray-200 rounded-md bg-gray-50"
                  dangerouslySetInnerHTML={{ __html: previewSection.content }}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
          <Input
            placeholder="Pretraga template-a..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="corporate-input pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="corporate-card hover:border-corporate-yellow transition-colors duration-200">
            <CardHeader>
              <CardTitle className="text-corporate-black">{template.name}</CardTitle>
              <CardDescription className="text-corporate-gray-medium">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <h4 className="font-medium text-sm text-corporate-gray-medium mb-2">
                Sekcije ({template.sections.length})
              </h4>
              <div className="space-y-1 max-h-[200px] overflow-auto pr-2">
                {template.sections.map((section, index) => (
                  <div
                    key={section.id + index}
                    className="py-1 px-3 bg-corporate-gray-light text-sm rounded-md flex items-center"
                  >
                    <span className="mr-2 text-xs bg-corporate-yellow text-black rounded-full w-5 h-5 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="truncate">{section.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <span className="text-xs text-corporate-gray-medium">
                Kreirano: {template.createdAt}
              </span>
              <Button
                onClick={() => openDialog(template)}
                className="corporate-button-secondary"
              >
                Izmeni
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-corporate-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
            <Search className="text-corporate-gray-medium" size={32} />
          </div>
          <h3 className="text-lg font-medium text-corporate-black mb-2">
            Nema template-a
          </h3>
          <p className="text-corporate-gray-medium">
            Kreirajte novi template ili promenite termine pretrage.
          </p>
        </div>
      )}
    </div>
  );
};

export default Templates;
