import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRightLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - would come from Supabase in a real implementation
const mockTeachers = [
  { 
    id: "t1", 
    name: "Sarah Johnson", 
    specialties: ["IELTS", "Business English"], 
    experience: 5,
    availability: "Full-time",
    location: "Ho Chi Minh City",
    visa: "Work Permit",
    matchScore: 95
  },
  { 
    id: "t2", 
    name: "Michael Chen", 
    specialties: ["General English", "Young Learners"], 
    experience: 3,
    availability: "Part-time",
    location: "Hanoi",
    visa: "Work Permit",
    matchScore: 87
  },
  { 
    id: "t3", 
    name: "Lisa Nguyen", 
    specialties: ["Business English", "TOEFL"], 
    experience: 7,
    availability: "Full-time",
    location: "Da Nang",
    visa: "In Process",
    matchScore: 82
  },
  { 
    id: "t4", 
    name: "John Williams", 
    specialties: ["Conversation", "Pronunciation"], 
    experience: 2,
    availability: "Part-time",
    location: "Ho Chi Minh City",
    visa: "Tourist",
    matchScore: 78
  },
];

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
    urgency: "high",
    location: "Hanoi"
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
    status: "pending",
    notes: "Corporate clients, need business vocabulary focus.",
    urgency: "medium",
    location: "Hanoi"
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
    status: "pending",
    notes: "Young learners (age 10-14), focus on speaking and listening.",
    urgency: "low",
    location: "Ho Chi Minh City"
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
    urgency: "medium",
    location: "Da Nang"
  }
];

export function TeacherSchoolMatching() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  const selectedRequestData = mockRequests.find(r => r.id === selectedRequest);
  
  const filteredTeachers = mockTeachers
    .filter(teacher => {
      // Filter by search query
      if (searchQuery && !teacher.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by specialty
      if (specialtyFilter !== "all" && !teacher.specialties.includes(specialtyFilter)) {
        return false;
      }
      
      // Filter by location
      if (locationFilter !== "all" && teacher.location !== locationFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by match score if a request is selected
      if (selectedRequest) {
        return b.matchScore - a.matchScore;
      }
      
      // Otherwise sort by name
      return a.name.localeCompare(b.name);
    });

  const getVisaStatusIndicator = (status: string) => {
    switch (status) {
      case "Work Permit":
        return <Badge className="bg-green-500">Work Permit</Badge>;
      case "In Process":
        return <Badge className="bg-amber-500">In Process</Badge>;
      case "Tourist":
        return <Badge className="bg-red-500">Tourist</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getUrgencyIndicator = (urgency: string) => {
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

  const getMatchScoreIndicator = (score: number) => {
    if (score >= 90) {
      return <Badge className="bg-green-500">{score}%</Badge>;
    } else if (score >= 75) {
      return <Badge className="bg-amber-500">{score}%</Badge>;
    } else {
      return <Badge className="bg-gray-500">{score}%</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* School Requests Panel */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>School Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockRequests.map((request) => (
                <div 
                  key={request.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-muted transition-colors ${
                    selectedRequest === request.id ? "bg-muted border-l-4 border-primary" : ""
                  }`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{request.requestType}</span>
                    {getUrgencyIndicator(request.urgency)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{request.schoolName}</div>
                  <div className="flex items-center mt-1 text-xs">
                    <span className="text-muted-foreground">
                      {request.location} • {request.hours} hrs/week • Level: {request.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Matching Panel */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Teacher Matching</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRequest ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-medium flex items-center">
                    <ArrowRightLeft className="mr-2 h-4 w-4 text-primary" />
                    Matching for: {selectedRequestData?.requestType} at {selectedRequestData?.schoolName}
                  </h3>
                  <p className="text-sm mt-1">{selectedRequestData?.notes}</p>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search teachers..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="IELTS">IELTS</SelectItem>
                      <SelectItem value="Business English">Business English</SelectItem>
                      <SelectItem value="General English">General English</SelectItem>
                      <SelectItem value="Young Learners">Young Learners</SelectItem>
                      <SelectItem value="TOEFL">TOEFL</SelectItem>
                      <SelectItem value="Conversation">Conversation</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Ho Chi Minh City">Ho Chi Minh City</SelectItem>
                      <SelectItem value="Hanoi">Hanoi</SelectItem>
                      <SelectItem value="Da Nang">Da Nang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Visa Status</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.specialties.join(", ")}</TableCell>
                        <TableCell>{teacher.location}</TableCell>
                        <TableCell>{teacher.experience} years</TableCell>
                        <TableCell>{getVisaStatusIndicator(teacher.visa)}</TableCell>
                        <TableCell>{getMatchScoreIndicator(teacher.matchScore)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" className="h-8">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Assign
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTeachers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          <AlertCircle className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No matching teachers found</p>
                          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <ArrowRightLeft className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select a Request to Start Matching</h3>
                <p className="text-sm text-muted-foreground text-center mt-2 max-w-md">
                  Choose a teacher request from the left panel to start the matching process.
                  The system will analyze teacher profiles and suggest the best matches.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
