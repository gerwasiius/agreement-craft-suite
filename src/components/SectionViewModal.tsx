
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionVersion } from "@/types/section";
import { History, Eye } from "lucide-react";
import { useState } from "react";

interface SectionViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | null;
}

export const SectionViewModal = ({ isOpen, onOpenChange, section }: SectionViewModalProps) => {
  const [selectedVersion, setSelectedVersion] = useState<SectionVersion | null>(null);

  if (!section) return null;

  const handleVersionSelect = (version: SectionVersion) => {
    setSelectedVersion(version);
  };

  const handleBackToMain = () => {
    setSelectedVersion(null);
  };

  const currentContent = selectedVersion ? selectedVersion.content : section.content;
  const currentVersionInfo = selectedVersion ? selectedVersion : {
    version: section.version,
    createdAt: section.createdAt,
    createdBy: "Trenutni korisnik"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-corporate-black flex items-center gap-3">
            {selectedVersion ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToMain}
                  className="p-1 h-auto"
                >
                  ← Nazad
                </Button>
                {section.name} - v{selectedVersion.version}
              </>
            ) : (
              <>
                {section.name}
                <Badge variant={section.isActive ? "default" : "secondary"}>
                  {section.isActive ? "Aktivna" : "Neaktivna"}
                </Badge>
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-6 py-4">
          {/* Main content area */}
          <div className="flex-1 space-y-6">
            {!selectedVersion && (
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
            )}
            
            {!selectedVersion && (
              <div className="space-y-2">
                <h4 className="font-medium text-corporate-black">Opis</h4>
                <p className="text-corporate-gray-medium">{section.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-corporate-black">Datum kreiranja</h4>
                <p className="text-corporate-gray-medium">{currentVersionInfo.createdAt}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-corporate-black">
                  {selectedVersion ? "Verzija" : "Status"}
                </h4>
                {selectedVersion ? (
                  <p className="text-corporate-gray-medium">v{selectedVersion.version}</p>
                ) : (
                  <Badge variant={section.isActive ? "default" : "secondary"}>
                    {section.isActive ? "Aktivna verzija" : "Neaktivna verzija"}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-corporate-black">
                {selectedVersion ? `Sadržaj verzije v${selectedVersion.version}` : "Sadržaj sekcije"}
              </h4>
              <div 
                className="border rounded-md p-4 bg-gray-50 min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: currentContent || "Bez sadržaja" }}
              />
            </div>
          </div>

          {/* Previous versions sidebar - simplified version list */}
          {!selectedVersion && section.previousVersions && section.previousVersions.length > 0 && (
            <div className="w-64 border-l pl-4">
              <div className="flex items-center gap-2 mb-4">
                <History size={16} className="text-corporate-gray-medium" />
                <h4 className="font-medium text-corporate-black">Prethodne verzije</h4>
              </div>
              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {section.previousVersions.map((version) => (
                  <li
                    key={version.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                    onClick={() => handleVersionSelect(version)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">v{version.version}</span>
                      <span className="text-xs text-corporate-gray-medium">{version.createdAt}</span>
                    </div>
                    <div className="text-xs text-corporate-gray-medium truncate">
                      {version.createdBy}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
