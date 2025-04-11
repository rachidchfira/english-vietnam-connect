
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Download, FileText, Plus, Search, Users } from "lucide-react";

const Workforce = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workforce Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Teacher
        </Button>
      </div>

      <Tabs defaultValue="teachers">
        <TabsList>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teachers" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
          
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Teacher Directory</CardTitle>
                <CardDescription>124 teachers total</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-b px-6 py-3 grid grid-cols-6 font-medium text-sm">
                <div>Name</div>
                <div>ID</div>
                <div>Status</div>
                <div>Location</div>
                <div>Specialty</div>
                <div>Actions</div>
              </div>
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="px-6 py-3 grid grid-cols-6 text-sm items-center">
                    <div>John Smith</div>
                    <div>T-{1000 + i}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Active
                      </span>
                    </div>
                    <div>Ho Chi Minh City</div>
                    <div>IELTS Preparation</div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduling" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Select date range..."
                className="pl-8"
              />
            </div>
            <Button>Schedule Class</Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Drag and drop to assign teachers to classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded flex items-center justify-center">
                <p className="text-muted-foreground">Interactive scheduling calendar will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Forms</CardTitle>
              <CardDescription>Process new teachers efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Personal Information Form</div>
                    <div className="text-sm text-muted-foreground">Basic details and contact information</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Qualification Verification</div>
                    <div className="text-sm text-muted-foreground">Educational background and certifications</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Employment Contract</div>
                    <div className="text-sm text-muted-foreground">Terms and conditions of employment</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <FileText className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Banking & Tax Information</div>
                    <div className="text-sm text-muted-foreground">Payment details and tax documentation</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Performance Dashboard</CardTitle>
              <CardDescription>Real-time metrics on teacher effectiveness and satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded flex items-center justify-center">
                <p className="text-muted-foreground">Performance charts and metrics will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workforce;
