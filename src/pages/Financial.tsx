
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { PayrollDashboard } from "@/components/financial/PayrollDashboard";
import { InvoicingDashboard } from "@/components/financial/InvoicingDashboard";
import { ExpenseManagement } from "@/components/financial/ExpenseManagement";
import { FinancialOverview } from "@/components/financial/FinancialOverview";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Financial() {
  const [language, setLanguage] = useState<"en" | "vi">("en");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "vi" : "en");
  };

  const translations = {
    title: {
      en: "Financial Management",
      vi: "Quản Lý Tài Chính"
    },
    subtitle: {
      en: "Manage payroll, invoicing, and expenses for your teaching staff",
      vi: "Quản lý lương, hóa đơn và chi phí cho nhân viên giảng dạy của bạn"
    },
    payroll: {
      en: "Payroll",
      vi: "Bảng Lương"
    },
    invoicing: {
      en: "Invoicing",
      vi: "Hóa Đơn"
    },
    expenses: {
      en: "Expenses",
      vi: "Chi Phí"
    },
    overview: {
      en: "Overview",
      vi: "Tổng Quan"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translations.title[language]}</h1>
          <p className="text-muted-foreground">
            {translations.subtitle[language]}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
          <Globe className="h-4 w-4" />
          {language === "en" ? "Tiếng Việt" : "English"}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">{translations.overview[language]}</TabsTrigger>
          <TabsTrigger value="payroll">{translations.payroll[language]}</TabsTrigger>
          <TabsTrigger value="invoicing">{translations.invoicing[language]}</TabsTrigger>
          <TabsTrigger value="expenses">{translations.expenses[language]}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <FinancialOverview language={language} />
        </TabsContent>
        
        <TabsContent value="payroll" className="space-y-4">
          <PayrollDashboard language={language} />
        </TabsContent>
        
        <TabsContent value="invoicing" className="space-y-4">
          <InvoicingDashboard language={language} />
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <ExpenseManagement language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
