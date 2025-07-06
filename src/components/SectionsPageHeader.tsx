import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SectionFormDialog from "./SectionFormDialog";
import { Section, SectionFormData } from "@/types/section";

interface SectionsPageHeaderProps {
  groupName: string;
  onBackClick: () => void;
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  editingSection: Section | null;
  formData: SectionFormData;
  onFormDataChange: (data: SectionFormData) => void;
  onSubmit: () => void;
  onNewSectionClick: () => void;
}

export const SectionsPageHeader = ({
  groupName,
  onBackClick,
  isDialogOpen,
  onDialogOpenChange,
  editingSection,
  formData,
  onFormDataChange,
  onSubmit,
  onNewSectionClick
}: SectionsPageHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={onBackClick}
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
      <div onClick={onNewSectionClick}>
        <SectionFormDialog
          isOpen={isDialogOpen}
          onOpenChange={onDialogOpenChange}
          editingSection={editingSection}
          formData={formData}
          onFormDataChange={onFormDataChange}
          onSubmit={onSubmit}
          groupName={groupName}
        />
      </div>
    </div>
  );
};
