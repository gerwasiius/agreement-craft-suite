
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    description: "Početna stranica"
  },
  {
    title: "Administracija Grupa",
    url: "/groups",
    description: "Upravljanje grupama sekcija"
  },
  {
    title: "Sekcije i Članovi",
    url: "/group-selection",
    description: "Kreiranje i editovanje sekcija"
  },
  {
    title: "Document Template-i",
    url: "/templates",
    description: "Kreiranje template-a"
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-corporate-yellow rounded-lg flex items-center justify-center">
            <span className="text-corporate-black font-bold text-lg">DG</span>
          </div>
          <div>
            <h2 className="font-bold text-corporate-black">DocGen</h2>
            <p className="text-xs text-corporate-gray-medium">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-corporate-gray-medium font-semibold">
            Navigacija
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      className={`flex flex-col items-start gap-1 p-3 rounded-md transition-all duration-200 ${
                        location.pathname === item.url
                          ? 'bg-corporate-yellow text-corporate-black shadow-sm'
                          : 'hover:bg-corporate-yellow-light text-corporate-gray-dark'
                      }`}
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs opacity-70">{item.description}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
