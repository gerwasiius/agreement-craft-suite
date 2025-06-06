
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Section, SectionFormData } from "@/types/section";
import { SectionsPageHeader } from "@/components/SectionsPageHeader";
import { SectionCard } from "@/components/SectionCard";
import { SectionsEmptyState } from "@/components/SectionsEmptyState";
import { SectionViewModal } from "@/components/SectionViewModal";

const Sections = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const groupName = location.state?.groupName || "Nepoznata grupa";

  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Osnovna sekcija ugovora",
      description: "Osnove informacije o ugovoru",
      groupId: "1",
      version: "1.0",
      content: "<p>Ovo je osnovna sekcija koja sadrži <strong>važne informacije</strong> o ugovoru.</p>",
      createdAt: "2024-01-15",
      isActive: true
    },
    {
      id: "2",
      name: "Uslovi plaćanja",
      description: "Detaljni uslovi plaćanja i rokovi",
      groupId: "1",
      version: "2.1",
      content: "<p>Uslovi plaćanja se definišu ovde sa <em>preciznim</em> rokovima.</p>",
      createdAt: "2024-01-16",
      isActive: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [viewingSection, setViewingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState<SectionFormData>({
    name: "",
    description: "",
    version: "",
    content: "",
    isActive: true
  });

  useEffect(() => {
    if (!groupId) {
      navigate("/group-selection");
    }
  }, [groupId, navigate]);

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
              content: formData.content,
              isActive: formData.isActive
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
        createdAt: new Date().toISOString().split('T')[0],
        isActive: formData.isActive
      };
      setSections([...sections, newSection]);
    }
    setIsDialogOpen(false);
    setEditingSection(null);
    setFormData({ name: "", description: "", version: "", content: "", isActive: true });
  };

  const openDialog = (section?: Section) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        name: section.name,
        description: section.description,
        version: section.version,
        content: section.content,
        isActive: section.isActive
      });
    } else {
      setEditingSection(null);
      setFormData({ name: "", description: "", version: "", content: "", isActive: true });
    }
    setIsDialogOpen(true);
  };

  const openViewModal = (section: Section) => {
    setViewingSection(section);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <SectionsPageHeader
        groupName={groupName}
        onBackClick={() => navigate("/group-selection")}
        isDialogOpen={isDialogOpen}
        onDialogOpenChange={setIsDialogOpen}
        editingSection={editingSection}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onNewSectionClick={() => openDialog()}
      />

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
          <SectionCard
            key={section.id}
            section={section}
            onEdit={openDialog}
            onView={openViewModal}
          />
        ))}
      </div>

      {filteredSections.length === 0 && (
        <SectionsEmptyState groupName={groupName} />
      )}

      <SectionViewModal
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        section={viewingSection}
      />
    </div>
  );
};

export default Sections;
