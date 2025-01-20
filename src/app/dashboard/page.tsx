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
import TableauEmbed from "@/components/tableau";
import TableauPublicEmbed from "@/components/TableauPublicEmbed";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  const vizUrl = process.env.NEXT_PUBLIC_VIZ_URL as string;

  const { status } = useAuth();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between pr-5 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  Insight Analysis
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data SD WAN</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="auto-rows-min gap-4 md:grid-cols-3">
            <TableauPublicEmbed vizUrl={vizUrl} />

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
