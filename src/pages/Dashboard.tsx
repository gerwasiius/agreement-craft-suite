
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Settings } from "lucide-react";
import { DashboardItem, UserRole } from "@/types/dashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock user - u realnoj aplikaciji ovo bi došlo iz autentifikacije
  const [currentUser] = useState({
    id: "1",
    name: "Admin User",
    role: "admin" as UserRole
  });

  const dashboardItems: DashboardItem[] = [
    {
      id: "groups",
      title: "Administracija Grupa",
      description: "Upravljanje grupama sekcija i članova dokumenta",
      icon: "users",
      route: "/groups",
      requiredRole: ["admin", "manager"],
      color: "bg-blue-500"
    },
    {
      id: "sections",
      title: "Sekcije i Članovi",
      description: "Kreiranje i editovanje sekcija dokumenta",
      icon: "fileText",
      route: "/group-selection",
      requiredRole: ["admin", "manager"],
      color: "bg-green-500"
    },
    {
      id: "templates",
      title: "Document Template-i",
      description: "Kreiranje i upravljanje template-ovima",
      icon: "settings",
      route: "/templates",
      requiredRole: ["admin"],
      color: "bg-purple-500"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users size={32} />;
      case "fileText":
        return <FileText size={32} />;
      case "settings":
        return <Settings size={32} />;
      default:
        return <Settings size={32} />;
    }
  };

  const hasAccess = (requiredRoles: UserRole[]) => {
    return requiredRoles.includes(currentUser.role);
  };

  const filteredItems = dashboardItems.filter(item => hasAccess(item.requiredRole));

  const handleItemClick = (route: string) => {
    navigate(route);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-300";
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "user":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-corporate-black">Dashboard</h1>
          <p className="text-corporate-gray-medium mt-1">
            Dobrodošli u Document Generator Admin Panel
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-corporate-black">{currentUser.name}</p>
            <Badge className={`text-xs ${getRoleBadgeColor(currentUser.role)}`}>
              {currentUser.role.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card 
            key={item.id} 
            className="corporate-card hover:border-corporate-yellow transition-all duration-200 cursor-pointer hover:shadow-lg"
            onClick={() => handleItemClick(item.route)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`${item.color} text-white p-3 rounded-lg`}>
                  {getIcon(item.icon)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-corporate-black text-lg">
                    {item.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">
                    {item.requiredRole.join(", ").toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-corporate-gray-medium">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-corporate-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
            <Settings className="text-corporate-gray-medium" size={32} />
          </div>
          <h3 className="text-lg font-medium text-corporate-black mb-2">
            Nema dostupnih funkcionalnosti
          </h3>
          <p className="text-corporate-gray-medium">
            Kontaktirajte administratora za pristup funkcionalnostima.
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-corporate-yellow-light rounded-lg">
        <h3 className="text-sm font-semibold text-corporate-black mb-2">
          Informacije o pristupima:
        </h3>
        <ul className="text-xs text-corporate-gray-medium space-y-1">
          <li><strong>Admin:</strong> Potpun pristup svim funkcionalnostima</li>
          <li><strong>Manager:</strong> Pristup grupama i sekcijama</li>
          <li><strong>User:</strong> Ograničen pristup samo osnovnim funkcijama</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
