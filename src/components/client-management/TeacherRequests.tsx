
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Plus, Check, X, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data - would come from Supabase in a real implementation
const mockRequests = [
  {
    id: "req1",
    schoolId: "1",
    schoolName: "Hanoi International School",
    requestType: "IELTS Preparation",
    hours: 10,
    students: 15,
    level: "Advanced",
    startDate: "2024-05-01",
    status: "pending",
    notes: "Need a teacher with minimum 3 years experience in IELTS preparation.",
    created: "2024-04-02",
    urgency: "high"
  },
  {
    id: "req2",
    schoolId: "1",
    schoolName: "Hanoi International School",
    requestType: "Business English",
    hours: 8,
    students: 10,
    level: "Intermediate",
    startDate: "2024-05-15",
    status: "approved",
    notes: "Corporate clients, need business vocabulary focus.",
    created: "2024-04-01",
    urgency: "medium"
  },
  {
    id: "req3",
    schoolId: "2",
    schoolName: "HCMC Language Academy",
    requestType: "General English",
    hours: 15,
    students: 25,
    level: "Beginner",
    startDate: "2024-06-01",
    status: "assigned",
    notes: "Young learners (age 10-14), focus on speaking and listening.",
    created: "2024-03-28",
    urgency: "low",
    assignedTeacher: "Michael Chen"
  },
  {
    id: "req4",
    schoolId: "3",
    schoolName: "Da Nang English Center",
    requestType: "Conversational English",
    hours: 12,
    students: 18,
    level: "Intermediate",
    startDate: "2024-05-10",
    status: "pending",
    notes: "Adult learners, focus on practical conversation skills.",
    created: "2024-04-05",
    urgency: "medium"
  }
];

// Mock teacher data
const mockTeachers = [
  { id: "t1", name: "Sarah Johnson", specialties: ["IELTS", "Business English"], availability: "Full-time" },
  { id: "t2", name: "Michael Chen", specialties: ["General English", "Young Learners"], availability: "Part-time" },
  { id: "t3", name: "Lisa Nguyen", specialties: ["Business English", "TOEFL"], availability: "Full-time" },
  { id: "t4", name: "John Williams", specialties: ["Conversation", "Pronunciation"], availability: "Part-time" },
];

interface TeacherRequestsProps {
  schoolId: string | null;
}

export function TeacherRequests({ schoolId }: TeacherRequestsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isAddRequestDialogOpen, setIsAddRequestDialogOpen] = useState(false);
  
  const filteredRequests = mockRequests
    .filter(req => {
      // Filter by school if a schoolId is provided
      if (schoolId && req.schoolId !== schoolId) return false;
      
      // Filter by status
      if (statusFilter !== "all" && req.status !== statusFilter) return false;
      
      // Filter by search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          req.schoolName.toLowerCase().includes(searchLower) ||
          req.requestType.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by urgency and then by date
      const urgencyOrder = { high: 0, medium: 1, low: 2 };
      const aUrgency = urgencyOrder[a.urgency as keyof typeof urgencyOrder];
      const bUrgency = urgencyOrder[b.urgency as keyof typeof urgencyOrder];
      
      if (aUrgency !== bUrgency) return aUrgency - bUrgency;
      
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      case "approved":
        return <Badge className="bg-blue-500">Approved</Badge>;
      case "assigned":
        return <Badge className="bg-green-500">Assigned</Badge>;
      case "cancelled":
        return <Badge className="bg-gray-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const handleAssign = (requestId: string) => {
    setSelectedRequest(requestId);
    setIsAssignDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> More Filters
        </Button>
        <Button onClick={() => setIsAddRequestDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>
      
      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Teacher Requests</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-b px-6 py-3 grid grid-cols-1 md:grid-cols-7 font-medium text-sm">
            <div className="md:col-span-2">Request Details</div>
            <div className="hidden md:block">Hours</div>
            <div className="hidden md:block">Level</div>
            <div className="hidden md:block">Start Date</div>
            <div className="hidden md:block">Status</div>
            <div className="hidden md:block">Actions</div>
          </div>
          <div className="divide-y">
            {filteredRequests.length > 0 ? filteredRequests.map((request) => (
              <div 
                key={request.id} 
                className="px-6 py-4 grid grid-cols-1 md:grid-cols-7 gap-y-2 md:gap-y-0 text-sm"
              >
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between md:justify-start">
                    <span className="font-medium">{request.requestType}</span>
                    {getUrgencyBadge(request.urgency)}
                  </div>
                  <div className="text-muted-foreground mt-1">{request.schoolName}</div>
                  {request.assignedTeacher && (
                    <div className="text-xs text-green-600 mt-1">
                      Assigned to: {request.assignedTeacher}
                    </div>
                  )}
                </div>
                <div className="flex md:block items-center">
                  <span className="md:hidden font-medium mr-2">Hours:</span>
                  {request.hours}/week for {request.students} students
                </div>
                <div className="flex md:block items-center">
                  <span className="md:hidden font-medium mr-2">Level:</span>
                  {request.level}
                </div>
                <div className="flex md:block items-center">
                  <span className="md:hidden font-medium mr-2">Start Date:</span>
                  {new Date(request.startDate).toLocaleDateString()}
                </div>
                <div className="flex md:block items-center">
                  <span className="md:hidden font-medium mr-2">Status:</span>
                  {getStatusBadge(request.status)}
                </div>
                <div className="flex items-center space-x-2">
                  {request.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleAssign(request.id)}>
                        <Check className="h-3.5 w-3.5 mr-1" /> Assign
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                  {request.status === "approved" && (
                    <Button size="sm" onClick={() => handleAssign(request.id)}>
                      <Check className="h-3.5 w-3.5 mr-1" /> Assign Teacher
                    </Button>
                  )}
                  {request.status === "assigned" && (
                    <Button size="sm" variant="outline">
                      <Clock className="h-3.5 w-3.5 mr-1" /> View Schedule
                    </Button>
                  )}
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-muted-foreground">
                No teacher requests match your current filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Assign Teacher Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Assign Teacher</DialogTitle>
            <DialogDescription>
              Select a teacher to assign to this request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="request-type">Request</Label>
              <div className="font-medium">
                {mockRequests.find(r => r.id === selectedRequest)?.requestType}
              </div>
              <div className="text-sm text-muted-foreground">
                {mockRequests.find(r => r.id === selectedRequest)?.schoolName}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Select Teacher</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map(teacher => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.specialties.join(", ")})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any notes about this assignment"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setIsAssignDialogOpen(false)}>
              Assign Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Request Dialog */}
      <Dialog open={isAddRequestDialogOpen} onOpenChange={setIsAddRequestDialogOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>New Teacher Request</DialogTitle>
            <DialogDescription>
              Create a new teacher request for a school.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Hanoi International School</SelectItem>
                  <SelectItem value="2">HCMC Language Academy</SelectItem>
                  <SelectItem value="3">Da Nang English Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="request-type">Request Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General English</SelectItem>
                    <SelectItem value="business">Business English</SelectItem>
                    <SelectItem value="ielts">IELTS Preparation</SelectItem>
                    <SelectItem value="conversation">Conversational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hours">Hours per Week</Label>
                <Input 
                  id="hours" 
                  type="number" 
                  min="1"
                  max="40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="students">Number of Students</Label>
                <Input 
                  id="students" 
                  type="number" 
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any specific requirements or notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setIsAddRequestDialogOpen(false)}>
              Create Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
