
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { SectionFormDialog } from "@/components/SectionFormDialog";
import { SectionPreviewModal } from "@/components/SectionPreviewModal";
import { SectionsEmptyState } from "@/components/SectionsEmptyState";
import { Section } from "@/types/section";

const Sections = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get group name from URL params
  const searchParams = new URLSearchParams(location.search);
  const groupName = searchParams.get('groupName') || 'Nepoznata grupa';

  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Osnove ugovora o radu",
      description: "Osnovni elementi i struktura ugovora o radu",
      content: "<p>Ovaj ugovor definiše osnove radnog odnosa između poslodavca i zaposlenog...</p>",
      groupId: groupId || "1",
      version: "1.0",
      createdAt: "2024-01-15",
      isActive: true
    },
    {
      id: "2", 
      name: "Radni odnos na određeno vrijeme",
      description: "Specifičnosti ugovora na određeno vrijeme",
      content: "<p>Ugovor o radu na određeno vrijeme se zaključuje u slučajevima...</p>",
      groupId: groupId || "1",
      version: "1.2",
      createdAt: "2024-01-20",
      isActive: true
    },
    {
      id: "3",
      name: "Uslovi i obaveze zaposlenog",
      description: "Detaljan opis uslova rada i obaveza",
      content: "<p>Zaposleni se obavezuje da svoje radne zadatke izvršava savjesno...</p>",
      groupId: groupId || "1", 
      version: "2.0",
      createdAt: "2024-02-01",
      isActive: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [previewSection, setPreviewSection] = useState<Section | null>(null);

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSection = (sectionData: Partial<Section>) => {
    const newSection: Section = {
      id: Date.now().toString(),
      name: sectionData.name || "",
      description: sectionData.description || "",
      content: sectionData.content || "",
      groupId: groupId || "1",
      version: "1.0", 
      createdAt: new Date().toISOString().split('T')[0],
      isActive: sectionData.isActive ?? true
    };
    
    setSections([...sections, newSection]);
    setIsFormOpen(false);
  };

  const handleEditSection = (sectionData: Partial<Section>) => {
    if (!editingSection) return;
    
    setSections(sections.map(s => 
      s.id === editingSection.id 
        ? { ...s, ...sectionData }
        : s
    ));
    setEditingSection(null);
    setIsFormOpen(false);
  };

  const openEditForm = (section: Section) => {
    setEditingSection(section);
    setIsFormOpen(true);
  };

  const openPreview = (section: Section) => {
    setPreviewSection(section);
    setIsPreviewOpen(true);
  };

  const openCreateForm = () => {
    setEditingSection(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/groups')}
          className="flex items-center gap-2 text-corporate-gray-medium hover:text-corporate-black"
        >
          <ArrowLeft size={16} />
          Nazad na grupe
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-corporate-black">
            {decodeURIComponent(groupName)}
          </h1>
          <p className="text-corporate-gray-medium mt-1">
            Upravljanje sekcijama unutar grupe
          </p>
        </div>
        <Button onClick={openCreateForm} className="corporate-button-primary flex items-center gap-2">
          <Plus size={16} />
          Nova Sekcija
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
          <Input
            placeholder="Pretraga sekcija..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="corporate-input pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onEdit={openEditForm}
            onPreview={openPreview}
          />
        ))}
      </div>

      {filteredSections.length === 0 && (
        <SectionsEmptyState 
          searchTerm={searchTerm}
          onCreateSection={openCreateForm}
        />
      )}

      <SectionFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingSection(null);
        }}
        onSubmit={editingSection ? handleEditSection : handleCreateSection}
        editingSection={editingSection}
      />

      <SectionPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewSection(null);
        }}
        section={previewSection}
      />
    </div>
  );
};

export default Sections;
