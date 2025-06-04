
import { Search } from "lucide-react";

interface SectionsEmptyStateProps {
  groupName: string;
}

export const SectionsEmptyState = ({ groupName }: SectionsEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-corporate-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
        <Search className="text-corporate-gray-medium" size={32} />
      </div>
      <h3 className="text-lg font-medium text-corporate-black mb-2">
        Nema sekcija za ovu grupu
      </h3>
      <p className="text-corporate-gray-medium">
        Kreirajte novu sekciju za grupu "{groupName}" ili promenite filter pretrage.
      </p>
    </div>
  );
};
