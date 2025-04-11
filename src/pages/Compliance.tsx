
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DocumentUploadDialog } from "@/components/compliance/DocumentUploadDialog";
import { VisaTracking } from "@/components/compliance/VisaTracking";
import { DocumentStorage } from "@/components/compliance/DocumentStorage";
import { ComplianceCalendar } from "@/components/compliance/ComplianceCalendar";
import { ComplianceDashboard } from "@/components/ComplianceDashboard";

const Compliance = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Compliance</h1>
        <Button onClick={() => setShowUploadForm(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload Documents
        </Button>
      </div>

      {showUploadForm && (
        <DocumentUploadDialog onComplete={() => setShowUploadForm(false)} />
      )}

      <Tabs defaultValue="visa">
        <TabsList>
          <TabsTrigger value="visa">Visa Tracking</TabsTrigger>
          <TabsTrigger value="documents">Document Storage</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Calendar</TabsTrigger>
          <TabsTrigger value="dashboard">HR Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visa" className="space-y-4">
          <VisaTracking />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <DocumentStorage />
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <ComplianceCalendar />
        </TabsContent>
        
        <TabsContent value="dashboard">
          <ComplianceDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Compliance;
