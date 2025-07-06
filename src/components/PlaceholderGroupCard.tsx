
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Placeholder } from '@/types/placeholder';

interface PlaceholderGroupCardProps {
  group: {
    name: string;
    placeholders: Placeholder[];
  };
  onViewDetails: (placeholder: Placeholder) => void;
}

const PlaceholderGroupCard = ({ group, onViewDetails }: PlaceholderGroupCardProps) => {
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
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {group.placeholders.map((placeholder) => (
            <div key={placeholder.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-sm truncate">{placeholder.displayName}</h4>
                  <Badge className={`${getTypeColor(placeholder.type)} text-xs`}>
                    {placeholder.type}
                  </Badge>
                  {!placeholder.isNullable && (
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{placeholder.name}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(placeholder)}
                className="ml-2 h-8 w-8 p-0 flex-shrink-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderGroupCard;
