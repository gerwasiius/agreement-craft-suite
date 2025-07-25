
import React from 'react';
import { Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Placeholder } from '@/types/placeholder';

interface PlaceholdersTableProps {
  placeholders: Placeholder[];
  onCopy: (value: string) => void;
  onViewDetails: (placeholder: Placeholder) => void;
}

const PlaceholdersTable = ({ placeholders, onCopy, onViewDetails }: PlaceholdersTableProps) => {
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[200px]">Display Name</TableHead>
            <TableHead className="w-[250px]">Placeholder Value</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="w-[80px]">Nullable</TableHead>
            <TableHead className="w-[150px]">Enum Values</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {placeholders.map((placeholder) => (
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
                <Badge className={getTypeColor(placeholder.type)}>
                  {placeholder.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={placeholder.isNullable ? "secondary" : "outline"}>
                  {placeholder.isNullable ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>
                {placeholder.enumValues && placeholder.enumValues.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {placeholder.enumValues.slice(0, 2).map((value, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                    {placeholder.enumValues.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{placeholder.enumValues.length - 2}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(placeholder)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCopy(placeholder.value)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlaceholdersTable;
