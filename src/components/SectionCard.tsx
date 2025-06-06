
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/types/section";

interface SectionCardProps {
  section: Section;
  onEdit: (section: Section) => void;
}

export const SectionCard = ({ section, onEdit }: SectionCardProps) => {
  return (
    <Card className="corporate-card hover:border-corporate-yellow transition-colors duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-corporate-black">{section.name}</CardTitle>
            <CardDescription className="text-corporate-gray-medium">
              {section.description}
            </CardDescription>
          </div>
          <div className="text-right text-sm text-corporate-gray-medium">
            <p className="font-medium">v{section.version}</p>
            <p>{section.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div 
            className="text-sm text-corporate-gray-medium max-w-md truncate"
            dangerouslySetInnerHTML={{ __html: section.content || "Bez sadržaja" }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(section)}
            className="corporate-button-secondary"
          >
            Izmeni
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
