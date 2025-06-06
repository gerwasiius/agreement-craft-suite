
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";
import { Section } from "@/types/section";

interface SectionCardProps {
  section: Section;
  onEdit: (section: Section) => void;
  onPreview: (section: Section) => void;
}

export const SectionCard = ({ section, onEdit, onPreview }: SectionCardProps) => {
  return (
    <Card className="corporate-card hover:border-corporate-yellow transition-colors duration-200 h-[280px] flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-corporate-black text-lg line-clamp-1">
                {section.name}
              </CardTitle>
              <Badge 
                variant={section.isActive ? "default" : "secondary"}
                className={`text-xs ${section.isActive ? "bg-green-500" : "bg-gray-400"}`}
              >
                {section.isActive ? "Aktivna" : "Neaktivna"}
              </Badge>
            </div>
            <CardDescription className="text-corporate-gray-medium line-clamp-2">
              {section.description}
            </CardDescription>
          </div>
          <div className="text-right text-sm text-corporate-gray-medium flex-shrink-0">
            <p className="font-medium">v{section.version}</p>
            <p>{section.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex-1 mb-4">
          <div 
            className="text-sm text-corporate-gray-medium line-clamp-4 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: section.content || "Bez sadržaja" }}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(section)}
            className="corporate-button-secondary flex items-center gap-1"
          >
            <Eye size={14} />
            Pregled
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(section)}
            className="corporate-button-secondary flex items-center gap-1"
          >
            <Edit size={14} />
            Izmeni
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
