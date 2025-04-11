
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const DOCUMENT_STATUS = {
  valid: { label: "Valid", color: "outline" },
  expiring_soon: { label: "Expiring Soon", color: "secondary" },
  urgent: { label: "Urgent Action", color: "destructive" },
  expired: { label: "Expired", color: "destructive" },
  pending: { label: "Pending Review", color: "secondary" },
};

// Dummy data - will be replaced with Supabase data
const COMPLIANCE_DATA = [
  {
    id: "1",
    teacherName: "Sarah Johnson",
    docType: "Work Permit",
    docNumber: "WP12345678",
    issueDate: "2024-08-15",
    expiryDate: "2025-05-12",
    status: "valid",
    lastUpdated: "2024-08-15",
  },
  {
    id: "2",
    teacherName: "Michael Chen",
    docType: "Business Visa",
    docNumber: "BV87654321",
    issueDate: "2024-10-03",
    expiryDate: "2025-01-20",
    status: "expiring_soon",
    lastUpdated: "2024-10-03",
  },
  {
    id: "3",
    teacherName: "Emma Wilson",
    docType: "Work Permit",
    docNumber: "WP98765432",
    issueDate: "2024-02-10",
    expiryDate: "2024-05-10",
    status: "expired",
    lastUpdated: "2024-02-10",
  },
  {
    id: "4",
    teacherName: "David Kim",
    docType: "Teacher Visa",
    docNumber: "TV45678912",
    issueDate: "2024-09-22",
    expiryDate: "2025-09-20",
    status: "valid",
    lastUpdated: "2024-09-22",
  },
  {
    id: "5",
    teacherName: "Lisa Wang",
    docType: "Residence Card",
    docNumber: "RC87654321",
    issueDate: "2024-11-05",
    expiryDate: "2024-12-15",
    status: "urgent",
    lastUpdated: "2024-11-05",
  },
];

export function ComplianceDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [docTypeFilter, setDocTypeFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  // Filter data based on search query and filters
  const filteredData = COMPLIANCE_DATA.filter(doc => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      doc.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    // Document type filter
    const matchesDocType = docTypeFilter === "all" || doc.docType === docTypeFilter;
    
    return matchesSearch && matchesStatus && matchesDocType;
  });

  const toggleExpandRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>HR Compliance Dashboard</CardTitle>
            <CardDescription>
              Monitor and manage teacher compliance documentation
            </CardDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Button>Send Reminders</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or document..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="valid">Valid</SelectItem>
                  <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                  <SelectItem value="urgent">Urgent Action</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={docTypeFilter} onValueChange={setDocTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="Work Permit">Work Permit</SelectItem>
                  <SelectItem value="Business Visa">Business Visa</SelectItem>
                  <SelectItem value="Teacher Visa">Teacher Visa</SelectItem>
                  <SelectItem value="Residence Card">Residence Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher Name</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Document Number</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((doc) => (
                      <Collapsible
                        key={doc.id}
                        open={expandedRow === doc.id}
                      >
                        <TableRow className="cursor-pointer" onClick={() => toggleExpandRow(doc.id)}>
                          <TableCell>{doc.teacherName}</TableCell>
                          <TableCell>{doc.docType}</TableCell>
                          <TableCell>{doc.docNumber}</TableCell>
                          <TableCell>{doc.expiryDate}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={DOCUMENT_STATUS[doc.status as keyof typeof DOCUMENT_STATUS].color as any}>
                              {DOCUMENT_STATUS[doc.status as keyof typeof DOCUMENT_STATUS].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Document Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Document</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Mark as Invalid
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        <CollapsibleContent asChild>
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={6} className="p-4">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <h4 className="text-sm font-medium">Issue Date</h4>
                                    <p className="text-sm text-muted-foreground">{doc.issueDate}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Last Updated</h4>
                                    <p className="text-sm text-muted-foreground">{doc.lastUpdated}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Days Remaining</h4>
                                    <p className={cn(
                                      "text-sm",
                                      doc.status === "expired" ? "text-destructive" : "text-muted-foreground"
                                    )}>
                                      {doc.status === "expired" 
                                        ? "Expired" 
                                        : `${Math.ceil((new Date(doc.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Document ID</h4>
                                    <p className="text-sm text-muted-foreground">{doc.id}</p>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">Send Reminder</Button>
                                  <Button size="sm">View Full Details</Button>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No documents matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="expiring" className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher Name</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Remaining</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPLIANCE_DATA.filter(doc => 
                    doc.status === "expiring_soon" || doc.status === "urgent"
                  ).map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.teacherName}</TableCell>
                      <TableCell>{doc.docType}</TableCell>
                      <TableCell>{doc.expiryDate}</TableCell>
                      <TableCell>{Math.ceil((new Date(doc.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Send Reminder</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="expired" className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher Name</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Expired On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPLIANCE_DATA.filter(doc => doc.status === "expired").map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.teacherName}</TableCell>
                      <TableCell>{doc.docType}</TableCell>
                      <TableCell>{doc.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Expired</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">Request Renewal</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
