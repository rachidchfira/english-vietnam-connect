
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, Phone, MapPin, Calendar, Users, FileText } from "lucide-react";

// Mock data - would come from Supabase in a real implementation
const mockSchoolDetails = {
  id: "1",
  name: "Hanoi International School",
  address: "15 Pham Hung Street, Cau Giay District, Hanoi",
  location: "Hanoi",
  contactPerson: "Nguyen Van A",
  position: "Principal",
  email: "principal@his.edu.vn",
  phone: "+84 123 456 789",
  website: "www.his.edu.vn",
  contractStart: "2023-07-01",
  contractEnd: "2025-06-30",
  totalStudents: 450,
  totalClasses: 24,
  teachersAssigned: 5,
  teachersNeeded: 2,
  status: "active",
  notes: "Premium international school with focus on English and STEM education. Interested in expanding their English program.",
  requirements: [
    { id: "req1", position: "IELTS Teacher", hours: 10, level: "Advanced", status: "open" },
    { id: "req2", position: "Conversational English", hours: 15, level: "Intermediate", status: "filled" }
  ],
  billingInfo: {
    paymentTerms: "Net 30",
    currency: "USD",
    hourlyRate: 25,
    lastInvoice: "2024-03-15",
    outstandingAmount: 0
  },
  studentProgress: [
    { level: "Beginner", count: 120, improvementRate: 68 },
    { level: "Intermediate", count: 230, improvementRate: 75 },
    { level: "Advanced", count: 100, improvementRate: 82 }
  ]
};

interface SchoolDetailsProps {
  schoolId: string | null;
}

export function SchoolDetails({ schoolId }: SchoolDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, we'd fetch the school details using the schoolId
  const school = mockSchoolDetails;
  
  if (!schoolId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Please select a school to view details</p>
      </div>
    );
  }

  const contractStatus = () => {
    const now = new Date();
    const end = new Date(school.contractEnd);
    const monthsLeft = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
    
    if (monthsLeft <= 1) return <Badge variant="destructive">Expiring Soon</Badge>;
    if (monthsLeft <= 3) return <Badge variant="warning">Renewal Soon</Badge>;
    return <Badge variant="outline">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <div className="flex items-center">
                <CardTitle className="text-2xl">{school.name}</CardTitle>
                {contractStatus()}
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" /> {school.address}
              </div>
            </div>
            <Button className="mt-4 md:mt-0" variant="outline">
              <Edit className="h-4 w-4 mr-2" /> Edit School
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="progress">Student Progress</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div>
                      <p className="font-medium">{school.contactPerson}</p>
                      <p className="text-sm text-muted-foreground">{school.position}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <p>{school.email}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <p>{school.phone}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Contract Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{new Date(school.contractStart).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{new Date(school.contractEnd).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="capitalize">{school.status}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Teacher Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teachers Assigned:</span>
                      <span>{school.teachersAssigned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teachers Needed:</span>
                      <span>{school.teachersNeeded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Classes:</span>
                      <span>{school.totalClasses}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">Notes</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p>{school.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle className="text-md">Teacher Requirements</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Requirement
                  </Button>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="border-b px-6 py-3 grid grid-cols-4 font-medium text-sm">
                    <div>Position</div>
                    <div>Hours/Week</div>
                    <div>Level</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y">
                    {school.requirements.map((req) => (
                      <div key={req.id} className="px-6 py-3 grid grid-cols-4 text-sm">
                        <div>{req.position}</div>
                        <div>{req.hours}</div>
                        <div>{req.level}</div>
                        <div>
                          <Badge 
                            className={req.status === "open" ? "bg-blue-500" : "bg-green-500"}
                          >
                            {req.status === "open" ? "Open" : "Filled"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">Student Progress</CardTitle>
                    <div>
                      <span className="text-sm text-muted-foreground">Total Students: {school.totalStudents}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {school.studentProgress.map((level, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{level.level}</span>
                          <span className="text-sm">{level.count} students</span>
                        </div>
                        <div className="h-2 bg-secondary rounded overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${level.improvementRate}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Improvement Rate</span>
                          <span>{level.improvementRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Billing Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <dt className="text-sm font-medium">Payment Terms</dt>
                      <dd>{school.billingInfo.paymentTerms}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm font-medium">Currency</dt>
                      <dd>{school.billingInfo.currency}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm font-medium">Hourly Rate</dt>
                      <dd>${school.billingInfo.hourlyRate}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm font-medium">Last Invoice</dt>
                      <dd>{new Date(school.billingInfo.lastInvoice).toLocaleDateString()}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm font-medium">Outstanding Amount</dt>
                      <dd>
                        ${school.billingInfo.outstandingAmount.toFixed(2)}
                        {school.billingInfo.outstandingAmount > 0 && (
                          <Badge variant="destructive" className="ml-2">Unpaid</Badge>
                        )}
                      </dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6 flex space-x-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> View Invoices
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Download Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
