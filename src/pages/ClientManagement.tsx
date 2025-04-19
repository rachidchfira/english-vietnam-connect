
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SchoolList } from "@/components/client-management/SchoolList";
import { SchoolDetails } from "@/components/client-management/SchoolDetails";
import { MessageCenter } from "@/components/client-management/MessageCenter";
import { TeacherRequests } from "@/components/client-management/TeacherRequests";
import { useToast } from "@/hooks/use-toast";
import { SchoolFormDialog } from "@/components/client-management/SchoolFormDialog";

const ClientManagement = () => {
  const [activeTab, setActiveTab] = useState("schools");
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  const handleSchoolSelect = (id: string) => {
    setSelectedSchoolId(id);
    setActiveTab("details");
  };

  const handleAddSchool = () => {
    setIsDialogOpen(true);
  };

  const handleSchoolCreated = () => {
    setIsDialogOpen(false);
    // Increment refresh trigger to cause SchoolList to reload
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "School added",
      description: "The school has been successfully added to the system."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
        <Button onClick={handleAddSchool}>
          <Plus className="mr-2 h-4 w-4" /> New School
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="requests">Teacher Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schools" className="space-y-4">
          <SchoolList 
            onSchoolSelect={handleSchoolSelect} 
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>
        
        <TabsContent value="details">
          {selectedSchoolId ? (
            <SchoolDetails schoolId={selectedSchoolId} />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Please select a school to view details
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="messages">
          <MessageCenter schoolId={selectedSchoolId} />
        </TabsContent>
        
        <TabsContent value="requests">
          <TeacherRequests schoolId={selectedSchoolId} />
        </TabsContent>
      </Tabs>

      <SchoolFormDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSchoolCreated={handleSchoolCreated}
      />
    </div>
  );
};

export default ClientManagement;
