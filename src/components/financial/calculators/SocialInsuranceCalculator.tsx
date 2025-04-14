
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Plus } from "lucide-react";

interface PhaseData {
  id: number;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  monthlySalary: number;
}

export function SocialInsuranceCalculator({ language }: { language: "en" | "vi" }) {
  const [phases, setPhases] = useState<PhaseData[]>([
    { 
      id: 1, 
      fromMonth: "1", 
      fromYear: "2025", 
      toMonth: "12", 
      toYear: "2025", 
      monthlySalary: 0 
    }
  ]);
  const [result, setResult] = useState<number | null>(null);

  const translations = {
    title: {
      en: "One-Time Social Insurance Calculator",
      vi: "Tính Bảo Hiểm Xã Hội Một Lần"
    },
    description: {
      en: "Calculate your one-time social insurance payment based on your salary history. For contributions less than 1 year, benefit is 22% of total adjusted contributions. For 1 year or more, benefit is calculated as 2 × average monthly salary × years, where months 1-6 round down to 0.1 year and months 7-12 round up to 1 year.",
      vi: "Tính khoản thanh toán bảo hiểm xã hội một lần dựa trên lịch sử lương của bạn. Đối với đóng góp dưới 1 năm, lợi ích là 22% tổng đóng góp điều chỉnh. Đối với 1 năm trở lên, lợi ích được tính là 2 × lương tháng trung bình × số năm, trong đó tháng 1-6 làm tròn xuống 0,1 năm và tháng 7-12 làm tròn lên 1 năm."
    },
    phase: {
      en: "Phase",
      vi: "Giai Đoạn"
    },
    from: {
      en: "From",
      vi: "Từ"
    },
    to: {
      en: "To",
      vi: "Đến"
    },
    monthlySalary: {
      en: "Monthly Salary",
      vi: "Lương Hàng Tháng"
    },
    addPhase: {
      en: "Add Phase",
      vi: "Thêm Giai Đoạn"
    },
    calculate: {
      en: "Calculate One-Time Payment",
      vi: "Tính Thanh Toán Một Lần"
    },
    result: {
      en: "Estimated One-Time Payment",
      vi: "Dự Tính Thanh Toán Một Lần"
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

  const addPhase = () => {
    const newId = phases.length > 0 ? Math.max(...phases.map(p => p.id)) + 1 : 1;
    setPhases([...phases, { 
      id: newId, 
      fromMonth: "1", 
      fromYear: currentYear.toString(), 
      toMonth: "12", 
      toYear: currentYear.toString(), 
      monthlySalary: 0 
    }]);
  };

  const updatePhase = (id: number, field: keyof PhaseData, value: string | number) => {
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, [field]: value } : phase
    ));
  };

  const calculatePayment = () => {
    // Calculate the payment based on the phases
    let totalPayment = 0;
    
    for (const phase of phases) {
      const fromDate = new Date(`${phase.fromYear}-${phase.fromMonth}-01`);
      const toDate = new Date(`${phase.toYear}-${phase.toMonth}-01`);
      
      // Calculate contribution period in months
      const months = (toDate.getFullYear() - fromDate.getFullYear()) * 12 + 
                    (toDate.getMonth() - fromDate.getMonth()) + 1;
      
      // Convert months to years, applying the rounding rules
      let years;
      if (months < 12) { // Less than 1 year
        const contributions = phase.monthlySalary * months;
        const benefit = contributions * 0.22; // 22% of total contributions
        totalPayment += benefit;
      } else {
        // For 1 year or more
        // Calculate years with rounding rule: months 1-6 round down, months 7-12 round up
        const fullYears = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        years = fullYears;
        if (remainingMonths > 0) {
          years += (remainingMonths >= 7) ? 1 : 0.1;
        }
        
        // Calculate benefit: 2 × average monthly salary × years
        const benefit = 2 * phase.monthlySalary * years;
        totalPayment += benefit;
      }
    }
    
    setResult(totalPayment);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-schedule-header">
          {translations.title[language]}
        </CardTitle>
        <CardDescription>{translations.description[language]}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {phases.map((phase, index) => (
          <div key={phase.id} className="border rounded-md p-4 space-y-4">
            <div className="font-medium">
              {translations.phase[language]} {index + 1}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{translations.from[language]}:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select 
                    value={phase.fromMonth} 
                    onValueChange={(value) => updatePhase(phase.id, 'fromMonth', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={`from-month-${month}`} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={phase.fromYear}
                    onValueChange={(value) => updatePhase(phase.id, 'fromYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={`from-year-${year}`} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{translations.to[language]}:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select 
                    value={phase.toMonth}
                    onValueChange={(value) => updatePhase(phase.id, 'toMonth', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={`to-month-${month}`} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={phase.toYear}
                    onValueChange={(value) => updatePhase(phase.id, 'toYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={`to-year-${year}`} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>{translations.monthlySalary[language]}:</Label>
              <Input
                type="number"
                value={phase.monthlySalary || ''}
                onChange={(e) => updatePhase(phase.id, 'monthlySalary', Number(e.target.value))}
                className="text-right"
              />
            </div>
          </div>
        ))}
        
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            onClick={addPhase}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {translations.addPhase[language]}
          </Button>
          
          <Button 
            onClick={calculatePayment}
            className="flex items-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            {translations.calculate[language]}
          </Button>
        </div>
      </CardContent>
      
      {result !== null && (
        <CardFooter className="flex flex-col items-start">
          <p className="text-lg font-medium">{translations.result[language]}:</p>
          <p className="text-2xl font-bold text-schedule-green">{formatCurrency(result)}</p>
        </CardFooter>
      )}
    </Card>
  );
}
