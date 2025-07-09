
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { PlaceholderGroup, Placeholder } from "@/types/placeholder";

interface PlaceholderPickerProps {
  onSelect: (placeholder: Placeholder) => void;
  selectedValue?: string;
  trigger?: React.ReactNode;
}

// Mock placeholder data - isti kao u PlaceholderList
const mockPlaceholderGroups: PlaceholderGroup[] = [
  {
    id: "client",
    name: "Klijent",
    placeholders: [
      {
        id: "Client.Name",
        name: "Name",
        displayName: "Ime klijenta",
        value: "{{Client.Name}}",
        description: "Puno ime klijenta",
        type: "string",
        isNullable: false,
        group: "Client"
      },
      {
        id: "Client.Email",
        name: "Email", 
        displayName: "Email adresa",
        value: "{{Client.Email}}",
        description: "Primarna email adresa klijenta",
        type: "string",
        isNullable: true,
        group: "Client"
      },
      {
        id: "Client.Phone",
        name: "Phone",
        displayName: "Broj telefona",
        value: "{{Client.Phone}}",
        description: "Primarni broj telefona klijenta",
        type: "string",
        isNullable: true,
        group: "Client"
      },
      {
        id: "Client.Status",
        name: "Status",
        displayName: "Status klijenta",
        value: "{{Client.Status}}",
        description: "Trenutni status klijenta",
        type: "enum",
        isNullable: false,
        enumValues: ["Aktivan", "Neaktivan", "Na čekanju", "Suspendovan"],
        group: "Client"
      }
    ]
  },
  {
    id: "contract",
    name: "Ugovor",
    placeholders: [
      {
        id: "Contract.Number",
        name: "Number",
        displayName: "Broj ugovora",
        value: "{{Contract.Number}}",
        description: "Jedinstveni identifikator ugovora",
        type: "string",
        isNullable: false,
        group: "Contract"
      },
      {
        id: "Contract.Date",
        name: "Date",
        displayName: "Datum ugovora",
        value: "{{Contract.Date}}",
        description: "Datum potpisivanja ugovora",
        type: "date",
        isNullable: false,
        group: "Contract"
      },
      {
        id: "Contract.Value",
        name: "Value",
        displayName: "Vrijednost ugovora", 
        value: "{{Contract.Value}}",
        description: "Ukupna monetarna vrijednost ugovora",
        type: "number",
        isNullable: false,
        group: "Contract"
      },
      {
        id: "Contract.IsActive",
        name: "IsActive",
        displayName: "Da li je ugovor aktivan",
        value: "{{Contract.IsActive}}",
        description: "Da li je ugovor trenutno aktivan",
        type: "boolean",
        isNullable: false,
        group: "Contract"
      }
    ]
  },
  {
    id: "employee",
    name: "Zaposleni",
    placeholders: [
      {
        id: "Employee.Name",
        name: "Name",
        displayName: "Ime zaposlenog",
        value: "{{Employee.Name}}",
        description: "Puno ime zaposlenog",
        type: "string",
        isNullable: false,
        group: "Employee"
      },
      {
        id: "Employee.Position",
        name: "Position",
        displayName: "Pozicija",
        value: "{{Employee.Position}}",
        description: "Radna pozicija zaposlenog",
        type: "string",
        isNullable: false,
        group: "Employee"
      },
      {
        id: "Employee.Salary",
        name: "Salary",
        displayName: "Plata",
        value: "{{Employee.Salary}}",
        description: "Mjesečna plata zaposlenog",
        type: "number",
        isNullable: false,
        group: "Employee"
      }
    ]
  },
  {
    id: "company",
    name: "Kompanija",
    placeholders: [
      {
        id: "Company.Name",
        name: "Name",
        displayName: "Ime kompanije",
        value: "{{Company.Name}}",
        description: "Naziv kompanije",
        type: "string",
        isNullable: false,
        group: "Company"
      },
      {
        id: "Company.Address",
        name: "Address",
        displayName: "Adresa kompanije",
        value: "{{Company.Address}}",
        description: "Adresa sjedišta kompanije",
        type: "string",
        isNullable: false,
        group: "Company"
      },
      {
        id: "Company.TaxNumber",
        name: "TaxNumber",
        displayName: "Poreski broj",
        value: "{{Company.TaxNumber}}",
        description: "Poreski identifikacijski broj kompanije",
        type: "string",
        isNullable: false,
        group: "Company"
      }
    ]
  }
];

export const PlaceholderPicker = ({ onSelect, selectedValue, trigger }: PlaceholderPickerProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSelect = (placeholder: Placeholder) => {
    onSelect(placeholder);
    setOpen(false);
  };

  const filteredGroups = mockPlaceholderGroups.map(group => ({
    ...group,
    placeholders: group.placeholders.filter(p => 
      !searchTerm || 
      p.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.placeholders.length > 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="justify-start text-left">
            {selectedValue || "Odaberite placeholder..."}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle>Odaberite Placeholder</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
            <Input
              placeholder="Pretraži placeholdere..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Groups */}
          <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
            {filteredGroups.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-md">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 transition-colors"
                >
                  {expandedGroups.includes(group.id) ? (
                    <ChevronDown size={16} className="text-corporate-gray-medium" />
                  ) : (
                    <ChevronRight size={16} className="text-corporate-gray-medium" />
                  )}
                  <span className="text-sm font-medium text-corporate-black">
                    {group.name} ({group.placeholders.length})
                  </span>
                </button>
                
                {expandedGroups.includes(group.id) && (
                  <div className="pb-2">
                    {group.placeholders.map((placeholder) => (
                      <button
                        key={placeholder.id}
                        onClick={() => handleSelect(placeholder)}
                        className="w-full text-left p-3 ml-6 mr-2 rounded hover:bg-corporate-yellow/10 transition-colors border-l-2 border-gray-200"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-corporate-black">
                            {placeholder.displayName}
                          </div>
                          <div className="text-xs text-corporate-gray-medium">
                            {placeholder.value}
                          </div>
                          {placeholder.description && (
                            <div className="text-xs text-corporate-gray-light">
                              {placeholder.description}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
