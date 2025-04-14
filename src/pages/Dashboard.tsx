import { 
  Users, 
  FileCheck, 
  DollarSign, 
  Book, 
  Building, 
  TrendingUp, 
  Calendar,
  ArrowRightLeft
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { DashboardCard } from "@/components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Teachers"
          value="124"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Schools"
          value="37"
          icon={<Building className="h-4 w-4" />}
          trend={{ value: 4, isPositive: true }}
        />
        <StatCard
          title="Classes This Week"
          value="276"
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Revenue (MTD)"
          value="$48,352"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Quick Actions">
          <div className="space-y-2">
            <button className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left hover:bg-muted flex items-center">
              <ArrowRightLeft className="mr-2 h-4 w-4 text-primary" />
              Match Teachers with Schools
            </button>
            <button className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left hover:bg-muted">
              Schedule Interview
            </button>
            <button className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left hover:bg-muted">
              Process New Hire
            </button>
            <button className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left hover:bg-muted">
              Generate Payroll
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Activities">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">New teacher application received</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-sm">Visa approval for James Smith</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Contract renewal pending for 5 teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-sm">Scheduling conflict detected</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Events">
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Teacher Training Workshop</span>
              <span className="text-xs text-muted-foreground">Apr 15, 2025 • 9:00 AM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">School Partner Meeting</span>
              <span className="text-xs text-muted-foreground">Apr 17, 2025 • 2:00 PM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Visa Renewal Deadline</span>
              <span className="text-xs text-muted-foreground">Apr 20, 2025</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Monthly Performance Review</span>
              <span className="text-xs text-muted-foreground">Apr 28, 2025 • 10:00 AM</span>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Key Metrics" description="Last 30 days">
          <div className="h-[200px] flex items-center justify-center border rounded bg-muted/20">
            <p className="text-muted-foreground">Charts will be implemented here</p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Teacher Allocation" description="By school">
          <div className="h-[200px] flex items-center justify-center border rounded bg-muted/20">
            <p className="text-muted-foreground">Distribution chart will be implemented here</p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
