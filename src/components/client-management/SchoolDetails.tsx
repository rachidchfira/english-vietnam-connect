
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { SupportChatbot } from "./SupportChatbot";
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  FileText,
  Download as DownloadIcon,
  Plus as PlusIcon
} from "lucide-react";

interface SchoolDetailsProps {
  schoolId: string;
}

export function SchoolDetails({ schoolId }: SchoolDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data - in a real app, this would come from Supabase
  const schoolData = {
    id: schoolId,
    name: "International English Academy",
    address: "123 Nguyen Hue Street, District 1, HCMC",
    phone: "+84 28 1234 5678",
    email: "contact@iea.edu.vn",
    website: "www.iea.edu.vn",
    contactPerson: "Nguyen Van A",
    contactRole: "HR Director",
    contractStart: "2024-01-15",
    contractEnd: "2025-01-14",
    status: "active",
    studentCount: 450,
    teacherCount: 8,
    requiredTeachers: 3,
    classesTaught: 32,
    notes: "Premium client, interested in expanding to northern provinces.",
    bilingual: true,
    documents: [
      {
        name: "Contract 2024",
        date: "2024-01-15",
        type: "contract"
      },
      {
        name: "Teacher Requirements",
        date: "2024-02-05",
        type: "requirements"
      },
      {
        name: "Payment Schedule",
        date: "2024-01-20",
        type: "financial"
      }
    ],
    recentActivity: [
      {
        type: "Teacher Request",
        description: "Requested 2 new teachers",
        date: "2024-04-05"
      },
      {
        type: "Message",
        description: "Inquired about summer program",
        date: "2024-04-02"
      },
      {
        type: "Contract",
        description: "Added addendum for additional classes",
        date: "2024-03-25"
      }
    ]
  };
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "secondary";
      case "pending": return "outline";
      case "expired": return "destructive";
      default: return "default";
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{schoolData.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{schoolData.address}</span>
          </div>
        </div>
        <Badge variant={getBadgeVariant(schoolData.status)}>
          {schoolData.status.charAt(0).toUpperCase() + schoolData.status.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{schoolData.contactPerson}</div>
                <div className="text-sm text-muted-foreground">{schoolData.contactRole}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>{schoolData.phone}</div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>{schoolData.email}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div className="font-medium">{formatDate(schoolData.contractStart)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">End Date</div>
              <div className="font-medium">{formatDate(schoolData.contractEnd)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Bilingual Support</div>
              <div className="font-medium">{schoolData.bilingual ? "Yes" : "No"}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Students</div>
              <div className="font-medium">{schoolData.studentCount}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Current Teachers</div>
              <div className="font-medium">{schoolData.teacherCount}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Required Teachers</div>
              <div className="font-medium">{schoolData.requiredTeachers}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Classes Taught</div>
              <div className="font-medium">{schoolData.classesTaught}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Overview</CardTitle>
              <CardDescription>
                Key information about the school and partnership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-muted-foreground">{schoolData.notes}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Teacher Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>TEFL/TESOL/CELTA certified teachers</li>
                    <li>Native English speakers preferred</li>
                    <li>Experience with young learners</li>
                    <li>Minimum 2 years of teaching experience</li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" /> Add Teacher
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>
                Current teaching schedule at this school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 font-medium">
                  <div>Day</div>
                  <div>Time</div>
                  <div>Class</div>
                  <div>Teacher</div>
                </div>
                <Separator />
                <div className="grid grid-cols-4 gap-4">
                  <div>Monday</div>
                  <div>9:00 - 11:00</div>
                  <div>Intermediate English</div>
                  <div>Sarah Johnson</div>
                </div>
                <Separator />
                <div className="grid grid-cols-4 gap-4">
                  <div>Tuesday</div>
                  <div>13:30 - 15:30</div>
                  <div>Business English</div>
                  <div>Michael Wong</div>
                </div>
                <Separator />
                <div className="grid grid-cols-4 gap-4">
                  <div>Wednesday</div>
                  <div>18:00 - 20:00</div>
                  <div>Beginner Conversation</div>
                  <div>Unassigned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documents</CardTitle>
                <Button variant="outline" size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" /> Add Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schoolData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(doc.date)} • {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schoolData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.type}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support">
          <SupportChatbot schoolId={schoolId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
