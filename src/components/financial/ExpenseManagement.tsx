
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
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DocumentUploadDialog } from "@/components/compliance/DocumentUploadDialog";
import {
  Download,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  ChevronsUpDown,
  PlusCircle,
  ImagePlus,
  Receipt,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpenseManagementProps {
  language: "en" | "vi";
}

export function ExpenseManagement({ language }: ExpenseManagementProps) {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const { toast } = useToast();

  const translations = {
    title: {
      en: "Expense Management",
      vi: "Quản Lý Chi Phí"
    },
    subtitle: {
      en: "Track and approve teacher expenses",
      vi: "Theo dõi và phê duyệt chi phí giáo viên"
    },
    newExpense: {
      en: "New Expense",
      vi: "Chi Phí Mới"
    },
    downloadReport: {
      en: "Download Report",
      vi: "Tải Báo Cáo"
    },
    search: {
      en: "Search expenses...",
      vi: "Tìm kiếm chi phí..."
    },
    all: {
      en: "All",
      vi: "Tất Cả"
    },
    pending: {
      en: "Pending Approval",
      vi: "Chờ Phê Duyệt"
    },
    approved: {
      en: "Approved",
      vi: "Đã Phê Duyệt"
    },
    rejected: {
      en: "Rejected",
      vi: "Đã Từ Chối"
    },
    paid: {
      en: "Paid",
      vi: "Đã Thanh Toán"
    },
    expenseId: {
      en: "Expense ID",
      vi: "ID Chi Phí"
    },
    teacher: {
      en: "Teacher",
      vi: "Giáo Viên"
    },
    category: {
      en: "Category",
      vi: "Danh Mục"
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
    approve: {
      en: "Approve",
      vi: "Phê Duyệt"
    },
    reject: {
      en: "Reject",
      vi: "Từ Chối"
    },
    travel: {
      en: "Travel",
      vi: "Di Chuyển"
    },
    materials: {
      en: "Materials",
      vi: "Tài Liệu"
    },
    equipment: {
      en: "Equipment",
      vi: "Thiết Bị"
    },
    addExpense: {
      en: "Add Expense",
      vi: "Thêm Chi Phí"
    },
    expenseDetails: {
      en: "Expense Details",
      vi: "Chi Tiết Chi Phí"
    },
    expenseType: {
      en: "Expense Type",
      vi: "Loại Chi Phí"
    },
    description: {
      en: "Description",
      vi: "Mô Tả"
    },
    uploadReceipt: {
      en: "Upload Receipt",
      vi: "Tải Lên Hóa Đơn"
    },
    cancel: {
      en: "Cancel",
      vi: "Hủy"
    },
    submit: {
      en: "Submit",
      vi: "Gửi"
    }
  };

  // Sample data for demonstration
  const expenses = [
    { id: "EXP-001", teacher: "John Smith", category: "Travel", amount: 120, date: "2025-04-08", status: "pending" },
    { id: "EXP-002", teacher: "Mary Johnson", category: "Materials", amount: 85, date: "2025-04-06", status: "approved" },
    { id: "EXP-003", teacher: "Nguyen Van A", category: "Equipment", amount: 320, date: "2025-04-02", status: "rejected" },
    { id: "EXP-004", teacher: "Tran Thi B", category: "Travel", amount: 150, date: "2025-03-28", status: "approved" },
    { id: "EXP-005", teacher: "David Williams", category: "Materials", amount: 95, date: "2025-03-25", status: "pending" },
    { id: "EXP-006", teacher: "Le Van C", category: "Equipment", amount: 280, date: "2025-03-22", status: "paid" }
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
      case 'approved':
      case 'paid':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleExpenseSubmit = () => {
    setShowExpenseForm(false);
    toast({
      title: language === "en" ? "Expense Submitted" : "Đã Gửi Chi Phí",
      description: language === "en" 
        ? "Your expense has been submitted for approval" 
        : "Chi phí của bạn đã được gửi để phê duyệt",
    });
  };

  const handleApproveExpense = (id: string) => {
    toast({
      title: language === "en" ? "Expense Approved" : "Chi Phí Đã Được Phê Duyệt",
      description: language === "en" 
        ? `Expense ${id} has been approved` 
        : `Chi phí ${id} đã được phê duyệt`,
    });
  };

  const handleRejectExpense = (id: string) => {
    toast({
      title: language === "en" ? "Expense Rejected" : "Chi Phí Bị Từ Chối",
      description: language === "en" 
        ? `Expense ${id} has been rejected` 
        : `Chi phí ${id} đã bị từ chối`,
    });
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
              <Dialog open={showExpenseForm} onOpenChange={setShowExpenseForm}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    {translations.newExpense[language]}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{translations.addExpense[language]}</DialogTitle>
                    <DialogDescription>
                      {translations.expenseDetails[language]}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="amount" className="text-right">
                        {translations.amount[language]}
                      </label>
                      <div className="col-span-3">
                        <Input
                          id="amount"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="category" className="text-right">
                        {translations.category[language]}
                      </label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder={translations.expenseType[language]} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="travel">{translations.travel[language]}</SelectItem>
                          <SelectItem value="materials">{translations.materials[language]}</SelectItem>
                          <SelectItem value="equipment">{translations.equipment[language]}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="date" className="text-right">
                        {translations.date[language]}
                      </label>
                      <Input
                        id="date"
                        type="date"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <label htmlFor="description" className="text-right">
                        {translations.description[language]}
                      </label>
                      <Textarea
                        id="description"
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right">
                        {translations.uploadReceipt[language]}
                      </label>
                      <div className="col-span-3">
                        <Button variant="outline" className="w-full gap-2">
                          <Receipt className="h-4 w-4" />
                          {translations.uploadReceipt[language]}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowExpenseForm(false)}>
                      {translations.cancel[language]}
                    </Button>
                    <Button onClick={handleExpenseSubmit}>
                      {translations.submit[language]}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
              <TabsTrigger value="approved">{translations.approved[language]}</TabsTrigger>
              <TabsTrigger value="rejected">{translations.rejected[language]}</TabsTrigger>
              <TabsTrigger value="paid">{translations.paid[language]}</TabsTrigger>
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
                  <TableHead className="w-[100px]">
                    {translations.expenseId[language]}
                  </TableHead>
                  <TableHead>
                    {translations.teacher[language]}
                  </TableHead>
                  <TableHead>{translations.category[language]}</TableHead>
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
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.teacher}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{formatCurrency(expense.amount)}</TableCell>
                    <TableCell>{formatDate(expense.date)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(expense.status)}>
                        {translations[expense.status as keyof typeof translations]?.[language] || expense.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-4 w-4" />
                        {translations.view[language]}
                      </Button>
                      {expense.status === "pending" && (
                        <>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="gap-1"
                            onClick={() => handleApproveExpense(expense.id)}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            {translations.approve[language]}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectExpense(expense.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            {translations.reject[language]}
                          </Button>
                        </>
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
