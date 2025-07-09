
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Section } from '@/types/section';
import { WysiwygEditor } from './WysiwygEditor';
import { PlaceholderList } from './PlaceholderList';
import { PlaceholderGroup } from '@/types/placeholder';

interface SectionFormDialogProps {
  onSave: (section: Omit<Section, 'id'>) => void;
  trigger?: React.ReactNode;
}

// Mock placeholder data - same structure as in Placeholders page
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
        id: "Client.Address",
        name: "Address",
        displayName: "Adresa",
        value: "{{Client.Address}}",
        description: "Adresa klijenta",
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
        id: "Contract.Duration",
        name: "Duration",
        displayName: "Trajanje ugovora",
        value: "{{Contract.Duration}}",
        description: "Period trajanja ugovora",
        type: "string",
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
        id: "Employee.Department",
        name: "Department",
        displayName: "Odjel",
        value: "{{Employee.Department}}",
        description: "Odjel u kojem zaposleni radi",
        type: "string",
        isNullable: false,
        group: "Employee"
      },
      {
        id: "Employee.StartDate",
        name: "StartDate",
        displayName: "Datum početka rada",
        value: "{{Employee.StartDate}}",
        description: "Datum kad je zaposleni počeo raditi",
        type: "date",
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
        id: "Company.Phone",
        name: "Phone",
        displayName: "Telefon kompanije",
        value: "{{Company.Phone}}",
        description: "Kontakt telefon kompanije",
        type: "string",
        isNullable: false,
        group: "Company"
      },
      {
        id: "Company.Email",
        name: "Email",
        displayName: "Email kompanije",
        value: "{{Company.Email}}",
        description: "Kontakt email kompanije",
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

const SectionFormDialog = ({ onSave, trigger }: SectionFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    order: 0,
    groupId: '',
    version: '1.0',
    createdAt: new Date().toISOString().split('T')[0],
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    });
    setOpen(false);
    setFormData({ 
      name: '', 
      description: '', 
      content: '', 
      order: 0, 
      groupId: '', 
      version: '1.0', 
      createdAt: new Date().toISOString().split('T')[0], 
      isActive: true 
    });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Nova sekcija</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Placeholder Sidebar */}
          <div className="w-80 flex-shrink-0 border-r border-gray-200 pr-4 overflow-y-auto">
            <PlaceholderList placeholderGroups={mockPlaceholderGroups} />
          </div>
          
          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Naziv sekcije</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content">Sadržaj</Label>
                <WysiwygEditor
                  content={formData.content}
                  onChange={handleContentChange}
                />
              </div>
              <div>
                <Label htmlFor="order">Redoslijed</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Otkaži
                </Button>
                <Button type="submit">Sačuvaj sekciju</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectionFormDialog;
