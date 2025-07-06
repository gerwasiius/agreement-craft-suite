import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Placeholder } from '@/types/placeholder';
import PlaceholderGroupCard from '@/components/PlaceholderGroupCard';
import PlaceholderDetailsModal from '@/components/PlaceholderDetailsModal';

// Mock data with expanded properties
const mockPlaceholders: Placeholder[] = [
  {
    id: "Client.Name",
    name: "Name", 
    displayName: "Client Name",
    value: "{{Client.Name}}",
    description: "Full name of the client",
    type: "string",
    isNullable: false,
    group: "Client"
  },
  {
    id: "Client.Email",
    name: "Email",
    displayName: "Email Address",
    value: "{{Client.Email}}",
    description: "Primary email address of the client",
    type: "string",
    isNullable: true,
    group: "Client"
  },
  {
    id: "Client.Phone",
    name: "Phone",
    displayName: "Phone Number",
    value: "{{Client.Phone}}",
    description: "Primary phone number of the client",
    type: "string",
    isNullable: true,
    group: "Client"
  },
  {
    id: "Client.Status",
    name: "Status",
    displayName: "Client Status",
    value: "{{Client.Status}}",
    description: "Current status of the client",
    type: "enum",
    isNullable: false,
    enumValues: ["Active", "Inactive", "Pending", "Suspended"],
    group: "Client"
  },
  {
    id: "Contract.Number",
    name: "Number",
    displayName: "Contract Number",
    value: "{{Contract.Number}}",
    description: "Unique contract identifier",
    type: "string",
    isNullable: false,
    group: "Contract"
  },
  {
    id: "Contract.Date",
    name: "Date",
    displayName: "Contract Date",
    value: "{{Contract.Date}}",
    description: "Date when the contract was signed",
    type: "date",
    isNullable: false,
    group: "Contract"
  },
  {
    id: "Contract.Value",
    name: "Value",
    displayName: "Contract Value",
    value: "{{Contract.Value}}",
    description: "Total monetary value of the contract",
    type: "number",
    isNullable: false,
    group: "Contract"
  },
  {
    id: "Contract.IsActive",
    name: "IsActive",
    displayName: "Is Contract Active",
    value: "{{Contract.IsActive}}",
    description: "Whether the contract is currently active",
    type: "boolean",
    isNullable: false,
    group: "Contract"
  },
  {
    id: "Product.Name",
    name: "Name",
    displayName: "Product Name",
    value: "{{Product.Name}}",
    description: "Name of the product",
    type: "string",
    isNullable: false,
    group: "Product"
  },
  {
    id: "Product.Price",
    name: "Price",
    displayName: "Product Price",
    value: "{{Product.Price}}",
    description: "Price of the product",
    type: "number",
    isNullable: false,
    group: "Product"
  },
  {
    id: "Product.Category",
    name: "Category",
    displayName: "Product Category",
    value: "{{Product.Category}}",
    description: "Category classification of the product",
    type: "enum",
    isNullable: false,
    enumValues: ["Electronics", "Clothing", "Books", "Home", "Sports"],
    group: "Product"
  },
  {
    id: "Product.Description",
    name: "Description",
    displayName: "Product Description",
    value: "{{Product.Description}}",
    description: "Detailed description of the product",
    type: "string",
    isNullable: true,
    group: "Product"
  }
];

const Placeholders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<Placeholder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Group placeholders by group
  const groupedPlaceholders = useMemo(() => {
    const groups = new Map<string, Placeholder[]>();
    
    mockPlaceholders.forEach(placeholder => {
      const groupName = placeholder.group || 'Other';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)!.push(placeholder);
    });

    return Array.from(groups.entries()).map(([name, placeholders]) => ({
      name,
      placeholders: placeholders.filter(p => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(searchLower) ||
          p.displayName.toLowerCase().includes(searchLower) ||
          p.value.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.type.toLowerCase().includes(searchLower) ||
          p.enumValues?.some(val => val.toLowerCase().includes(searchLower))
        );
      })
    })).filter(group => group.placeholders.length > 0);
  }, [searchTerm]);

  // Reset to first group when search changes
  React.useEffect(() => {
    setCurrentGroupIndex(0);
  }, [searchTerm]);

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: `"${value}" has been copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (placeholder: Placeholder) => {
    setSelectedPlaceholder(placeholder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlaceholder(null);
  };

  const currentGroup = groupedPlaceholders[currentGroupIndex];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-corporate-black mb-2">
          Placeholders
        </h1>
        <p className="text-corporate-gray-medium">
          Browse placeholders by group - {groupedPlaceholders.length} group(s) available
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search placeholders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Group Navigation */}
      {groupedPlaceholders.length > 0 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentGroupIndex(Math.max(0, currentGroupIndex - 1))}
            disabled={currentGroupIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Group
          </Button>
          
          <div className="text-sm text-gray-600">
            Group {currentGroupIndex + 1} of {groupedPlaceholders.length}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setCurrentGroupIndex(Math.min(groupedPlaceholders.length - 1, currentGroupIndex + 1))}
            disabled={currentGroupIndex === groupedPlaceholders.length - 1}
          >
            Next Group
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Current Group Card */}
      {currentGroup ? (
        <PlaceholderGroupCard
          group={currentGroup}
          onCopy={copyToClipboard}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No placeholders found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {/* Details Modal */}
      <PlaceholderDetailsModal
        placeholder={selectedPlaceholder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCopy={copyToClipboard}
      />
    </div>
  );
};

export default Placeholders;
