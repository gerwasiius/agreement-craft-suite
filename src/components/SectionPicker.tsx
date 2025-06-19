
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Users } from "lucide-react";

interface SectionPickerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  availableSections: Array<{
    id: string;
    name: string;
    description: string;
    groupName: string;
  }>;
  onSectionsSelected: (sections: Array<{
    id: string;
    name: string;
    content: string;
    conditions: any[];
  }>) => void;
}

export const SectionPicker = ({
  isOpen,
  onOpenChange,
  availableSections,
  onSectionsSelected
}: SectionPickerProps) => {
  const [step, setStep] = useState<'groups' | 'sections'>('groups');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);

  // Get unique groups with section count
  const availableGroups = useMemo(() => {
    const groupMap = new Map();
    availableSections.forEach(section => {
      if (!groupMap.has(section.groupName)) {
        groupMap.set(section.groupName, { name: section.groupName, sectionCount: 0 });
      }
      groupMap.get(section.groupName).sectionCount++;
    });
    return Array.from(groupMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [availableSections]);

  // Filter sections from selected group
  const sectionsInGroup = useMemo(() => {
    if (!selectedGroup) return [];
    return availableSections.filter(section => section.groupName === selectedGroup);
  }, [availableSections, selectedGroup]);

  // Filter sections by search term
  const filteredSections = useMemo(() => {
    return sectionsInGroup.filter(section => 
      searchTerm === "" || 
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sectionsInGroup, searchTerm]);

  const handleGroupSelect = (groupName: string) => {
    setSelectedGroup(groupName);
    setStep('sections');
    setSearchTerm("");
    setSelectedSectionIds([]);
  };

  const handleBackToGroups = () => {
    setStep('groups');
    setSelectedGroup(null);
    setSearchTerm("");
    setSelectedSectionIds([]);
  };

  const toggleSectionSelection = (sectionId: string) => {
    setSelectedSectionIds(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSectionIds.length === filteredSections.length) {
      setSelectedSectionIds([]);
    } else {
      setSelectedSectionIds(filteredSections.map(s => s.id));
    }
  };

  const handleConfirm = () => {
    const selectedSections = filteredSections
      .filter(section => selectedSectionIds.includes(section.id))
      .map(section => ({
        id: section.id,
        name: section.name,
        content: section.description,
        conditions: []
      }));
    
    onSectionsSelected(selectedSections);
    
    // Reset state
    setStep('groups');
    setSelectedGroup(null);
    setSearchTerm("");
    setSelectedSectionIds([]);
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset state
    setStep('groups');
    setSelectedGroup(null);
    setSearchTerm("");
    setSelectedSectionIds([]);
  };

  const selectedCount = selectedSectionIds.length;

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle className="text-corporate-black flex items-center gap-2">
            {step === 'sections' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToGroups}
                className="p-1 h-auto"
              >
                <ArrowLeft size={16} />
              </Button>
            )}
            {step === 'groups' ? 'Odaberite grupu' : `Sekcije: ${selectedGroup}`}
          </DialogTitle>
          <DialogDescription>
            {step === 'groups' 
              ? 'Prvo odaberite grupu sekcija koje želite da dodate.'
              : 'Odaberite sekcije koje želite da dodate u template.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 'groups' ? (
            /* Groups Selection */
            <div className="space-y-3">
              <div className="border rounded-md">
                <div className="p-3 border-b bg-gray-50">
                  <span className="text-sm text-corporate-gray-medium flex items-center gap-2">
                    <Users size={16} />
                    {availableGroups.length} grupa dostupno
                  </span>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  <div className="divide-y">
                    {availableGroups.map((group) => (
                      <div 
                        key={group.name}
                        className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleGroupSelect(group.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-corporate-black">{group.name}</h3>
                            <p className="text-sm text-corporate-gray-medium">
                              {group.sectionCount} sekcija
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {group.sectionCount}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Sections Selection */
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
                <Input
                  placeholder="Pretražite sekcije..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="corporate-input pl-10"
                />
              </div>

              <div className="border rounded-md">
                <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                  <span className="text-sm text-corporate-gray-medium">
                    {filteredSections.length} sekcija pronađeno
                    {selectedCount > 0 && ` • ${selectedCount} odabrano`}
                  </span>
                  <div className="flex gap-2">
                    {filteredSections.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSelectAll}
                        className="text-xs"
                      >
                        {selectedSectionIds.length === filteredSections.length ? 'Poništi sve' : 'Odaberi sve'}
                      </Button>
                    )}
                    {selectedCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedSectionIds([])}
                        className="text-xs"
                      >
                        Poništi odabir
                      </Button>
                    )}
                  </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  {filteredSections.length === 0 ? (
                    <div className="text-center py-8 text-corporate-gray-medium">
                      <p>
                        {searchTerm 
                          ? "Nema sekcija koje odgovaraju pretrazi" 
                          : "Nema sekcija u ovoj grupi"
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredSections.map((section) => (
                        <div 
                          key={section.id} 
                          className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => toggleSectionSelection(section.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={selectedSectionIds.includes(section.id)}
                              onChange={() => toggleSectionSelection(section.id)}
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-corporate-black">{section.name}</h3>
                              <p className="text-sm text-corporate-gray-medium mt-1">{section.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            {step === 'sections' ? (
              <>
                <span className="text-sm text-corporate-gray-medium">
                  {selectedCount} sekcija odabrano
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleBackToGroups}>
                    Nazad
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Otkaži
                  </Button>
                  <Button 
                    onClick={handleConfirm}
                    disabled={selectedCount === 0}
                    className="corporate-button-primary"
                  >
                    Dodaj odabrane sekcije ({selectedCount})
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={handleCancel}>
                  Otkaži
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
