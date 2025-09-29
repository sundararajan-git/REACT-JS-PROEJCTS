import "./App.css";
import { AppSidebar } from "@/components/AppSidebar";
import { SectionCards } from "@/components/SectionCards";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./app/dashboard/data.json";
import { EmployeePerformance } from "./components/ChartAreaInteractive";
import { EmployeeAttendanceChart } from "./components/EmployeeAttendanceChart";
import { employeeData, EmployeeDataTable } from "./components/DataTable";

const App = () => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 w-full px-4 lg:px-6 ">
                <EmployeePerformance />
                <EmployeeAttendanceChart />
              </div>
              <div className="px-4">
                <EmployeeDataTable data={employeeData} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default App;
