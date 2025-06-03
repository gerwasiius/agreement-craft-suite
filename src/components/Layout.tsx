
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-corporate-gray-light">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-corporate-yellow-light p-2 rounded-md transition-colors" />
              <div>
                <h1 className="text-2xl font-bold text-corporate-black">
                  Document Generator Admin
                </h1>
                <p className="text-corporate-gray-medium text-sm">
                  Upravljanje grupama, sekcijama i template-ovima
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
