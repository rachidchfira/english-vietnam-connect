
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Download,
  Search,
  Filter,
  ArrowUpDown,
  ChevronsUpDown,
  Clock,
  Calendar,
  FilePlus,
  Send,
  Eye
} from "lucide-react";

interface InvoicingDashboardProps {
  language: "en" | "vi";
}

export function InvoicingDashboard({ language }: InvoicingDashboardProps) {
  const translations = {
    title: {
      en: "Invoicing",
      vi: "Hóa Đơn"
    },
    subtitle: {
      en: "Manage school invoices and payments",
      vi: "Quản lý hóa đơn và thanh toán trường học"
    },
    createInvoice: {
      en: "Create Invoice",
      vi: "Tạo Hóa Đơn"
    },
    downloadReport: {
      en: "Download Report",
      vi: "Tải Báo Cáo"
    },
    search: {
      en: "Search schools...",
      vi: "Tìm kiếm trường học..."
    },
    all: {
      en: "All",
      vi: "Tất Cả"
    },
    pending: {
      en: "Pending",
      vi: "Đang Xử Lý"
    },
    paid: {
      en: "Paid",
      vi: "Đã Thanh Toán"
    },
    overdue: {
      en: "Overdue",
      vi: "Quá Hạn"
    },
    invoice: {
      en: "Invoice",
      vi: "Hóa Đơn"
    },
    school: {
      en: "School",
      vi: "Trường Học"
    },
    amount: {
      en: "Amount",
      vi: "Số Tiền"
    },
    date: {
      en: "Date",
      vi: "Ngày"
    },
    status: {
      en: "Status",
      vi: "Trạng Thái"
    },
    actions: {
      en: "Actions",
      vi: "Hành Động"
    },
    view: {
      en: "View",
      vi: "Xem"
    },
    send: {
      en: "Send",
      vi: "Gửi"
    },
    remind: {
      en: "Remind",
      vi: "Nhắc Nhở"
    }
  };

  // Sample data for demonstration
  const invoices = [
    { id: "INV-2025-001", school: "Hanoi International School", amount: 12500, date: "2025-04-10", status: "paid" },
    { id: "INV-2025-002", school: "Saigon Primary School", amount: 8700, date: "2025-04-08", status: "pending" },
    { id: "INV-2025-003", school: "American School Vietnam", amount: 15800, date: "2025-03-25", status: "overdue" },
    { id: "INV-2025-004", school: "British Vietnamese School", amount: 9600, date: "2025-04-01", status: "pending" },
    { id: "INV-2025-005", school: "Global Education Center", amount: 7300, date: "2025-03-29", status: "paid" },
    { id: "INV-2025-006", school: "Future Stars Academy", amount: 6800, date: "2025-03-15", status: "overdue" }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
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
                <FilePlus className="h-4 w-4" />
                {translations.createInvoice[language]}
              </Button>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                {translations.downloadReport[language]}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">{translations.all[language]}</TabsTrigger>
              <TabsTrigger value="pending">{translations.pending[language]}</TabsTrigger>
              <TabsTrigger value="paid">{translations.paid[language]}</TabsTrigger>
              <TabsTrigger value="overdue">{translations.overdue[language]}</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={translations.search[language]}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">
                    {translations.invoice[language]}
                  </TableHead>
                  <TableHead>
                    {translations.school[language]}
                  </TableHead>
                  <TableHead>
                    {translations.amount[language]}
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead>
                    {translations.date[language]}
                    <ChevronsUpDown className="ml-2 h-4 w-4 inline" />
                  </TableHead>
                  <TableHead>{translations.status[language]}</TableHead>
                  <TableHead className="text-right">{translations.actions[language]}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.school}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(invoice.status)}>
                        {translations[invoice.status as keyof typeof translations]?.[language] || invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-4 w-4" />
                        {translations.view[language]}
                      </Button>
                      {invoice.status === "pending" ? (
                        <Button size="sm" className="gap-1">
                          <Send className="h-4 w-4" />
                          {translations.send[language]}
                        </Button>
                      ) : invoice.status === "overdue" ? (
                        <Button size="sm" variant="secondary" className="gap-1">
                          <Clock className="h-4 w-4" />
                          {translations.remind[language]}
                        </Button>
                      ) : null}
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
