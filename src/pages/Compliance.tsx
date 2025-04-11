
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileCheck, AlertTriangle, Clock, Calendar, Upload } from "lucide-react";

const Compliance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Compliance</h1>
        <Button>Import Documents</Button>
      </div>

      <Tabs defaultValue="visa">
        <TabsList>
          <TabsTrigger value="visa">Visa Tracking</TabsTrigger>
          <TabsTrigger value="documents">Document Storage</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visa" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Visa Status Overview</CardTitle>
                  <CardDescription>Tracking all teacher work permits and visas</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" /> Calendar View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Valid Visas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87</div>
                      <div className="text-xs text-muted-foreground">70% of total workforce</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs text-muted-foreground">Within 60 days</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-red-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Immediate Action</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">13</div>
                      <div className="text-xs text-muted-foreground">Within 14 days or expired</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-lg">
                  <div className="px-4 py-3 border-b bg-muted/50 grid grid-cols-6 font-medium text-sm">
                    <div>Teacher Name</div>
                    <div>Visa Type</div>
                    <div>Issue Date</div>
                    <div>Expiry Date</div>
                    <div>Status</div>
                    <div>Action</div>
                  </div>
                  <div>
                    {[
                      {
                        name: "Sarah Johnson",
                        type: "Work Permit",
                        issueDate: "2024-08-15",
                        expiryDate: "2025-05-12",
                        status: "valid"
                      },
                      {
                        name: "Michael Chen",
                        type: "Business Visa",
                        issueDate: "2024-10-03",
                        expiryDate: "2025-04-20",
                        status: "expiring"
                      },
                      {
                        name: "Emma Wilson",
                        type: "Work Permit",
                        issueDate: "2024-02-10",
                        expiryDate: "2025-04-18",
                        status: "urgent"
                      },
                      {
                        name: "David Kim",
                        type: "Teacher Visa",
                        issueDate: "2024-09-22",
                        expiryDate: "2025-09-20",
                        status: "valid"
                      },
                    ].map((person, i) => (
                      <div key={i} className="px-4 py-3 border-b grid grid-cols-6 text-sm items-center">
                        <div>{person.name}</div>
                        <div>{person.type}</div>
                        <div>{person.issueDate}</div>
                        <div>{person.expiryDate}</div>
                        <div>
                          <Badge 
                            variant={person.status === "valid" ? "outline" : 
                                    person.status === "expiring" ? "secondary" : "destructive"}>
                            {person.status === "valid" ? "Valid" : 
                             person.status === "expiring" ? "Expiring Soon" : "Urgent Action"}
                          </Badge>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Secure Document Storage</CardTitle>
                  <CardDescription>Store and manage important teacher documentation</CardDescription>
                </div>
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Upload Files
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="px-4 py-3 border-b bg-muted/50 grid grid-cols-5 font-medium text-sm">
                  <div>Document Type</div>
                  <div>Related To</div>
                  <div>Date Added</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div>
                  {[
                    {
                      type: "Work Permit",
                      person: "Sarah Johnson",
                      date: "2024-08-15",
                      status: "verified"
                    },
                    {
                      type: "Academic Credentials",
                      person: "Michael Chen",
                      date: "2024-10-03",
                      status: "pending"
                    },
                    {
                      type: "Background Check",
                      person: "Emma Wilson",
                      date: "2024-02-10",
                      status: "verified"
                    },
                    {
                      type: "TESOL Certificate",
                      person: "David Kim",
                      date: "2024-09-22",
                      status: "verified"
                    },
                  ].map((doc, i) => (
                    <div key={i} className="px-4 py-3 border-b grid grid-cols-5 text-sm items-center">
                      <div>{doc.type}</div>
                      <div>{doc.person}</div>
                      <div>{doc.date}</div>
                      <div>
                        <Badge 
                          variant={doc.status === "verified" ? "outline" : "secondary"}>
                          {doc.status === "verified" ? "Verified" : "Pending Verification"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Calendar</CardTitle>
              <CardDescription>Important regulatory deadlines and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Upcoming Deadlines</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Next 30 days</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Compliance Alerts</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Requiring immediate attention</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileCheck className="h-4 w-4" />
                        <span>Compliance Score</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">92%</span>
                        <Progress value={92} className="h-2 flex-1" />
                      </div>
                      <div className="text-xs text-muted-foreground">Above industry average</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="h-[300px] border rounded flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive compliance calendar will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Compliance;
