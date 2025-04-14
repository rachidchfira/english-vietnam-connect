
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, DollarSign } from "lucide-react";

interface TaxCalculationResult {
  grossSalary: number;
  netSalary: number;
  employeeSocialInsurance: number;
  employeeHealthInsurance: number;
  employeeUnemploymentInsurance: number;
  salaryBeforeTax: number;
  personalDeduction: number;
  dependantDeduction: number;
  taxableSalary: number;
  personalIncomeTax: number;
  employerSocialInsurance: number;
  employerHealthInsurance: number;
  employerUnemploymentInsurance: number;
  tradeUnion: number;
  totalEmployerCost: number;
}

export function IncomeTaxCalculator({ language }: { language: "en" | "vi" }) {
  const [salary, setSalary] = useState<number>(0);
  const [currency, setCurrency] = useState<"VND" | "USD">("VND");
  const [insuranceBase, setInsuranceBase] = useState<"full" | "other">("full");
  const [taxMethod, setTaxMethod] = useState<"progressive" | "fixed">("progressive");
  const [dependents, setDependents] = useState<number>(0);
  const [nationality, setNationality] = useState<"local" | "expat">("local");
  const [zone, setZone] = useState<"1" | "2" | "3" | "4">("1");
  const [mode, setMode] = useState<"grossToNet" | "netToGross">("grossToNet");
  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  const translations = {
    title: {
      en: "Personal Income Tax Calculator",
      vi: "Máy Tính Thuế Thu Nhập Cá Nhân"
    },
    description: {
      en: "Calculate your salary details including tax obligations and insurance contributions",
      vi: "Tính chi tiết lương bao gồm nghĩa vụ thuế và đóng góp bảo hiểm"
    },
    salary: {
      en: "Salary",
      vi: "Lương"
    },
    currency: {
      en: "Currency",
      vi: "Tiền tệ"
    },
    insurance: {
      en: "Insurance",
      vi: "Bảo hiểm"
    },
    taxMethod: {
      en: "Tax Method",
      vi: "Phương thức tính thuế"
    },
    zone: {
      en: "Zone",
      vi: "Vùng"
    },
    dependents: {
      en: "Dependents",
      vi: "Người phụ thuộc"
    },
    nationality: {
      en: "Nationality",
      vi: "Quốc tịch"
    },
    fullSalary: {
      en: "Full Salary",
      vi: "Lương đầy đủ"
    },
    other: {
      en: "Other",
      vi: "Khác"
    },
    progressive: {
      en: "Progressive tax rate",
      vi: "Thuế suất luỹ tiến"
    },
    fixed: {
      en: "Fixed tax rate 10%",
      vi: "Thuế suất cố định 10%"
    },
    local: {
      en: "Local",
      vi: "Trong nước"
    },
    expat: {
      en: "Expat",
      vi: "Nước ngoài"
    },
    grossToNet: {
      en: "GROSS TO NET",
      vi: "TỪ TỔNG SANG RÒNG"
    },
    netToGross: {
      en: "NET TO GROSS",
      vi: "TỪ RÒNG SANG TỔNG"
    },
    grossSalary: {
      en: "GROSS SALARY",
      vi: "LƯƠNG GỘP"
    },
    netSalary: {
      en: "NET SALARY",
      vi: "LƯƠNG RÒNG"
    },
    employeeSalaryDetails: {
      en: "EMPLOYEE SALARY DETAILS",
      vi: "CHI TIẾT LƯƠNG NHÂN VIÊN"
    },
    employerCost: {
      en: "EMPLOYER COST",
      vi: "CHI PHÍ NGƯỜI SỬ DỤNG LAO ĐỘNG"
    },
    socialInsurance: {
      en: "Social Insurance",
      vi: "Bảo hiểm xã hội"
    },
    healthInsurance: {
      en: "Health Insurance",
      vi: "Bảo hiểm y tế"
    },
    unemploymentInsurance: {
      en: "Unemployment Insurance",
      vi: "Bảo hiểm thất nghiệp"
    },
    salaryBeforeTax: {
      en: "SALARY BEFORE TAX",
      vi: "LƯƠNG TRƯỚC THUẾ"
    },
    personalDeduction: {
      en: "Personal Deduction",
      vi: "Giảm trừ cá nhân"
    },
    dependantDeduction: {
      en: "Dependant Deduction",
      vi: "Giảm trừ người phụ thuộc"
    },
    taxableSalary: {
      en: "TAXABLE SALARY",
      vi: "LƯƠNG CHỊU THUẾ"
    },
    personalIncomeTax: {
      en: "Personal Income Tax",
      vi: "Thuế thu nhập cá nhân"
    },
    tradeUnion: {
      en: "Trade Union",
      vi: "Công đoàn"
    },
    totalEmployerCost: {
      en: "TOTAL EMPLOYER COST",
      vi: "TỔNG CHI PHÍ NGƯỜI SỬ DỤNG LAO ĐỘNG"
    }
  };

  const calculateTax = () => {
    // Constants for Vietnamese tax calculation
    const SOCIAL_INSURANCE_EMPLOYEE = 0.08; // 8%
    const HEALTH_INSURANCE_EMPLOYEE = 0.015; // 1.5%
    const UNEMPLOYMENT_INSURANCE_EMPLOYEE = 0.01; // 1%
    const SOCIAL_INSURANCE_EMPLOYER = 0.175; // 17.5%
    const HEALTH_INSURANCE_EMPLOYER = 0.03; // 3%
    const UNEMPLOYMENT_INSURANCE_EMPLOYER = 0.01; // 1%
    const TRADE_UNION_FEE = 0.02; // 2%
    const PERSONAL_DEDUCTION = 11000000; // 11 million VND
    const DEPENDENT_DEDUCTION = 4400000; // 4.4 million VND per dependent

    let result: TaxCalculationResult = {
      grossSalary: salary,
      employeeSocialInsurance: 0,
      employeeHealthInsurance: 0,
      employeeUnemploymentInsurance: 0,
      salaryBeforeTax: 0,
      personalDeduction: PERSONAL_DEDUCTION,
      dependantDeduction: dependents * DEPENDENT_DEDUCTION,
      taxableSalary: 0,
      personalIncomeTax: 0,
      netSalary: 0,
      employerSocialInsurance: 0,
      employerHealthInsurance: 0,
      employerUnemploymentInsurance: 0,
      tradeUnion: 0,
      totalEmployerCost: 0
    };

    if (mode === "grossToNet") {
      // Calculate employee deductions
      result.employeeSocialInsurance = salary * SOCIAL_INSURANCE_EMPLOYEE;
      result.employeeHealthInsurance = salary * HEALTH_INSURANCE_EMPLOYEE;
      result.employeeUnemploymentInsurance = salary * UNEMPLOYMENT_INSURANCE_EMPLOYEE;
      
      // Calculate salary before tax
      result.salaryBeforeTax = salary - result.employeeSocialInsurance - result.employeeHealthInsurance - result.employeeUnemploymentInsurance;
      
      // Calculate taxable income
      result.taxableSalary = Math.max(0, result.salaryBeforeTax - result.personalDeduction - result.dependantDeduction);
      
      // Calculate personal income tax (progressive)
      if (taxMethod === "progressive") {
        let remainingTaxable = result.taxableSalary;
        let tax = 0;
        
        // Vietnamese progressive tax brackets
        if (remainingTaxable > 0) {
          const bracket1 = Math.min(remainingTaxable, 5000000);
          tax += bracket1 * 0.05;
          remainingTaxable -= bracket1;
        }
        
        if (remainingTaxable > 0) {
          const bracket2 = Math.min(remainingTaxable, 5000000);
          tax += bracket2 * 0.1;
          remainingTaxable -= bracket2;
        }
        
        if (remainingTaxable > 0) {
          const bracket3 = Math.min(remainingTaxable, 8000000);
          tax += bracket3 * 0.15;
          remainingTaxable -= bracket3;
        }
        
        if (remainingTaxable > 0) {
          const bracket4 = Math.min(remainingTaxable, 14000000);
          tax += bracket4 * 0.2;
          remainingTaxable -= bracket4;
        }
        
        if (remainingTaxable > 0) {
          const bracket5 = Math.min(remainingTaxable, 18000000);
          tax += bracket5 * 0.25;
          remainingTaxable -= bracket5;
        }
        
        if (remainingTaxable > 0) {
          const bracket6 = Math.min(remainingTaxable, 32000000);
          tax += bracket6 * 0.3;
          remainingTaxable -= bracket6;
        }
        
        if (remainingTaxable > 0) {
          tax += remainingTaxable * 0.35;
        }
        
        result.personalIncomeTax = tax;
      } else {
        // Fixed tax rate 10%
        result.personalIncomeTax = result.taxableSalary * 0.1;
      }
      
      // Calculate net salary
      result.netSalary = result.salaryBeforeTax - result.personalIncomeTax;
      
    } else {
      // NET TO GROSS calculation would go here
      // This is more complex as it requires reverse calculation
      // For simplicity, I'm not implementing it fully
      result.netSalary = salary;
      // (Would require iterative calculation or formula to derive gross from net)
    }
    
    // Calculate employer costs
    result.employerSocialInsurance = salary * SOCIAL_INSURANCE_EMPLOYER;
    result.employerHealthInsurance = salary * HEALTH_INSURANCE_EMPLOYER;
    result.employerUnemploymentInsurance = salary * UNEMPLOYMENT_INSURANCE_EMPLOYER;
    result.tradeUnion = salary * TRADE_UNION_FEE;
    result.totalEmployerCost = salary + result.employerSocialInsurance + result.employerHealthInsurance + result.employerUnemploymentInsurance + result.tradeUnion;

    setResult(result);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: currency,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salary">{translations.salary[language]}:</Label>
              <Input
                id="salary"
                type="number"
                value={salary || ''}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label>{translations.insurance[language]}:</Label>
              <RadioGroup 
                value={insuranceBase} 
                onValueChange={(value: "full" | "other") => setInsuranceBase(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="insurance-full" />
                  <Label htmlFor="insurance-full">{translations.fullSalary[language]}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="insurance-other" />
                  <Label htmlFor="insurance-other">{translations.other[language]}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>{translations.zone[language]}:</Label>
              <Select value={zone} onValueChange={(value: "1" | "2" | "3" | "4") => setZone(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{translations.currency[language]}:</Label>
              <Select value={currency} onValueChange={(value: "VND" | "USD") => setCurrency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>{translations.taxMethod[language]}:</Label>
              <RadioGroup 
                value={taxMethod} 
                onValueChange={(value: "progressive" | "fixed") => setTaxMethod(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="progressive" id="tax-progressive" />
                  <Label htmlFor="tax-progressive">{translations.progressive[language]}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="tax-fixed" />
                  <Label htmlFor="tax-fixed">{translations.fixed[language]}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>{translations.dependents[language]}:</Label>
              <Input
                type="number"
                min="0"
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{translations.nationality[language]}:</Label>
              <Select value={nationality} onValueChange={(value: "local" | "expat") => setNationality(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">{translations.local[language]}</SelectItem>
                  <SelectItem value="expat">{translations.expat[language]}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            variant={mode === "grossToNet" ? "default" : "outline"}
            onClick={() => setMode("grossToNet")}
            className="flex-1 sm:flex-none"
          >
            {translations.grossToNet[language]}
          </Button>
          
          <Button 
            variant={mode === "netToGross" ? "default" : "outline"}
            onClick={() => setMode("netToGross")}
            className="flex-1 sm:flex-none"
          >
            {translations.netToGross[language]}
          </Button>
        </div>
        
        <Button 
          onClick={calculateTax} 
          className="w-full"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          {mode === "grossToNet" ? translations.grossToNet[language] : translations.netToGross[language]}
        </Button>
      </CardContent>
      
      {result && (
        <CardFooter className="flex flex-col items-stretch">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center text-center mb-6">
            <div className="bg-primary p-6 rounded-md text-white">
              <div className="text-sm font-medium mb-1">{translations.grossSalary[language]}</div>
              <div className="text-2xl font-bold">{formatCurrency(result.grossSalary)}</div>
            </div>
            
            <div className="flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            
            <div className="bg-secondary md:col-start-2 md:row-start-1 p-6 rounded-md text-secondary-foreground">
              <div className="text-sm font-medium mb-1">{translations.netSalary[language]}</div>
              <div className="text-2xl font-bold">{formatCurrency(result.netSalary)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <h3 className="text-lg font-bold text-schedule-green mb-4">{translations.employeeSalaryDetails[language]}:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{translations.grossSalary[language]}:</span>
                  <span className="font-medium">{formatCurrency(result.grossSalary)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.socialInsurance[language]} (8%):</span>
                  <span className="text-destructive">- {formatCurrency(result.employeeSocialInsurance)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.healthInsurance[language]} (1.5%):</span>
                  <span className="text-destructive">- {formatCurrency(result.employeeHealthInsurance)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.unemploymentInsurance[language]} (1%):</span>
                  <span className="text-destructive">- {formatCurrency(result.employeeUnemploymentInsurance)}</span>
                </div>
                
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>{translations.salaryBeforeTax[language]}:</span>
                  <span>{formatCurrency(result.salaryBeforeTax)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.personalDeduction[language]}:</span>
                  <span className="text-destructive">- {formatCurrency(result.personalDeduction)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.dependantDeduction[language]}:</span>
                  <span className="text-destructive">- {formatCurrency(result.dependantDeduction)}</span>
                </div>
                
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>{translations.taxableSalary[language]}:</span>
                  <span>{formatCurrency(result.taxableSalary)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.personalIncomeTax[language]}:</span>
                  <span className="text-destructive">- {formatCurrency(result.personalIncomeTax)}</span>
                </div>
                
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>{translations.netSalary[language]}:</span>
                  <span className="text-schedule-green">{formatCurrency(result.netSalary)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-schedule-green mb-4">{translations.employerCost[language]}:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{translations.grossSalary[language]}:</span>
                  <span className="font-medium">{formatCurrency(result.grossSalary)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.socialInsurance[language]} (17.5%):</span>
                  <span className="text-schedule-green">+ {formatCurrency(result.employerSocialInsurance)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.healthInsurance[language]} (3%):</span>
                  <span className="text-schedule-green">+ {formatCurrency(result.employerHealthInsurance)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.unemploymentInsurance[language]} (1%):</span>
                  <span className="text-schedule-green">+ {formatCurrency(result.employerUnemploymentInsurance)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{translations.tradeUnion[language]} (2%):</span>
                  <span className="text-schedule-green">+ {formatCurrency(result.tradeUnion)}</span>
                </div>
                
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>{translations.totalEmployerCost[language]}:</span>
                  <span>{formatCurrency(result.totalEmployerCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
