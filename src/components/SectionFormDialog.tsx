import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Section } from '@/types/section';
import { Placeholder } from '@/types/placeholder';

interface SectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (section: Section) => void;
  initialValues?: Section;
}

const SectionFormDialog = ({ isOpen, onClose, onSubmit, initialValues }: SectionFormDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedPlaceholders, setSelectedPlaceholders] = useState<string[]>([]);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setDescription(initialValues.description || '');
      setContent(initialValues.content);
      setSelectedPlaceholders(initialValues.placeholders || []);
    } else {
      // Reset form fields when opening in create mode
      setName('');
      setDescription('');
      setContent('');
      setSelectedPlaceholders([]);
    }
  }, [initialValues, isOpen]);

  const handleSubmit = () => {
    const sectionData: Section = {
      id: initialValues?.id || Math.random().toString(36).substring(7),
      name: name,
      description: description,
      content: content,
      placeholders: selectedPlaceholders,
    };
    onSubmit(sectionData);
    onClose();
  };

  const togglePlaceholder = (placeholderId: string) => {
    setSelectedPlaceholders((prev) =>
      prev.includes(placeholderId)
        ? prev.filter((id) => id !== placeholderId)
        : [...prev, placeholderId]
    );
  };

  const mockPlaceholders: Placeholder[] = [
    {
      id: "Client.Name",
      name: "Name",
      displayName: "Client Name",
      value: "{{Client.Name}}",
      type: "string",
      isNullable: false,
      group: "Client"
    },
    {
      id: "Client.Email",
      name: "Email",
      displayName: "Client Email",
      value: "{{Client.Email}}",
      type: "string",
      isNullable: true,
      group: "Client"
    },
    {
      id: "Client.Phone",
      name: "Phone",
      displayName: "Client Phone",
      value: "{{Client.Phone}}",
      type: "string",
      isNullable: true,
      group: "Client"
    },
    {
      id: "Client.Status",
      name: "Status",
      displayName: "Client Status",
      value: "{{Client.Status}}",
      type: "enum",
      isNullable: false,
      enumValues: ["Active", "Inactive"],
      group: "Client"
    },
    // Contract placeholders
    {
      id: "Contract.Number",
      name: "Number",
      displayName: "Contract Number",
      value: "{{Contract.Number}}",
      type: "string",
      isNullable: false,
      group: "Contract"
    },
    {
      id: "Contract.Date",
      name: "Date",
      displayName: "Contract Date",
      value: "{{Contract.Date}}",
      type: "date",
      isNullable: false,
      group: "Contract"
    },
    {
      id: "Contract.Value",
      name: "Value",
      displayName: "Contract Value",
      value: "{{Contract.Value}}",
      type: "number",
      isNullable: false,
      group: "Contract"
    },
    // Product placeholders
    {
      id: "Product.Name",
      name: "Name",
      displayName: "Product Name",
      value: "{{Product.Name}}",
      type: "string",
      isNullable: false,
      group: "Product"
    },
    {
      id: "Product.Price",
      name: "Price",
      displayName: "Product Price",
      value: "{{Product.Price}}",
      type: "number",
      isNullable: false,
      group: "Product"
    },
    {
      id: "Product.Category",
      name: "Category",
      displayName: "Product Category",
      value: "{{Product.Category}}",
      type: "enum",
      isNullable: false,
      enumValues: ["Electronics", "Clothing"],
      group: "Product"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{initialValues ? 'Edit Section' : 'Create Section'}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right mt-2">
              Content
            </Label>
            <div className="col-span-3">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full"
                rows={5}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">
              Placeholders
            </Label>
            <div className="col-span-3 space-y-2">
              {mockPlaceholders.map((placeholder) => (
                <div key={placeholder.id} className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id={placeholder.id}
                    checked={selectedPlaceholders.includes(placeholder.id)}
                    onChange={() => togglePlaceholder(placeholder.id)}
                  />
                  <Label htmlFor={placeholder.id} className="cursor-pointer">
                    {placeholder.displayName} ({placeholder.name})
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" onClick={handleSubmit}>
            {initialValues ? 'Update Section' : 'Create Section'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectionFormDialog;
