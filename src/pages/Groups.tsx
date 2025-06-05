
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
    },
    {
      id: "3",
      name: "Ugovori o najmu",
      description: "Sekcije za ugovore o najmu nekretnina",
      createdAt: "2024-01-20",
      memberCount: 25,
      status: 'active'
    },
    {
      id: "4",
      name: "Ugovori o prodaji",
      description: "Standardni ugovori za prodaju robe i usluga",
      createdAt: "2024-02-05",
      memberCount: 18,
      status: 'active'
    },
    {
      id: "5",
      name: "Ugovori o kupovini",
      description: "Grupa za različite tipove ugovora o kupovini",
      createdAt: "2024-01-25",
      memberCount: 15,
      status: 'deactivated'
    },
    {
      id: "6",
      name: "Ugovori o partnerstvu",
      description: "Sekcije za poslovne partnerships i joint venture",
      createdAt: "2024-02-10",
      memberCount: 9,
      status: 'active'
    },
    {
      id: "7",
      name: "Ugovori o distribuciji",
      description: "Distribucijski ugovori i trgovinska predstavništva",
      createdAt: "2024-01-30",
      memberCount: 22,
      status: 'active'
    },
    {
      id: "8",
      name: "Ugovori o konsultantskim uslugama",
      description: "Profesionalne konsultantske usluge i savjetovanja",
      createdAt: "2024-02-15",
      memberCount: 13,
      status: 'active'
    },
    {
      id: "9",
      name: "Ugovori o održavanju",
      description: "Tehnički ugovori o održavanju opreme i sistema",
      createdAt: "2024-01-18",
      memberCount: 7,
      status: 'deactivated'
    },
    {
      id: "10",
      name: "Ugovori o osiguranju",
      description: "Osiguravajuće police i uvjeti osiguranja",
      createdAt: "2024-02-20",
      memberCount: 31,
      status: 'active'
    },
    {
      id: "11",
      name: "Ugovori o transportu",
      description: "Logistički ugovori i usluge prijevoza",
      createdAt: "2024-01-22",
      memberCount: 14,
      status: 'active'
    },
    {
      id: "12",
      name: "Ugovori o skladištenju",
      description: "Usluge skladištenja i upravljanja zalihama",
      createdAt: "2024-02-25",
      memberCount: 11,
      status: 'active'
    },
    {
      id: "13",
      name: "IT ugovori",
      description: "Ugovori za razvoj softvera i IT usluge",
      createdAt: "2024-01-28",
      memberCount: 28,
      status: 'active'
    },
    {
      id: "14",
      name: "Marketing ugovori",
      description: "Reklamni i marketing ugovori",
      createdAt: "2024-02-03",
      memberCount: 19,
      status: 'deactivated'
    },
    {
      id: "15",
      name: "Ugovori o financiranju",
      description: "Krediti, zajmovi i financijski instrumenti",
      createdAt: "2024-01-12",
      memberCount: 24,
      status: 'active'
    },
    {
      id: "16",
      name: "Franšizni ugovori",
      description: "Franšize i licenciranje poslovnih modela",
      createdAt: "2024-02-08",
      memberCount: 16,
      status: 'active'
    },
    {
      id: "17",
      name: "Ugovori o obrazovanju",
      description: "Edukacijski programi i obuke",
      createdAt: "2024-01-16",
      memberCount: 12,
      status: 'active'
    },
    {
      id: "18",
      name: "Ugovori o zdravstvu",
      description: "Medicinski ugovori i zdravstvene usluge",
      createdAt: "2024-02-12",
      memberCount: 33,
      status: 'active'
    },
    {
      id: "19",
      name: "Građevinski ugovori",
      description: "Izvođenje radova i građevinska djelatnost",
      createdAt: "2024-01-24",
      memberCount: 27,
      status: 'deactivated'
    },
    {
      id: "20",
      name: "Ugovori o turizmu",
      description: "Turistička agencija i ugostiteljstvo",
      createdAt: "2024-02-18",
      memberCount: 21,
      status: 'active'
    },
    {
      id: "21",
      name: "Sportski ugovori",
      description: "Ugovori sa sportistima i sportskim organizacijama",
      createdAt: "2024-01-26",
      memberCount: 8,
      status: 'active'
    },
    {
      id: "22",
      name: "Ugovori o kulturi",
      description: "Kulturne manifestacije i umjetnička djela",
      createdAt: "2024-02-22",
      memberCount: 15,
      status: 'active'
    },
    {
      id: "23",
      name: "Ugovori o energetici",
      description: "Energetski sektor i obnovljivi izvori",
      createdAt: "2024-01-14",
      memberCount: 29,
      status: 'active'
    },
    {
      id: "24",
      name: "Telekomunikacijski ugovori",
      description: "Telekom usluge i mrežna infrastruktura",
      createdAt: "2024-02-14",
      memberCount: 17,
      status: 'deactivated'
    },
    {
      id: "25",
      name: "Ugovori o poljoprivredi",
      description: "Poljoprivredna proizvodnja i prehrambena industrija",
      createdAt: "2024-01-31",
      memberCount: 20,
      status: 'active'
    },
    {
      id: "26",
      name: "Ugovori o ribarstvu",
      description: "Ribolov i akvakultura",
      createdAt: "2024-02-26",
      memberCount: 6,
      status: 'active'
    },
    {
      id: "27",
      name: "Ugovori o šumarstvu",
      description: "Upravljanje šumama i drvna industrija",
      createdAt: "2024-01-19",
      memberCount: 11,
      status: 'active'
    },
    {
      id: "28",
      name: "Ugovori o rudarstvu",
      description: "Eksploatacija minerala i sirovina",
      createdAt: "2024-02-16",
      memberCount: 23,
      status: 'active'
    },
    {
      id: "29",
      name: "Ugovori o aviaciji",
      description: "Vazdušni promet i avionska industrija",
      createdAt: "2024-01-21",
      memberCount: 13,
      status: 'deactivated'
    },
    {
      id: "30",
      name: "Pomorski ugovori",
      description: "Brodski promet i pomorska trgovina",
      createdAt: "2024-02-28",
      memberCount: 18,
      status: 'active'
    },
    {
      id: "31",
      name: "Ugovori o železnici",
      description: "Železnički transport i infrastruktura",
      createdAt: "2024-01-17",
      memberCount: 14,
      status: 'active'
    },
    {
      id: "32",
      name: "Ugovori o javnom prevozu",
      description: "Gradski i međugradski javni prevoz",
      createdAt: "2024-02-11",
      memberCount: 22,
      status: 'active'
    },
    {
      id: "33",
      name: "Ugovori o bezbjednosti",
      description: "Obezbijeđenje i zaštita lica i imovine",
      createdAt: "2024-01-23",
      memberCount: 16,
      status: 'active'
    },
    {
      id: "34",
      name: "Ugovori o čišćenju",
      description: "Održavanje čistoće i higijene",
      createdAt: "2024-02-17",
      memberCount: 9,
      status: 'deactivated'
    },
    {
      id: "35",
      name: "Ugovori o ugostiteljstvu",
      description: "Restorani, hoteli i kafei",
      createdAt: "2024-01-29",
      memberCount: 25,
      status: 'active'
    },
    {
      id: "36",
      name: "Ugovori o trgovini",
      description: "Maloprodaja i veleprodaja",
      createdAt: "2024-02-19",
      memberCount: 30,
      status: 'active'
    },
    {
      id: "37",
      name: "Ugovori o proizvodnji",
      description: "Industrijska proizvodnja i manufaktura",
      createdAt: "2024-01-27",
      memberCount: 26,
      status: 'active'
    },
    {
      id: "38",
      name: "Ugovori o laboratorijskim uslugama",
      description: "Analitički i istraživački laboratoriji",
      createdAt: "2024-02-21",
      memberCount: 12,
      status: 'active'
    },
    {
      id: "39",
      name: "Veterinarski ugovori",
      description: "Veterinarske usluge i zaštita životinja",
      createdAt: "2024-01-13",
      memberCount: 10,
      status: 'active'
    },
    {
      id: "40",
      name: "Ugovori o pet-shop uslugama",
      description: "Trgovina i njega kućnih ljubimaca",
      createdAt: "2024-02-23",
      memberCount: 7,
      status: 'deactivated'
    },
    {
      id: "41",
      name: "Ugovori o frizerskim uslugama",
      description: "Frizerski saloni i kozmetički tretmani",
      createdAt: "2024-01-15",
      memberCount: 8,
      status: 'active'
    },
    {
      id: "42",
      name: "Ugovori o fitness uslugama",
      description: "Teretane i sportsko-rekreacijski centri",
      createdAt: "2024-02-24",
      memberCount: 19,
      status: 'active'
    },
    {
      id: "43",
      name: "Ugovori o spa uslugama",
      description: "Wellness centri i spa tretmani",
      createdAt: "2024-01-11",
      memberCount: 15,
      status: 'active'
    },
    {
      id: "44",
      name: "Ugovori o eventima",
      description: "Organizacija događaja i proslava",
      createdAt: "2024-02-27",
      memberCount: 21,
      status: 'active'
    },
    {
      id: "45",
      name: "Ugovori o fotografskim uslugama",
      description: "Profesionalna fotografija i video produkcija",
      createdAt: "2024-01-25",
      memberCount: 13,
      status: 'active'
    },
    {
      id: "46",
      name: "Ugovori o dizajnu",
      description: "Grafički dizajn i kreativne usluge",
      createdAt: "2024-02-13",
      memberCount: 17,
      status: 'deactivated'
    },
    {
      id: "47",
      name: "Ugovori o arhitekturi",
      description: "Arhitektonsko projektovanje i planiranje",
      createdAt: "2024-01-18",
      memberCount: 24,
      status: 'active'
    },
    {
      id: "48",
      name: "Ugovori o inženjeringu",
      description: "Inženjersko projektovanje i nadzor",
      createdAt: "2024-02-15",
      memberCount: 28,
      status: 'active'
    },
    {
      id: "49",
      name: "Ugovori o geodeziji",
      description: "Geodetske usluge i kartiranje",
      createdAt: "2024-01-20",
      memberCount: 11,
      status: 'active'
    },
    {
      id: "50",
      name: "Ugovori o pravnim uslugama",
      description: "Advokatske kancelarije i pravno savjetovanje",
      createdAt: "2024-02-29",
      memberCount: 32,
      status: 'active'
    },
    {
      id: "51",
      name: "Ugovori o računovodstvu",
      description: "Računovodstvene usluge i finansijsko izvještavanje",
      createdAt: "2024-01-22",
      memberCount: 20,
      status: 'active'
    },
    {
      id: "52",
      name: "Ugovori o auditu",
      description: "Revizorske usluge i kontrola poslovanja",
      createdAt: "2024-02-04",
      memberCount: 16,
      status: 'active'
    },
    {
      id: "53",
      name: "Ugovori o poreskim uslugama",
      description: "Poresko savjetovanje i priprema prijava",
      createdAt: "2024-01-24",
      memberCount: 14,
      status: 'deactivated'
    },
    {
      id: "54",
      name: "Ugovori o HR uslugama",
      description: "Upravljanje ljudskim resursima",
      createdAt: "2024-02-06",
      memberCount: 23,
      status: 'active'
    },
    {
      id: "55",
      name: "Ugovori o regrutaciji",
      description: "Potraga za talentima i zapošljavanje",
      createdAt: "2024-01-26",
      memberCount: 18,
      status: 'active'
    },
    {
      id: "56",
      name: "Ugovori o obuka",
      description: "Korporativne obuke i razvoj vještina",
      createdAt: "2024-02-07",
      memberCount: 22,
      status: 'active'
    },
    {
      id: "57",
      name: "Ugovori o web dizajnu",
      description: "Izrada web stranica i aplikacija",
      createdAt: "2024-01-28",
      memberCount: 25,
      status: 'active'
    },
    {
      id: "58",
      name: "Ugovori o SEO uslugama",
      description: "Optimizacija za pretraživače",
      createdAt: "2024-02-09",
      memberCount: 15,
      status: 'active'
    },
    {
      id: "59",
      name: "Ugovori o društvenim mrežama",
      description: "Upravljanje društvenim mrežama i content marketing",
      createdAt: "2024-01-30",
      memberCount: 19,
      status: 'deactivated'
    },
    {
      id: "60",
      name: "Ugovori o e-commerce",
      description: "Online trgovina i e-prodaja",
      createdAt: "2024-02-10",
      memberCount: 27,
      status: 'active'
    },
    {
      id: "61",
      name: "Ugovori o mobilnim aplikacijama",
      description: "Razvoj iOS i Android aplikacija",
      createdAt: "2024-01-12",
      memberCount: 21,
      status: 'active'
    },
    {
      id: "62",
      name: "Ugovori o cloud uslugama",
      description: "Cloud hosting i infrastruktura",
      createdAt: "2024-02-11",
      memberCount: 29,
      status: 'active'
    },
    {
      id: "63",
      name: "Ugovori o cyber bezbjednosti",
      description: "Zaštita od cyber prijetnji",
      createdAt: "2024-01-14",
      memberCount: 26,
      status: 'active'
    },
    {
      id: "64",
      name: "Ugovori o backup uslugama",
      description: "Sigurnosno kopiranje podataka",
      createdAt: "2024-02-12",
      memberCount: 12,
      status: 'active'
    },
    {
      id: "65",
      name: "Ugovori o database management",
      description: "Upravljanje bazama podataka",
      createdAt: "2024-01-16",
      memberCount: 17,
      status: 'deactivated'
    },
    {
      id: "66",
      name: "Ugovori o sistemskoj integraciji",
      description: "Integracija različitih IT sistema",
      createdAt: "2024-02-14",
      memberCount: 24,
      status: 'active'
    },
    {
      id: "67",
      name: "Ugovori o API razvoju",
      description: "Razvoj i održavanje API-ja",
      createdAt: "2024-01-18",
      memberCount: 20,
      status: 'active'
    },
    {
      id: "68",
      name: "Ugovori o DevOps uslugama",
      description: "Automatizacija i CI/CD pipeline",
      createdAt: "2024-02-16",
      memberCount: 23,
      status: 'active'
    },
    {
      id: "69",
      name: "Ugovori o QA testiranju",
      description: "Testiranje softvera i osiguravanje kvaliteta",
      createdAt: "2024-01-20",
      memberCount: 16,
      status: 'active'
    },
    {
      id: "70",
      name: "Ugovori o UX/UI dizajnu",
      description: "Korisničko iskustvo i interface dizajn",
      createdAt: "2024-02-18",
      memberCount: 22,
      status: 'active'
    },
    {
      id: "71",
      name: "Ugovori o business intelligence",
      description: "Analitika podataka i business insight",
      createdAt: "2024-01-22",
      memberCount: 25,
      status: 'deactivated'
    },
    {
      id: "72",
      name: "Ugovori o CRM sistemima",
      description: "Customer relationship management",
      createdAt: "2024-02-20",
      memberCount: 28,
      status: 'active'
    },
    {
      id: "73",
      name: "Ugovori o ERP sistemima",
      description: "Enterprise resource planning",
      createdAt: "2024-01-24",
      memberCount: 31,
      status: 'active'
    },
    {
      id: "74",
      name: "Ugovori o e-learning platformama",
      description: "Online edukacijske platforme",
      createdAt: "2024-02-22",
      memberCount: 18,
      status: 'active'
    },
    {
      id: "75",
      name: "Ugovori o video streaming",
      description: "Streaming servisi i video platforme",
      createdAt: "2024-01-26",
      memberCount: 15,
      status: 'active'
    },
    {
      id: "76",
      name: "Ugovori o gaming industriji",
      description: "Razvoj igara i gaming platform",
      createdAt: "2024-02-24",
      memberCount: 19,
      status: 'active'
    },
    {
      id: "77",
      name: "Ugovori o blockchain tehnologiji",
      description: "Blockchain razvoj i kriptovalute",
      createdAt: "2024-01-28",
      memberCount: 13,
      status: 'deactivated'
    },
    {
      id: "78",
      name: "Ugovori o IoT uređajima",
      description: "Internet of Things i pametni uređaji",
      createdAt: "2024-02-26",
      memberCount: 21,
      status: 'active'
    },
    {
      id: "79",
      name: "Ugovori o AI tehnologiji",
      description: "Umjetna inteligencija i machine learning",
      createdAt: "2024-01-30",
      memberCount: 27,
      status: 'active'
    },
    {
      id: "80",
      name: "Ugovori o robotici",
      description: "Robotski sistemi i automatizacija",
      createdAt: "2024-02-28",
      memberCount: 14,
      status: 'active'
    },
    {
      id: "81",
      name: "Ugovori o 3D printingu",
      description: "Aditivna proizvodnja i prototipiranje",
      createdAt: "2024-01-11",
      memberCount: 11,
      status: 'active'
    },
    {
      id: "82",
      name: "Ugovori o virtual reality",
      description: "VR aplikacije i immersive tehnologije",
      createdAt: "2024-02-01",
      memberCount: 16,
      status: 'active'
    },
    {
      id: "83",
      name: "Ugovori o augmented reality",
      description: "AR rješenja i mixed reality",
      createdAt: "2024-01-13",
      memberCount: 12,
      status: 'deactivated'
    },
    {
      id: "84",
      name: "Ugovori o drona tehnologiji",
      description: "Bespilotne letjelice i aerial servisi",
      createdAt: "2024-02-03",
      memberCount: 9,
      status: 'active'
    },
    {
      id: "85",
      name: "Ugovori o satelitskim uslugama",
      description: "Satelitska komunikacija i GPS tehnologije",
      createdAt: "2024-01-15",
      memberCount: 20,
      status: 'active'
    },
    {
      id: "86",
      name: "Ugovori o meteorološkim uslugama",
      description: "Vremensko predviđanje i klimatski podaci",
      createdAt: "2024-02-05",
      memberCount: 8,
      status: 'active'
    },
    {
      id: "87",
      name: "Ugovori o geološkim istraživanjima",
      description: "Geološka analiza i istraživanja",
      createdAt: "2024-01-17",
      memberCount: 15,
      status: 'active'
    },
    {
      id: "88",
      name: "Ugovori o oceanografiji",
      description: "Proučavanje okeana i morskih ekosistema",
      createdAt: "2024-02-07",
      memberCount: 7,
      status: 'deactivated'
    },
    {
      id: "89",
      name: "Ugovori o astronomiji",
      description: "Astronomska istraživanja i observatorije",
      createdAt: "2024-01-19",
      memberCount: 10,
      status: 'active'
    },
    {
      id: "90",
      name: "Ugovori o aerosvemirskoj industriji",
      description: "Svemirska tehnologija i lansiranje satelita",
      createdAt: "2024-02-09",
      memberCount: 18,
      status: 'active'
    },
    {
      id: "91",
      name: "Ugovori o nuklearnoj energiji",
      description: "Nuklearne elektrane i sigurnost",
      createdAt: "2024-01-21",
      memberCount: 24,
      status: 'active'
    },
    {
      id: "92",
      name: "Ugovori o solarna energiji",
      description: "Solarni paneli i fotovoltaični sistemi",
      createdAt: "2024-02-11",
      memberCount: 26,
      status: 'active'
    },
    {
      id: "93",
      name: "Ugovori o vjetroenergetici",
      description: "Vjetroturbine i eolska energija",
      createdAt: "2024-01-23",
      memberCount: 22,
      status: 'active'
    },
    {
      id: "94",
      name: "Ugovori o hidroenergetici",
      description: "Hidroelektrane i vodna snaga",
      createdAt: "2024-02-13",
      memberCount: 19,
      status: 'deactivated'
    },
    {
      id: "95",
      name: "Ugovori o geotermalnoj energiji",
      description: "Geotermalni sistemi i toplinska energija",
      createdAt: "2024-01-25",
      memberCount: 13,
      status: 'active'
    },
    {
      id: "96",
      name: "Ugovori o bioenergetici",
      description: "Biomasa i biogoriva",
      createdAt: "2024-02-15",
      memberCount: 17,
      status: 'active'
    },
    {
      id: "97",
      name: "Ugovori o upravljanju otpadom",
      description: "Recikliranje i ekološko zbrinjavanja",
      createdAt: "2024-01-27",
      memberCount: 21,
      status: 'active'
    },
    {
      id: "98",
      name: "Ugovori o vodosnabdijevanju",
      description: "Vodni sistemi i tretman vode",
      createdAt: "2024-02-17",
      memberCount: 25,
      status: 'active'
    },
    {
      id: "99",
      name: "Ugovori o kanalizaciji",
      description: "Kanalizacioni sistemi i tretman otpadnih voda",
      createdAt: "2024-01-29",
      memberCount: 14,
      status: 'active'
    },
    {
      id: "100",
      name: "Ugovori o zaštiti okoliša",
      description: "Ekološki monitoring i zaštita prirode",
      createdAt: "2024-02-19",
      memberCount: 23,
      status: 'active'
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
