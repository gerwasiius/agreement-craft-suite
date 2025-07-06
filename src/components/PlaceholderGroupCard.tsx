
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Eye } from 'lucide-react';
import { Placeholder } from '@/types/placeholder';

interface PlaceholderGroupCardProps {
  group: {
    name: string;
    placeholders: Placeholder[];
  };
  onCopy: (value: string) => void;
  onViewDetails: (placeholder: Placeholder) => void;
}

const PlaceholderGroupCard = ({ group, onCopy, onViewDetails }: PlaceholderGroupCardProps) => {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{group.name}</CardTitle>
        <CardDescription>
          {group.placeholders.length} placeholder(s)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {group.placeholders.map((placeholder) => (
          <div key={placeholder.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{placeholder.displayName}</h4>
                <p className="text-xs text-gray-500 mt-1">{placeholder.name}</p>
                {placeholder.description && (
                  <p className="text-sm text-gray-600 mt-2">{placeholder.description}</p>
                )}
              </div>
              <div className="flex space-x-1 ml-4">
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
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className={getTypeColor(placeholder.type)}>
                {placeholder.type}
              </Badge>
              <Badge variant={placeholder.isNullable ? "secondary" : "outline"}>
                {placeholder.isNullable ? "Nullable" : "Required"}
              </Badge>
              {placeholder.enumValues && placeholder.enumValues.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {placeholder.enumValues.length} values
                </Badge>
              )}
            </div>

            <div>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {placeholder.value}
              </code>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlaceholderGroupCard;
