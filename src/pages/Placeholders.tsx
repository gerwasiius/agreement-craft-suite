
import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Placeholder } from '@/types/placeholder';
import PlaceholdersTable from '@/components/PlaceholdersTable';
import PlaceholdersPagination from '@/components/PlaceholdersPagination';
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
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<Placeholder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Get unique groups for filter
  const availableGroups = useMemo(() => {
    const groups = Array.from(new Set(mockPlaceholders.map(p => p.group).filter(Boolean)));
    return groups.sort();
  }, []);

  // Filter placeholders based on search term and group
  const filteredPlaceholders = useMemo(() => {
    let filtered = mockPlaceholders;

    // Filter by group
    if (selectedGroup !== 'all') {
      filtered = filtered.filter(placeholder => placeholder.group === selectedGroup);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(placeholder =>
        placeholder.name.toLowerCase().includes(searchLower) ||
        placeholder.displayName.toLowerCase().includes(searchLower) ||
        placeholder.value.toLowerCase().includes(searchLower) ||
        placeholder.description?.toLowerCase().includes(searchLower) ||
        placeholder.type.toLowerCase().includes(searchLower) ||
        placeholder.group?.toLowerCase().includes(searchLower) ||
        placeholder.enumValues?.some(val => val.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [searchTerm, selectedGroup]);

  // Pagination calculations
  const totalItems = filteredPlaceholders.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPlaceholders = filteredPlaceholders.slice(startIndex, startIndex + pageSize);

  // Reset to first page when search or group changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGroup]);

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

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleViewDetails = (placeholder: Placeholder) => {
    setSelectedPlaceholder(placeholder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlaceholder(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-corporate-black mb-2">
          Placeholders
        </h1>
        <p className="text-corporate-gray-medium">
          Browse and copy placeholders for use in document templates
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search placeholders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Group Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {availableGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results summary */}
      <div className="text-sm text-corporate-gray-medium">
        Showing {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of {totalItems} placeholder(s)
        {searchTerm && ` matching "${searchTerm}"`}
        {selectedGroup !== 'all' && ` in group "${selectedGroup}"`}
      </div>

      {/* Table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            All Placeholders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {paginatedPlaceholders.length > 0 ? (
            <>
              <PlaceholdersTable 
                placeholders={paginatedPlaceholders}
                onCopy={copyToClipboard}
                onViewDetails={handleViewDetails}
              />
              <PlaceholdersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No placeholders found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or group filter
              </p>
            </div>
          )}
        </CardContent>
      </Card>

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
