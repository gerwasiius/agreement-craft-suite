
import { useState } from "react";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { PlaceholderGroup, Placeholder } from "@/types/placeholder";
import { cn } from "@/lib/utils";

interface PlaceholderListProps {
  placeholderGroups: PlaceholderGroup[];
}

export const PlaceholderList = ({ placeholderGroups }: PlaceholderListProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleDragStart = (e: React.DragEvent, placeholder: Placeholder) => {
    e.dataTransfer.setData("text/plain", placeholder.value);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-corporate-black mb-3">Placeholderi</h4>
      <div className="space-y-1">
        {placeholderGroups.map((group) => (
          <div key={group.id} className="border border-gray-200 rounded-md">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 transition-colors"
            >
              {expandedGroups.includes(group.id) ? (
                <ChevronDown size={16} className="text-corporate-gray-medium" />
              ) : (
                <ChevronRight size={16} className="text-corporate-gray-medium" />
              )}
              <span className="text-sm font-medium text-corporate-black">
                {group.name}
              </span>
            </button>
            
            {expandedGroups.includes(group.id) && (
              <div className="pl-6 pb-2 space-y-1">
                {group.placeholders.map((placeholder) => (
                  <div
                    key={placeholder.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, placeholder)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded cursor-move",
                      "hover:bg-corporate-yellow/10 transition-colors",
                      "border border-transparent hover:border-corporate-yellow/30"
                    )}
                  >
                    <GripVertical size={14} className="text-corporate-gray-medium" />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-corporate-black">
                        {placeholder.displayName}
                      </div>
                      <div className="text-xs text-corporate-gray-medium">
                        {placeholder.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
