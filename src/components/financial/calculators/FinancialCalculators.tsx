
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PayrollCalculator } from "./PayrollCalculator";
import { IncomeTaxCalculator } from "./IncomeTaxCalculator";
import { SocialInsuranceCalculator } from "./SocialInsuranceCalculator";
import { DollarSign, Calculator, BadgePercent } from "lucide-react";

export function FinancialCalculators({ language }: { language: "en" | "vi" }) {
  const [activeTab, setActiveTab] = useState("payroll");

  const translations = {
    payroll: {
      en: "Payroll Calculator",
      vi: "Tính Lương"
    },
    incomeTax: {
      en: "Income Tax Calculator",
      vi: "Tính Thuế Thu Nhập"
    },
    socialInsurance: {
      en: "Social Insurance Calculator",
      vi: "Tính Bảo Hiểm Xã Hội"
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="payroll" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span className="hidden sm:inline">{translations.payroll[language]}</span>
        </TabsTrigger>
        
        <TabsTrigger value="incomeTax" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span className="hidden sm:inline">{translations.incomeTax[language]}</span>
        </TabsTrigger>
        
        <TabsTrigger value="socialInsurance" className="flex items-center gap-2">
          <BadgePercent className="h-4 w-4" />
          <span className="hidden sm:inline">{translations.socialInsurance[language]}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="payroll" className="mt-6">
        <PayrollCalculator language={language} />
      </TabsContent>
      
      <TabsContent value="incomeTax" className="mt-6">
        <IncomeTaxCalculator language={language} />
      </TabsContent>
      
      <TabsContent value="socialInsurance" className="mt-6">
        <SocialInsuranceCalculator language={language} />
      </TabsContent>
    </Tabs>
  );
}
