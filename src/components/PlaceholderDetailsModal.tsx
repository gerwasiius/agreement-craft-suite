
import React from 'react';
import { Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Placeholder } from '@/types/placeholder';

interface PlaceholderDetailsModalProps {
  placeholder: Placeholder | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (value: string) => void;
}

const PlaceholderDetailsModal = ({ placeholder, isOpen, onClose, onCopy }: PlaceholderDetailsModalProps) => {
  if (!placeholder) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Placeholder Details</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopy(placeholder.value)}
              className="ml-2"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Value
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-sm text-gray-900 mt-1">{placeholder.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Display Name</label>
              <p className="text-sm text-gray-900 mt-1">{placeholder.displayName}</p>
            </div>
          </div>

          {/* Placeholder Value */}
          <div>
            <label className="text-sm font-medium text-gray-700">Placeholder Value</label>
            <div className="mt-1 flex items-center space-x-2">
              <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono flex-1">
                {placeholder.value}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopy(placeholder.value)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          {placeholder.description && (
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="text-sm text-gray-600 mt-1">{placeholder.description}</p>
            </div>
          )}

          {/* Type and Nullable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Data Type</label>
              <div className="mt-1">
                <Badge className={getTypeColor(placeholder.type)}>
                  {placeholder.type}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nullable</label>
              <div className="mt-1">
                <Badge variant={placeholder.isNullable ? "secondary" : "outline"}>
                  {placeholder.isNullable ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Enum Values */}
          {placeholder.enumValues && placeholder.enumValues.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700">Possible Values</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {placeholder.enumValues.map((value, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceholderDetailsModal;
