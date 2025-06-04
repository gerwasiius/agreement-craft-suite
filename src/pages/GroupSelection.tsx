
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, ArrowRight } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  sectionsCount: number;
  createdAt: string;
}

const GroupSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock podatci - u realnoj aplikaciji ovo bi došlo iz API-ja
  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "Ugovori o radu",
      description: "Grupa sekcija za radne ugovore i anekse",
      status: "active",
      sectionsCount: 5,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Licencni ugovori",
      description: "Sekcije za licencne i autorske ugovore",
      status: "active",
      sectionsCount: 3,
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Finansijski dokumenti",
      description: "Sekcije za finansijske ugovore i dokumenta",
      status: "inactive",
      sectionsCount: 0,
      createdAt: "2024-02-01"
    }
  ]);

  const filteredGroups = groups.filter(group => 
    group.status === "active" && 
    (group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     group.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGroupSelect = (groupId: string, groupName: string) => {
    navigate(`/sections/${groupId}`, { 
      state: { 
        groupId, 
        groupName 
      } 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-corporate-black">Izbor Grupe</h1>
        <p className="text-corporate-gray-medium mt-1">
          Odaberite grupu za upravljanje sekcijama i članovima
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
        <Input
          placeholder="Pretraga grupa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="corporate-input pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card 
            key={group.id} 
            className="corporate-card hover:border-corporate-yellow transition-all duration-200 cursor-pointer hover:shadow-lg"
            onClick={() => handleGroupSelect(group.id, group.name)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-corporate-yellow rounded-lg flex items-center justify-center">
                    <Users className="text-corporate-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-corporate-black text-lg">
                      {group.name}
                    </CardTitle>
                    <Badge 
                      className={`text-xs mt-1 ${
                        group.status === "active" 
                          ? "bg-green-100 text-green-800 border-green-300" 
                          : "bg-gray-100 text-gray-800 border-gray-300"
                      }`}
                    >
                      {group.status === "active" ? "AKTIVNA" : "NEAKTIVNA"}
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="text-corporate-gray-medium" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-corporate-gray-medium mb-3">
                {group.description}
              </CardDescription>
              <div className="flex justify-between items-center text-sm text-corporate-gray-medium">
                <span>{group.sectionsCount} sekcija</span>
                <span>{group.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-corporate-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="text-corporate-gray-medium" size={32} />
          </div>
          <h3 className="text-lg font-medium text-corporate-black mb-2">
            Nema aktivnih grupa
          </h3>
          <p className="text-corporate-gray-medium mb-4">
            Nema grupa koje odgovaraju vašoj pretrazi ili nema aktivnih grupa.
          </p>
          <Button
            onClick={() => navigate("/groups")}
            className="corporate-button-secondary"
          >
            Idite na Administraciju Grupa
          </Button>
        </div>
      )}

      <div className="mt-8 p-4 bg-corporate-yellow-light rounded-lg">
        <h3 className="text-sm font-semibold text-corporate-black mb-2">
          Napomena:
        </h3>
        <p className="text-xs text-corporate-gray-medium">
          Prikazane su samo aktivne grupe. Za upravljanje grupama idite na "Administracija Grupa".
        </p>
      </div>
    </div>
  );
};

export default GroupSelection;
