
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlaceholderGroup, Placeholder } from '@/types/placeholder';
import PlaceholdersTable from '@/components/PlaceholdersTable';
import PlaceholdersPagination from '@/components/PlaceholdersPagination';

// Mock data with expanded properties
const mockPlaceholders: Placeholder[] = [
  {
    id: "Client.Name",
    name: "Name",
    displayName: "Client Name",
    value: "{{Client.Name}}",
    description: "Full name of the client",
    type: "string",
    isNullable: false
  },
  {
    id: "Client.Email",
    name: "Email",
    displayName: "Email Address",
    value: "{{Client.Email}}",
    description: "Primary email address of the client",
    type: "string",
    isNullable: true
  },
  {
    id: "Client.Phone",
    name: "Phone",
    displayName: "Phone Number",
    value: "{{Client.Phone}}",
    description: "Primary phone number of the client",
    type: "string",
    isNullable: true
  },
  {
    id: "Client.Status",
    name: "Status",
    displayName: "Client Status",
    value: "{{Client.Status}}",
    description: "Current status of the client",
    type: "enum",
    isNullable: false,
    enumValues: ["Active", "Inactive", "Pending", "Suspended"]
  },
  {
    id: "Contract.Number",
    name: "Number",
    displayName: "Contract Number",
    value: "{{Contract.Number}}",
    description: "Unique contract identifier",
    type: "string",
    isNullable: false
  },
  {
    id: "Contract.Date",
    name: "Date",
    displayName: "Contract Date",
    value: "{{Contract.Date}}",
    description: "Date when the contract was signed",
    type: "date",
    isNullable: false
  },
  {
    id: "Contract.Value",
    name: "Value",
    displayName: "Contract Value",
    value: "{{Contract.Value}}",
    description: "Total monetary value of the contract",
    type: "number",
    isNullable: false
  },
  {
    id: "Contract.IsActive",
    name: "IsActive",
    displayName: "Is Contract Active",
    value: "{{Contract.IsActive}}",
    description: "Whether the contract is currently active",
    type: "boolean",
    isNullable: false
  },
  {
    id: "Product.Name",
    name: "Name",
    displayName: "Product Name",
    value: "{{Product.Name}}",
    description: "Name of the product",
    type: "string",
    isNullable: false
  },
  {
    id: "Product.Price",
    name: "Price",
    displayName: "Product Price",
    value: "{{Product.Price}}",
    description: "Price of the product",
    type: "number",
    isNullable: false
  },
  {
    id: "Product.Category",
    name: "Category",
    displayName: "Product Category",
    value: "{{Product.Category}}",
    description: "Category classification of the product",
    type: "enum",
    isNullable: false,
    enumValues: ["Electronics", "Clothing", "Books", "Home", "Sports"]
  },
  {
    id: "Product.Description",
    name: "Description",
    displayName: "Product Description",
    value: "{{Product.Description}}",
    description: "Detailed description of the product",
    type: "string",
    isNullable: true
  }
];

const Placeholders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { toast } = useToast();

  // Filter placeholders based on search term
  const filteredPlaceholders = useMemo(() => {
    if (!searchTerm) return mockPlaceholders;
    
    const searchLower = searchTerm.toLowerCase();
    
    return mockPlaceholders.filter(placeholder =>
      placeholder.name.toLowerCase().includes(searchLower) ||
      placeholder.displayName.toLowerCase().includes(searchLower) ||
      placeholder.value.toLowerCase().includes(searchLower) ||
      placeholder.description?.toLowerCase().includes(searchLower) ||
      placeholder.type.toLowerCase().includes(searchLower) ||
      placeholder.id.split('.')[0].toLowerCase().includes(searchLower) ||
      placeholder.enumValues?.some(val => val.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  // Pagination calculations
  const totalItems = filteredPlaceholders.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPlaceholders = filteredPlaceholders.slice(startIndex, startIndex + pageSize);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
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

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
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

      {/* Results summary */}
      <div className="text-sm text-corporate-gray-medium">
        Showing {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of {totalItems} placeholder(s)
        {searchTerm && ` matching "${searchTerm}"`}
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
                Try adjusting your search terms
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Placeholders;
