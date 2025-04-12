
import { DashboardCard } from "@/components/DashboardCard";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartTooltip
} from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialOverviewProps {
  language: "en" | "vi";
}

export function FinancialOverview({ language }: FinancialOverviewProps) {
  // Sample data for demonstration
  const revenueData = [
    { month: "Jan", revenue: 52000, expenses: 22000 },
    { month: "Feb", revenue: 58000, expenses: 25000 },
    { month: "Mar", revenue: 61000, expenses: 27000 },
    { month: "Apr", revenue: 65000, expenses: 28000 },
    { month: "May", revenue: 68000, expenses: 29000 },
    { month: "Jun", revenue: 72000, expenses: 31000 }
  ];

  const payrollStatusData = [
    { name: "Paid", value: 85 },
    { name: "Pending", value: 10 },
    { name: "Overdue", value: 5 }
  ];
  
  const invoiceStatusData = [
    { name: "Paid", value: 75 },
    { name: "Pending", value: 15 },
    { name: "Overdue", value: 10 }
  ];

  const COLORS = ['#8B5CF6', '#D3E4FD', '#F97316'];
  
  const translations = {
    overview: {
      en: "Financial Overview",
      vi: "Tổng Quan Tài Chính"
    },
    revenue: {
      en: "Revenue & Expenses",
      vi: "Doanh Thu & Chi Phí"
    },
    payrollStatus: {
      en: "Payroll Status",
      vi: "Trạng Thái Lương"
    },
    invoiceStatus: {
      en: "Invoice Status",
      vi: "Trạng Thái Hóa Đơn"
    },
    totalRevenue: {
      en: "Total Revenue",
      vi: "Tổng Doanh Thu"
    },
    totalExpenses: {
      en: "Total Expenses",
      vi: "Tổng Chi Phí"
    },
    netIncome: {
      en: "Net Income",
      vi: "Thu Nhập Ròng"
    },
    paid: {
      en: "Paid",
      vi: "Đã Thanh Toán"
    },
    pending: {
      en: "Pending",
      vi: "Đang Xử Lý"
    },
    overdue: {
      en: "Overdue",
      vi: "Quá Hạn"
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Calculate summary figures
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard title={translations.totalRevenue[language]}>
          <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalRevenue)}</div>
        </DashboardCard>
        <DashboardCard title={translations.totalExpenses[language]}>
          <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalExpenses)}</div>
        </DashboardCard>
        <DashboardCard title={translations.netIncome[language]}>
          <div className="text-2xl font-bold text-violet-600">{formatCurrency(netIncome)}</div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{translations.revenue[language]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  revenue: { label: translations.revenue.en },
                  expenses: { label: translations.totalExpenses.en },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8B5CF6" name="revenue" />
                    <Bar dataKey="expenses" fill="#F97316" name="expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-rows-2">
          <Card>
            <CardHeader>
              <CardTitle>{translations.payrollStatus[language]}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[140px]">
                <ChartContainer
                  config={{
                    Paid: { color: "#8B5CF6" },
                    Pending: { color: "#D3E4FD" },
                    Overdue: { color: "#F97316" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={payrollStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {payrollStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translations.invoiceStatus[language]}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[140px]">
                <ChartContainer
                  config={{
                    Paid: { color: "#8B5CF6" },
                    Pending: { color: "#D3E4FD" },
                    Overdue: { color: "#F97316" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={invoiceStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {invoiceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
