import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus, Search, Users, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  memberCount: number;
  status: 'active' | 'deactivated';
}

const Groups = () => {
  const navigate = useNavigate();
  
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Ugovori o radu",
      description: "Grupa sekcija za različite tipove ugovora o radu",
      createdAt: "2024-01-15",
      memberCount: 12,
      status: 'active'
    },
    {
      id: "2", 
      name: "Licencni ugovori",
      description: "Sekcije vezane za licencne ugovore i autorska prava",
      createdAt: "2024-02-01",
      memberCount: 8,
      status: 'deactivated'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    status: true 
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 3x4 grid na desktop-u

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || group.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGroups = filteredGroups.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSubmit = () => {
    if (editingGroup) {
      setGroups(groups.map(g => 
        g.id === editingGroup.id 
          ? { 
              ...g, 
              name: formData.name, 
              description: formData.description,
              status: formData.status ? 'active' : 'deactivated'
            }
          : g
      ));
    } else {
      const newGroup: Group = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString().split('T')[0],
        memberCount: 0,
        status: formData.status ? 'active' : 'deactivated'
      };
      setGroups([...groups, newGroup]);
    }
    setIsDialogOpen(false);
    setEditingGroup(null);
    setFormData({ name: "", description: "", status: true });
  };

  const openDialog = (group?: Group) => {
    if (group) {
      setEditingGroup(group);
      setFormData({ 
        name: group.name, 
        description: group.description,
        status: group.status === 'active'
      });
    } else {
      setEditingGroup(null);
      setFormData({ name: "", description: "", status: true });
    }
    setIsDialogOpen(true);
  };

  const handleViewMembers = (groupId: string, groupName: string) => {
    navigate(`/sections?groupId=${groupId}&groupName=${encodeURIComponent(groupName)}`);
  };

  const getStatusBadge = (status: 'active' | 'deactivated') => {
    return (
      <Badge 
        variant={status === 'active' ? 'default' : 'secondary'} 
        className={`flex items-center gap-1 ${
          status === 'active' 
            ? 'bg-green-100 text-green-800 border-green-300' 
            : 'bg-gray-100 text-gray-600 border-gray-300'
        }`}
      >
        {status === 'active' ? <Eye size={12} /> : <EyeOff size={12} />}
        {status === 'active' ? 'Aktivna' : 'Deaktivirana'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-corporate-black">Administracija Grupa</h1>
          <p className="text-corporate-gray-medium mt-1">
            Upravljanje grupama sekcija i članova dokumenta
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="corporate-button-primary flex items-center gap-2"
            >
              <Plus size={16} />
              Nova Grupa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-corporate-black">
                {editingGroup ? "Izmena Grupe" : "Nova Grupa"}
              </DialogTitle>
              <DialogDescription>
                {editingGroup 
                  ? "Izmenite podatke o grupi sekcija." 
                  : "Kreirajte novu grupu za organizovanje sekcija dokumenta."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Naziv grupe</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Unesite naziv grupe..."
                  className="corporate-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kratki opis grupe..."
                  className="corporate-input min-h-[80px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status grupe
                </Label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${formData.status ? 'text-green-600' : 'text-gray-500'}`}>
                    {formData.status ? 'Aktivna' : 'Deaktivirana'}
                  </span>
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleSubmit}
                className="corporate-button-primary"
              >
                {editingGroup ? "Sačuvaj izmene" : "Kreiraj grupu"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-gray-medium" size={16} />
          <Input
            placeholder="Pretraga grupa..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="corporate-input pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-48 corporate-input">
            <SelectValue placeholder="Filter po statusu" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">Sve grupe</SelectItem>
            <SelectItem value="active">Aktivne</SelectItem>
            <SelectItem value="deactivated">Deaktivirane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center text-sm text-corporate-gray-medium">
        <span>
          Prikazano {startIndex + 1}-{Math.min(endIndex, filteredGroups.length)} od {filteredGroups.length} grupa
        </span>
        {totalPages > 1 && (
          <span>
            Stranica {currentPage} od {totalPages}
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentGroups.map((group) => (
          <Card key={group.id} className="corporate-card hover:border-corporate-yellow transition-colors duration-200">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-corporate-black">{group.name}</CardTitle>
                {getStatusBadge(group.status)}
              </div>
              <CardDescription className="text-corporate-gray-medium">
                {group.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-corporate-gray-medium">
                  <p>{group.memberCount} članova</p>
                  <p>Kreirana: {group.createdAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(group)}
                    className="corporate-button-secondary flex-1"
                  >
                    Izmeni
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewMembers(group.id, group.name)}
                    className="corporate-button-secondary flex items-center gap-1"
                  >
                    <Users size={14} />
                    Članovi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {currentGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-corporate-gray-light rounded-full mx-auto mb-4 flex items-center justify-center">
            <Search className="text-corporate-gray-medium" size={32} />
          </div>
          <h3 className="text-lg font-medium text-corporate-black mb-2">
            Nema rezultata
          </h3>
          <p className="text-corporate-gray-medium">
            Pokušajte sa drugim terminom pretrage ili kreirajte novu grupu.
          </p>
        </div>
      )}
    </div>
  );
};

export default Groups;
