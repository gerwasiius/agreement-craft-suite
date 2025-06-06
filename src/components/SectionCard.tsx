
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
    <div className="border border-gray-200 bg-white rounded-lg p-6 hover:border-corporate-yellow transition-colors duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-corporate-black text-xl font-semibold">
              {section.name}
            </h3>
            <Badge 
              variant={section.isActive ? "default" : "secondary"}
              className={`text-xs ${section.isActive ? "bg-green-500" : "bg-gray-400"}`}
            >
              {section.isActive ? "Aktivna" : "Neaktivna"}
            </Badge>
          </div>
          <p className="text-corporate-gray-medium text-sm mb-3">
            {section.description}
          </p>
        </div>
        <div className="text-right text-sm text-corporate-gray-medium flex-shrink-0">
          <p className="font-medium">v{section.version}</p>
          <p>{section.createdAt}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div 
          className="text-sm text-corporate-gray-medium"
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
    </div>
  );
};
