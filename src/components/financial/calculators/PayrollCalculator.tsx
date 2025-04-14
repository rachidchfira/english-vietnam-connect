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
import { Textarea } from "@/components/ui/textarea";
import { Calculator, FileText } from "lucide-react";

interface EmployeeSalary {
  id: number;
  name: string;
  position: string;
  baseSalary: number;
  bonus: number;
  overtime: number;
  deductions: number;
}

export function PayrollCalculator({ language }: { language: "en" | "vi" }) {
  const [employees, setEmployees] = useState<EmployeeSalary[]>([
    { id: 1, name: "", position: "", baseSalary: 0, bonus: 0, overtime: 0, deductions: 0 }
  ]);
  const [month, setMonth] = useState<string>("4");
  const [year, setYear] = useState<string>("2025");
  const [currency, setCurrency] = useState<"VND" | "USD">("VND");
  const [results, setResults] = useState<Array<{ id: number; total: number; }>>([]);
  const [bulkInput, setBulkInput] = useState<string>("");

  const translations = {
    title: {
      en: "Payroll Calculator",
      vi: "Tính Lương"
    },
    description: {
      en: "Calculate total payroll including salaries, bonuses, and deductions",
      vi: "Tính tổng lương bao gồm lương cơ bản, thưởng và các khoản khấu trừ"
    },
    addEmployee: {
      en: "Add Employee",
      vi: "Thêm Nhân Viên"
    },
    calculate: {
      en: "Calculate Payroll",
      vi: "Tính Lương"
    },
    exportReport: {
      en: "Export Report",
      vi: "Xuất Báo Cáo"
    },
    bulkUpload: {
      en: "Bulk Upload",
      vi: "Tải Lên Hàng Loạt"
    },
    employee: {
      en: "Employee",
      vi: "Nhân Viên"
    },
    name: {
      en: "Name",
      vi: "Tên"
    },
    position: {
      en: "Position",
      vi: "Chức Vụ"
    },
    baseSalary: {
      en: "Base Salary",
      vi: "Lương Cơ Bản"
    },
    bonus: {
      en: "Bonus",
      vi: "Thưởng"
    },
    overtime: {
      en: "Overtime",
      vi: "Tăng Ca"
    },
    deductions: {
      en: "Deductions",
      vi: "Khấu Trừ"
    },
    totalSalary: {
      en: "Total Salary",
      vi: "Tổng Lương"
    },
    month: {
      en: "Month",
      vi: "Tháng"
    },
    year: {
      en: "Year",
      vi: "Năm"
    },
    currency: {
      en: "Currency",
      vi: "Tiền Tệ"
    },
    january: {
      en: "January",
      vi: "Tháng 1"
    },
    february: {
      en: "February",
      vi: "Tháng 2"
    },
    march: {
      en: "March",
      vi: "Tháng 3"
    },
    april: {
      en: "April",
      vi: "Tháng 4"
    },
    may: {
      en: "May",
      vi: "Tháng 5"
    },
    june: {
      en: "June",
      vi: "Tháng 6"
    },
    july: {
      en: "July",
      vi: "Tháng 7"
    },
    august: {
      en: "August",
      vi: "Tháng 8"
    },
    september: {
      en: "September",
      vi: "Tháng 9"
    },
    october: {
      en: "October",
      vi: "Tháng 10"
    },
    november: {
      en: "November",
      vi: "Tháng 11"
    },
    december: {
      en: "December",
      vi: "Tháng 12"
    },
    bulkInstructions: {
      en: "Enter one employee per line in the format: Name, Position, Base Salary, Bonus, Overtime, Deductions",
      vi: "Nhập mỗi nhân viên trên một dòng theo định dạng: Tên, Chức vụ, Lương cơ bản, Thưởng, Tăng ca, Khấu trừ"
    },
    totalPayroll: {
      en: "Total Payroll",
      vi: "Tổng Chi Phí Lương"
    }
  };

  const months = [
    { value: "1", label: { en: "January", vi: "Tháng 1" } },
    { value: "2", label: { en: "February", vi: "Tháng 2" } },
    { value: "3", label: { en: "March", vi: "Tháng 3" } },
    { value: "4", label: { en: "April", vi: "Tháng 4" } },
    { value: "5", label: { en: "May", vi: "Tháng 5" } },
    { value: "6", label: { en: "June", vi: "Tháng 6" } },
    { value: "7", label: { en: "July", vi: "Tháng 7" } },
    { value: "8", label: { en: "August", vi: "Tháng 8" } },
    { value: "9", label: { en: "September", vi: "Tháng 9" } },
    { value: "10", label: { en: "October", vi: "Tháng 10" } },
    { value: "11", label: { en: "November", vi: "Tháng 11" } },
    { value: "12", label: { en: "December", vi: "Tháng 12" } }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - 2 + i).toString());

  const addEmployee = () => {
    const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
    setEmployees([...employees, { id: newId, name: "", position: "", baseSalary: 0, bonus: 0, overtime: 0, deductions: 0 }]);
  };

  const updateEmployee = (id: number, field: keyof EmployeeSalary, value: string | number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, [field]: value } : emp
    ));
  };

  const processEmployees = () => {
    const lines = bulkInput.split('\n').filter(line => line.trim() !== '');
    const newEmployees = lines.map((line, index) => {
      const [name, position, baseSalary, bonus, overtime, deductions] = line.split(',').map(item => item.trim());
      return {
        id: index + 1,
        name: name || "",
        position: position || "",
        baseSalary: Number(baseSalary) || 0,
        bonus: Number(bonus) || 0,
        overtime: Number(overtime) || 0,
        deductions: Number(deductions) || 0
      };
    });
    
    if (newEmployees.length > 0) {
      setEmployees(newEmployees);
      setBulkInput('');
    }
  };

  const calculatePayroll = () => {
    const calculatedResults = employees.map(employee => {
      const total = employee.baseSalary + employee.bonus + employee.overtime - employee.deductions;
      return { id: employee.id, total };
    });
    
    setResults(calculatedResults);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency === "VND" ? 'vi-VN' : 'en-US', { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getTotalPayroll = () => {
    return results.reduce((sum, result) => sum + result.total, 0);
  };

  const handleExportReport = () => {
    // In a real application, this would generate a CSV or PDF report
    alert('Export functionality would be implemented here. This would generate a report with all employee salary details.');
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>{translations.month[language]}:</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{translations.year[language]}:</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
        </div>
        
        <div className="space-y-2">
          <Label>{translations.bulkUpload[language]}:</Label>
          <Textarea 
            placeholder={translations.bulkInstructions[language]}
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            rows={5}
          />
          <Button variant="outline" onClick={processEmployees} className="mt-2">
            {translations.bulkUpload[language]}
          </Button>
        </div>
        
        <div className="space-y-4">
          {employees.map((employee, index) => (
            <div key={employee.id} className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">{translations.employee[language]} {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{translations.name[language]}:</Label>
                  <Input 
                    value={employee.name}
                    onChange={(e) => updateEmployee(employee.id, 'name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>{translations.position[language]}:</Label>
                  <Input 
                    value={employee.position}
                    onChange={(e) => updateEmployee(employee.id, 'position', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>{translations.baseSalary[language]}:</Label>
                  <Input 
                    type="number"
                    value={employee.baseSalary || ''}
                    onChange={(e) => updateEmployee(employee.id, 'baseSalary', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>{translations.bonus[language]}:</Label>
                  <Input 
                    type="number"
                    value={employee.bonus || ''}
                    onChange={(e) => updateEmployee(employee.id, 'bonus', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>{translations.overtime[language]}:</Label>
                  <Input 
                    type="number"
                    value={employee.overtime || ''}
                    onChange={(e) => updateEmployee(employee.id, 'overtime', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>{translations.deductions[language]}:</Label>
                  <Input 
                    type="number"
                    value={employee.deductions || ''}
                    onChange={(e) => updateEmployee(employee.id, 'deductions', Number(e.target.value))}
                  />
                </div>
              </div>
              
              {results.find(r => r.id === employee.id) && (
                <div className="mt-4 text-right">
                  <span className="font-medium">{translations.totalSalary[language]}: </span>
                  <span className="text-schedule-green font-bold">
                    {formatCurrency(results.find(r => r.id === employee.id)?.total || 0)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            onClick={addEmployee}
          >
            {translations.addEmployee[language]}
          </Button>
          
          <Button 
            onClick={calculatePayroll}
            className="flex items-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            {translations.calculate[language]}
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleExportReport}
            className="flex items-center gap-2"
            disabled={results.length === 0}
          >
            <FileText className="h-4 w-4" />
            {translations.exportReport[language]}
          </Button>
        </div>
      </CardContent>
      
      {results.length > 0 && (
        <CardFooter className="flex justify-between items-center">
          <div className="font-medium text-lg">{translations.totalPayroll[language]}:</div>
          <div className="text-2xl font-bold text-schedule-green">{formatCurrency(getTotalPayroll())}</div>
        </CardFooter>
      )}
    </Card>
  );
}
