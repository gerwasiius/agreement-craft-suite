
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get unique groups for filter
  const availableGroups = useMemo(() => {
    const groups = Array.from(new Set(availableSections.map(s => s.groupName)));
    return groups.sort();
  }, [availableSections]);

  // Filter and search logic
  const filteredSections = useMemo(() => {
    return availableSections.filter(section => {
      // Search filter - search in both section name and group name
      const matchesSearch = searchTerm === "" || 
        section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.groupName.toLowerCase().includes(searchTerm.toLowerCase());

      // Group filter
      const matchesGroup = groupFilter === "all" || section.groupName === groupFilter;

      return matchesSearch && matchesGroup;
    });
  }, [availableSections, searchTerm, groupFilter]);

  const toggleSectionSelection = (sectionId: string) => {
    setSelectedSectionIds(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGroupFilter("all");
    setStatusFilter("all");
  };

  const handleConfirm = () => {
    const selectedSections = filteredSections
      .filter(section => selectedSectionIds.includes(section.id))
      .map(section => ({
        id: section.id,
        name: section.name,
        content: section.description, // This would be actual content in real app
        conditions: []
      }));
    
    onSectionsSelected(selectedSections);
    
    // Reset state
    setSearchTerm("");
    setSelectedSectionIds([]);
    setGroupFilter("all");
    setStatusFilter("all");
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset state
    setSearchTerm("");
    setSelectedSectionIds([]);
    setGroupFilter("all");
    setStatusFilter("all");
  };

  const selectedCount = selectedSectionIds.length;
  const hasActiveFilters = searchTerm || groupFilter !== "all" || statusFilter !== "all";

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle className="text-corporate-black">Dodaj sekcije u template</DialogTitle>
          <DialogDescription>
            Pretražite i odaberite sekcije koje želite da dodate u template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
              <Input
                placeholder="Pretražite sekcije i grupe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="corporate-input pl-10"
              />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-corporate-gray-medium" />
                <Label className="text-sm">Filteri:</Label>
              </div>
              
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sve grupe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sve grupe</SelectItem>
                  {availableGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="flex items-center gap-1"
                >
                  <X size={14} />
                  Očisti filtere
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="border rounded-md">
            <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-corporate-gray-medium">
                {filteredSections.length} sekcija pronađeno
                {selectedCount > 0 && ` • ${selectedCount} odabrano`}
              </span>
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

            <div className="max-h-[400px] overflow-y-auto">
              {filteredSections.length === 0 ? (
                <div className="text-center py-8 text-corporate-gray-medium">
                  <p>Nema sekcija koje odgovaraju pretrazi i filterima</p>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="mt-2"
                    >
                      Očisti filtere
                    </Button>
                  )}
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-corporate-black">{section.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {section.groupName}
                            </Badge>
                          </div>
                          <p className="text-sm text-corporate-gray-medium">{section.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-corporate-gray-medium">
              {selectedCount} sekcija odabrano
            </span>
            <div className="flex gap-2">
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
