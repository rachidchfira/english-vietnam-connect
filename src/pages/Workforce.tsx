import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { TeacherOnboardingForm } from "@/components/TeacherOnboardingForm";
import { SchedulingTool } from "@/components/SchedulingTool";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Download, FileText, Search } from "lucide-react";

const Workforce = () => {
  const [activeTab, setActiveTab] = useState("teachers");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workforce Management</h1>
        <Button onClick={() => setActiveTab("onboarding")}>
          <Plus className="mr-2 h-4 w-4" /> New Teacher
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-fit">
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
        
        <TabsContent value="scheduling">
          <SchedulingTool />
        </TabsContent>
        
        <TabsContent value="onboarding">
          <TeacherOnboardingForm />
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workforce;
