
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WysiwygEditor } from "@/components/WysiwygEditor";
import { Plus } from "lucide-react";
import { Section, SectionFormData } from "@/types/section";

interface SectionFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingSection: Section | null;
  formData: SectionFormData;
  onFormDataChange: (data: SectionFormData) => void;
  onSubmit: () => void;
  groupName: string;
}

export const SectionFormDialog = ({
  isOpen,
  onOpenChange,
  editingSection,
  formData,
  onFormDataChange,
  onSubmit,
  groupName
}: SectionFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="corporate-button-primary flex items-center gap-2">
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
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                placeholder="Unesite naziv sekcije..."
                className="corporate-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Verzija</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => onFormDataChange({ ...formData, version: e.target.value })}
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
              onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
              placeholder="Kratki opis sekcije..."
              className="corporate-input"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => onFormDataChange({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Aktivna sekcija</Label>
          </div>
          <div className="space-y-2">
            <Label>Sadržaj sekcije</Label>
            <WysiwygEditor
              content={formData.content}
              onChange={(content) => onFormDataChange({ ...formData, content })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={onSubmit}
            className="corporate-button-primary"
          >
            {editingSection ? "Sačuvaj izmene" : "Kreiraj sekciju"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
