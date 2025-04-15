
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Users, ArrowRightLeft } from "lucide-react";
import { TeacherOnboardingForm } from "@/components/TeacherOnboardingForm";
import { SchedulingTool } from "@/components/SchedulingTool";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Download, FileText, Search } from "lucide-react";
import { TeacherSchoolMatching } from "@/components/matching/TeacherSchoolMatching";
import { supabase } from "@/integrations/supabase/client";

interface Teacher {
  id: string;
  name: string;
  location?: string;
  specialty?: string;
  status?: string;
}

const Workforce = () => {
  const [activeTab, setActiveTab] = useState("teachers");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch teachers from Supabase
  useEffect(() => {
    async function fetchTeachers() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('teachers')
          .select('*');
          
        if (error) {
          console.error("Error fetching teachers:", error);
        } else {
          setTeachers(data || []);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTeachers();
  }, []);

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (teacher.location && teacher.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (teacher.specialty && teacher.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Refresh teachers after adding a new one
  const refreshTeachers = async () => {
    const { data } = await supabase.from('teachers').select('*');
    if (data) {
      setTeachers(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workforce Management</h1>
        <Button onClick={() => setActiveTab("onboarding")}>
          <Plus className="mr-2 h-4 w-4" /> New Teacher
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 md:w-fit">
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="matching">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Matching
          </TabsTrigger>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                <CardDescription>{filteredTeachers.length} teachers total</CardDescription>
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
                {isLoading ? (
                  <div className="px-6 py-8 text-center">Loading teachers...</div>
                ) : filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="px-6 py-3 grid grid-cols-6 text-sm items-center">
                      <div>{teacher.name}</div>
                      <div>T-{teacher.id.substring(0, 5)}</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {teacher.status || "Active"}
                        </span>
                      </div>
                      <div>{teacher.location || "Not specified"}</div>
                      <div>{teacher.specialty || "General English"}</div>
                      <div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-muted-foreground">
                    No teachers found matching your search criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="matching">
          <TeacherSchoolMatching />
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
