
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/types/section";

interface SectionPreviewModalProps {
  section: Section | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SectionPreviewModal = ({ section, isOpen, onOpenChange }: SectionPreviewModalProps) => {
  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-corporate-black">
              Pregled Sekcije
            </DialogTitle>
            <Badge 
              variant={section.isActive ? "default" : "secondary"}
              className={section.isActive ? "bg-green-500" : "bg-gray-400"}
            >
              {section.isActive ? "Aktivna" : "Neaktivna"}
            </Badge>
          </div>
          <DialogDescription>
            Pregled detalja sekcije "{section.name}".
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-corporate-black">Naziv sekcije</label>
              <div className="p-3 bg-gray-50 rounded-md border text-sm">
                {section.name}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-corporate-black">Verzija</label>
              <div className="p-3 bg-gray-50 rounded-md border text-sm">
                {section.version}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-corporate-black">Opis</label>
            <div className="p-3 bg-gray-50 rounded-md border text-sm">
              {section.description}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-corporate-black">Sadržaj sekcije</label>
            <div className="p-3 bg-gray-50 rounded-md border text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: section.content || "Bez sadržaja" }} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-corporate-black">Kreiran</label>
              <div className="p-3 bg-gray-50 rounded-md border text-sm">
                {section.createdAt}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-corporate-black">Status</label>
              <div className="p-3 bg-gray-50 rounded-md border text-sm">
                {section.isActive ? "Aktivna sekcija" : "Neaktivna sekcija"}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
