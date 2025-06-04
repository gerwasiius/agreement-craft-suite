import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { WysiwygEditor } from "@/components/WysiwygEditor";
import { Plus, Search, ArrowLeft } from "lucide-react";

interface Section {
  id: string;
  name: string;
  description: string;
  groupId: string;
  version: string;
  content: string;
  createdAt: string;
}

const groups = [
  { id: "1", name: "Ugovori o radu" },
  { id: "2", name: "Licencni ugovori" },
];

const Sections = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Dobijamo groupName iz state-a koji je prosleđen prilikom navigacije
  const groupName = location.state?.groupName || "Nepoznata grupa";

  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Osnovna sekcija ugovora",
      description: "Osnove informacije o ugovoru",
      groupId: "1",
      groupName: "Ugovori o radu",
      version: "1.0",
      content: "<p>Ovo je osnovna sekcija koja sadrži <strong>važne informacije</strong> o ugovoru.</p>",
      createdAt: "2024-01-15"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    version: "",
    content: ""
  });

  // Proverava da li je groupId valjan
  useEffect(() => {
    if (!groupId) {
      navigate("/group-selection");
    }
  }, [groupId, navigate]);

  // Filtriramo sekcije samo za trenutnu grupu
  const filteredSections = sections.filter(section => {
    const matchesGroup = section.groupId === groupId;
    const matchesSearch = section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const handleSubmit = () => {
    if (editingSection) {
      setSections(sections.map(s => 
        s.id === editingSection.id 
          ? { 
              ...s, 
              name: formData.name, 
              description: formData.description,
              version: formData.version,
              content: formData.content
            }
          : s
      ));
    } else {
      const newSection: Section = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        groupId: groupId!,
        version: formData.version,
        content: formData.content,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSections([...sections, newSection]);
    }
    setIsDialogOpen(false);
    setEditingSection(null);
    setFormData({ name: "", description: "", version: "", content: "" });
  };

  const openDialog = (section?: Section) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        name: section.name,
        description: section.description,
        version: section.version,
        content: section.content
      });
    } else {
      setEditingSection(null);
      setFormData({ name: "", description: "", version: "", content: "" });
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate("/group-selection")}
          variant="outline"
          size="sm"
          className="corporate-button-secondary"
        >
          <ArrowLeft size={16} className="mr-2" />
          Nazad na grupe
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-corporate-black">
            Sekcije i Članovi - {groupName}
          </h1>
          <p className="text-corporate-gray-medium mt-1">
            Upravljanje sekcijama dokumenata za grupu "{groupName}"
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="corporate-button-primary flex items-center gap-2"
            >
              <Plus size={16} />
              Nova Sekcija
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-corporate-black">
                {editingSection ? "Izmena Sekcije" : "Nova Sekcija"}
              </DialogTitle>
              <DialogDescription>
                {editingSection 
                  ? "Izmenite podatke o sekciji dokumenta." 
                  : `Kreirajte novu sekciju za grupu "${groupName}".`
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Naziv sekcije</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Unesite naziv sekcije..."
                    className="corporate-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Verzija</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="npr. 1.0, 2.1..."
                    className="corporate-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kratki opis sekcije..."
                  className="corporate-input"
                />
              </div>
              <div className="space-y-2">
                <Label>Sadržaj sekcije</Label>
                <WysiwygEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleSubmit}
                className="corporate-button-primary"
              >
                {editingSection ? "Sačuvaj izmene" : "Kreiraj sekciju"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
        <Input
          placeholder="Pretraga sekcija..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="corporate-input pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredSections.map((section) => (
          <Card key={section.id} className="corporate-card hover:border-corporate-yellow transition-colors duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-corporate-black">{section.name}</CardTitle>
                  <CardDescription className="text-corporate-gray-medium">
                    {section.description}
                  </CardDescription>
                </div>
                <div className="text-right text-sm text-corporate-gray-medium">
                  <p className="font-medium">v{section.version}</p>
                  <p>{section.createdAt}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div 
                  className="text-sm text-corporate-gray-medium max-w-md truncate"
                  dangerouslySetInnerHTML={{ __html: section.content || "Bez sadržaja" }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDialog(section)}
                  className="corporate-button-secondary"
                >
                  Izmeni
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-corporate-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
            <Search className="text-corporate-gray-medium" size={32} />
          </div>
          <h3 className="text-lg font-medium text-corporate-black mb-2">
            Nema sekcija za ovu grupu
          </h3>
          <p className="text-corporate-gray-medium">
            Kreirajte novu sekciju za grupu "{groupName}" ili promenite filter pretrage.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sections;
