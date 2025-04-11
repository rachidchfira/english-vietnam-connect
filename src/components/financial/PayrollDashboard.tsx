
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronsUpDown, 
  Calendar, 
  CreditCard
} from "lucide-react";

interface PayrollDashboardProps {
  language: "en" | "vi";
}

export function PayrollDashboard({ language }: PayrollDashboardProps) {
  const translations = {
    title: {
      en: "Payroll Management",
      vi: "Quản Lý Bảng Lương"
    },
    subtitle: {
      en: "Process and track teacher payments",
      vi: "Xử lý và theo dõi thanh toán cho giáo viên"
    },
    processPayroll: {
      en: "Process Payroll",
      vi: "Xử Lý Bảng Lương"
    },
    downloadReport: {
      en: "Download Report",
      vi: "Tải Báo Cáo"
    },
    search: {
      en: "Search teachers...",
      vi: "Tìm kiếm giáo viên..."
    },
    currency: {
      en: "Currency",
      vi: "Tiền Tệ"
    },
    period: {
      en: "Pay Period",
      vi: "Kỳ Lương"
    },
    name: {
      en: "Name",
      vi: "Tên"
    },
    position: {
      en: "Position",
      vi: "Vị Trí"
    },
    salary: {
      en: "Salary",
      vi: "Lương"
    },
    currency_type: {
      en: "Currency",
      vi: "Tiền Tệ"
    },
    status: {
      en: "Status",
      vi: "Trạng Thái"
    },
    actions: {
      en: "Actions",
      vi: "Hành Động"
    },
    paid: {
      en: "Paid",
      vi: "Đã Thanh Toán"
    },
    pending: {
      en: "Pending",
      vi: "Đang Xử Lý"
    },
    pay: {
      en: "Pay",
      vi: "Thanh Toán"
    },
    view: {
      en: "View",
      vi: "Xem"
    }
  };

  // Sample data for demonstration
  const teachers = [
    { id: 1, name: "John Smith", position: "Senior English Teacher", salary: 2500, currency: "USD", status: "pending" },
    { id: 2, name: "Mary Johnson", position: "English Teacher", salary: 2200, currency: "USD", status: "paid" },
    { id: 3, name: "Nguyen Van A", position: "English Teacher", salary: 30000000, currency: "VND", status: "pending" },
    { id: 4, name: "Tran Thi B", position: "Junior English Teacher", salary: 25000000, currency: "VND", status: "paid" },
    { id: 5, name: "David Williams", position: "Senior English Teacher", salary: 2800, currency: "USD", status: "paid" },
    { id: 6, name: "Le Van C", position: "English Teacher", salary: 28000000, currency: "VND", status: "pending" }
  ];

  const formatCurrency = (value: number, currency: string) => {
    if (currency === "USD") {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    } else {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle>{translations.title[language]}</CardTitle>
              <CardDescription>{translations.subtitle[language]}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button className="gap-1">
                <Calendar className="h-4 w-4" />
                {translations.processPayroll[language]}
              </Button>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                {translations.downloadReport[language]}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={translations.search[language]}
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={translations.currency[language]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="vnd">VND</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="april">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={translations.period[language]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="april">April 2025</SelectItem>
                <SelectItem value="march">March 2025</SelectItem>
                <SelectItem value="february">February 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    {translations.name[language]}
                    <ChevronsUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead>{translations.position[language]}</TableHead>
                  <TableHead>
                    {translations.salary[language]}
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead>{translations.currency_type[language]}</TableHead>
                  <TableHead>{translations.status[language]}</TableHead>
                  <TableHead className="text-right">{translations.actions[language]}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.position}</TableCell>
                    <TableCell>{formatCurrency(teacher.salary, teacher.currency)}</TableCell>
                    <TableCell>{teacher.currency}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === "paid" ? "secondary" : "outline"}>
                        {teacher.status === "paid" 
                          ? translations.paid[language] 
                          : translations.pending[language]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {teacher.status === "pending" ? (
                        <Button size="sm" className="gap-1">
                          <CreditCard className="h-4 w-4" />
                          {translations.pay[language]}
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          {translations.view[language]}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
