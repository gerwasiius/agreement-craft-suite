
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";
import { Section } from "@/types/section";

interface SectionCardProps {
  section: Section;
  onEdit: (section: Section) => void;
  onView: (section: Section) => void;
}

export const SectionCard = ({ section, onEdit, onView }: SectionCardProps) => {
  return (
    <Card className="corporate-card hover:border-corporate-yellow transition-colors duration-200 h-48">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-corporate-black text-lg truncate">
                {section.name}
              </CardTitle>
              <Badge variant={section.isActive ? "default" : "secondary"} className="text-xs">
                {section.isActive ? "Aktivna" : "Neaktivna"}
              </Badge>
            </div>
            <CardDescription className="text-corporate-gray-medium text-sm line-clamp-2">
              {section.description}
            </CardDescription>
          </div>
          <div className="text-right text-xs text-corporate-gray-medium flex-shrink-0 ml-3">
            <p className="font-medium">v{section.version}</p>
            <p>{section.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-end h-full">
          <div 
            className="text-sm text-corporate-gray-medium flex-1 line-clamp-3 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: section.content || "Bez sadržaja" }}
          />
          <div className="flex gap-2 ml-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(section)}
              className="corporate-button-secondary"
            >
              <Eye size={14} className="mr-1" />
              Pregled
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(section)}
              className="corporate-button-secondary"
            >
              <Edit size={14} className="mr-1" />
              Izmeni
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
