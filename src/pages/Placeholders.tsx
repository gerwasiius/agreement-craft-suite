
import React, { useState, useMemo } from 'react';
import { Search, Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { PlaceholderGroup, Placeholder } from '@/types/placeholder';

// Mock data - replace with actual API call
const mockPlaceholders: Placeholder[] = [
  {
    id: "Client.Name",
    name: "Name",
    displayName: "Client Name",
    value: "{{Client.Name}}"
  },
  {
    id: "Client.Email",
    name: "Email",
    displayName: "Email Address",
    value: "{{Client.Email}}"
  },
  {
    id: "Client.Phone",
    name: "Phone",
    displayName: "Phone Number",
    value: "{{Client.Phone}}"
  },
  {
    id: "Contract.Number",
    name: "Number",
    displayName: "Contract Number",
    value: "{{Contract.Number}}"
  },
  {
    id: "Contract.Date",
    name: "Date",
    displayName: "Contract Date",
    value: "{{Contract.Date}}"
  },
  {
    id: "Contract.Value",
    name: "Value",
    displayName: "Contract Value",
    value: "{{Contract.Value}}"
  },
  {
    id: "Product.Name",
    name: "Name",
    displayName: "Product Name",
    value: "{{Product.Name}}"
  },
  {
    id: "Product.Price",
    name: "Price",
    displayName: "Product Price",
    value: "{{Product.Price}}"
  },
  {
    id: "Product.Description",
    name: "Description",
    displayName: "Product Description",
    value: "{{Product.Description}}"
  }
];

const Placeholders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Group placeholders by entity
  const groupedPlaceholders = useMemo(() => {
    const groups: Record<string, PlaceholderGroup> = {};
    
    mockPlaceholders.forEach((placeholder) => {
      const groupName = placeholder.id.split('.')[0];
      
      if (!groups[groupName]) {
        groups[groupName] = {
          id: groupName,
          name: groupName,
          placeholders: []
        };
      }
      
      groups[groupName].placeholders.push(placeholder);
    });
    
    return Object.values(groups);
  }, []);

  // Filter groups based on search term
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groupedPlaceholders;
    
    const searchLower = searchTerm.toLowerCase();
    
    return groupedPlaceholders.map(group => ({
      ...group,
      placeholders: group.placeholders.filter(placeholder =>
        placeholder.name.toLowerCase().includes(searchLower) ||
        placeholder.displayName.toLowerCase().includes(searchLower) ||
        placeholder.value.toLowerCase().includes(searchLower) ||
        group.name.toLowerCase().includes(searchLower)
      )
    })).filter(group => group.placeholders.length > 0);
  }, [groupedPlaceholders, searchTerm]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

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

  const getTypeColor = (type: string) => {
    const colors = {
      string: "bg-blue-100 text-blue-800",
      number: "bg-green-100 text-green-800",
      date: "bg-purple-100 text-purple-800",
      boolean: "bg-orange-100 text-orange-800",
      enum: "bg-pink-100 text-pink-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
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

      {/* Results count */}
      <div className="text-sm text-corporate-gray-medium">
        {filteredGroups.length} group(s) found, {filteredGroups.reduce((acc, group) => acc + group.placeholders.length, 0)} placeholder(s) total
      </div>

      {/* Groups */}
      <div className="space-y-4">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="w-full">
            <Collapsible
              open={openGroups[group.id] ?? true}
              onOpenChange={() => toggleGroup(group.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold text-corporate-black">
                        {group.name}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        {group.placeholders.length}
                      </Badge>
                    </div>
                    {openGroups[group.id] ?? true ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Name</TableHead>
                          <TableHead className="w-[250px]">Display Name</TableHead>
                          <TableHead className="w-[300px]">Placeholder Value</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.placeholders.map((placeholder) => (
                          <TableRow key={placeholder.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              {placeholder.name}
                            </TableCell>
                            <TableCell>
                              {placeholder.displayName}
                            </TableCell>
                            <TableCell>
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {placeholder.value}
                              </code>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(placeholder.value)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
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
    </div>
  );
};

export default Placeholders;
