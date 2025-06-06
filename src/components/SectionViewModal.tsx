
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/types/section";

interface SectionViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | null;
}

export const SectionViewModal = ({ isOpen, onOpenChange, section }: SectionViewModalProps) => {
  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-corporate-black flex items-center gap-3">
            {section.name}
            <Badge variant={section.isActive ? "default" : "secondary"}>
              {section.isActive ? "Aktivna" : "Neaktivna"}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-corporate-black">Naziv sekcije</h4>
              <p className="text-corporate-gray-medium">{section.name}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-corporate-black">Verzija</h4>
              <p className="text-corporate-gray-medium">v{section.version}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-corporate-black">Opis</h4>
            <p className="text-corporate-gray-medium">{section.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-corporate-black">Datum kreiranja</h4>
              <p className="text-corporate-gray-medium">{section.createdAt}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-corporate-black">Status</h4>
              <Badge variant={section.isActive ? "default" : "secondary"}>
                {section.isActive ? "Aktivna verzija" : "Neaktivna verzija"}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-corporate-black">Sadržaj sekcije</h4>
            <div 
              className="border rounded-md p-4 bg-gray-50 min-h-[200px]"
              dangerouslySetInnerHTML={{ __html: section.content || "Bez sadržaja" }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
