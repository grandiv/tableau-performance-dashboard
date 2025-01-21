"use client";
import { useAuth } from "@/hooks/use-auth";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import TableauEmbed from "@/components/tableau";
import TableauPublicEmbed from "@/components/TableauPublicEmbed";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { data } from "@/components/app-sidebar";

export default function Page() {
  const [selectedVizUrl, setSelectedVizUrl] = useState<string | null>(
    data.navMain[0].vizUrl ?? null
  );
  // Add state for active breadcrumb
  const [activePage, setActivePage] = useState(data.navMain[0].title);

  const { status } = useAuth();

  const handleSelect: React.MouseEventHandler<HTMLDivElement> & ((vizUrl: string) => void) = 
  (vizUrlOrEvent: string | React.SyntheticEvent<HTMLDivElement>) => {
    if (typeof vizUrlOrEvent === 'string') {
      setSelectedVizUrl(vizUrlOrEvent);
      // Find the matching menu item and update breadcrumb
      const activeItem = data.navMain.find(item => item.vizUrl === vizUrlOrEvent);
      if (activeItem) {
        setActivePage(activeItem.title);
      }
    }
    // Handle event case if needed
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar onSelect={handleSelect} />
      <SidebarInset>
        <header className="flex justify-between pr-5 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{activePage}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="auto-rows-min gap-4 md:grid-cols-3">
            {selectedVizUrl && <TableauPublicEmbed vizUrl={selectedVizUrl} />}

            {/* <TableauEmbed
              tableauUrl={
                "https://clientreporting.theinformationlab.co.uk/t/PublicDemo/views/IncomeStatement/IncomeStatement"
              }
            /> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
