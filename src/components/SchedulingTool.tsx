
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Save, Calendar, FileCheck, AlertTriangle } from "lucide-react";

const timeSlots = {
  morning: [
    "7:15-8:00", 
    "8:00-8:45", 
    "9:15-10:00", 
    "10:00-10:45", 
    "10:45-11:30"
  ],
  afternoon: [
    "13:30-14:15", 
    "14:15-15:00", 
    "15:30-16:15", 
    "16:15-17:00"
  ]
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function SchedulingTool() {
  const [view, setView] = useState<"admin" | "teacher">("admin");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [materials, setMaterials] = useState("");
  
  // Example schedule data (to be replaced with actual data from Supabase)
  const [scheduleData, setScheduleData] = useState<Record<string, Record<string, string>>>({});
  
  // Temporary data for mock UI
  const mockTeachers = ["John Smith", "Sarah Johnson", "Michael Chen"];
  const mockSchools = ["Hanoi International School", "HCMC Language Center", "Da Nang English Academy"];
  
  // Helper to initialize schedule grid
  const initializeSchedule = () => {
    const initialData: Record<string, Record<string, string>> = {};
    
    [...timeSlots.morning, ...timeSlots.afternoon].forEach(slot => {
      initialData[slot] = {};
      days.forEach(day => {
        initialData[slot][day] = "";
      });
    });
    
    setScheduleData(initialData);
  };
  
  // Update a cell in the schedule
  const updateCell = (timeSlot: string, day: string, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [timeSlot]: {
        ...prev[timeSlot],
        [day]: value
      }
    }));
  };
  
  // Calculate total periods and teaching hours
  const calculateTotals = () => {
    // Count non-empty cells that aren't "BREAK TIME"
    let periodCount = 0;
    
    Object.values(scheduleData).forEach(row => {
      Object.values(row).forEach(cell => {
        if (cell && cell !== "BREAK TIME") {
          periodCount++;
        }
      });
    });
    
    // Each period is 45 minutes
    const teachingHours = Math.round((periodCount * 45 / 60) * 10) / 10;
    
    return { periodCount, teachingHours };
  };
  
  // Handle form submission
  const handleSaveSchedule = () => {
    // Will connect to Supabase later
    const { periodCount, teachingHours } = calculateTotals();
    console.log("Schedule saved:", {
      schedule: scheduleData,
      materials,
      totalPeriods: periodCount,
      teachingHours
    });
    alert("Schedule saved successfully!");
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={view} onValueChange={(value) => setView(value as "admin" | "teacher")}>
        <TabsList>
          <TabsTrigger value="admin">Admin View</TabsTrigger>
          <TabsTrigger value="teacher">Teacher View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="admin" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select School" />
                </SelectTrigger>
                <SelectContent>
                  {mockSchools.map(school => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                type="date"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                placeholder="Select Week"
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Schedule Assignment</CardTitle>
              <CardDescription>Assign classes by entering class codes (e.g., "8A1") or "BREAK TIME"</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Morning Schedule */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Morning</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.morning.map(slot => (
                        <TableRow key={slot}>
                          <TableCell className="font-medium">{slot}</TableCell>
                          {days.map(day => (
                            <TableCell key={`${slot}-${day}`}>
                              <Input 
                                className="h-9"
                                placeholder="Class code"
                                value={scheduleData[slot]?.[day] || ""}
                                onChange={(e) => updateCell(slot, day, e.target.value)}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Afternoon Schedule */}
              <div>
                <h3 className="font-medium text-lg mb-3">Afternoon</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.afternoon.map(slot => (
                        <TableRow key={slot}>
                          <TableCell className="font-medium">{slot}</TableCell>
                          {days.map(day => (
                            <TableCell key={`${slot}-${day}`}>
                              <Input 
                                className="h-9"
                                placeholder="Class code"
                                value={scheduleData[slot]?.[day] || ""}
                                onChange={(e) => updateCell(slot, day, e.target.value)}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Blocked Dates Warning */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Tet Holiday Block</h4>
                  <p className="text-sm text-muted-foreground">February 10-16, 2025 is blocked for Tet holidays</p>
                </div>
              </div>
              
              {/* Materials Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Materials</label>
                <Textarea 
                  placeholder="List required materials for this schedule..."
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                />
              </div>
              
              {/* Totals and Save Button */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div>
                  <div className="text-sm font-medium">Total periods: {calculateTotals().periodCount}</div>
                  <div className="text-sm font-medium">Teaching hours: {calculateTotals().teachingHours}</div>
                </div>
                <Button onClick={handleSaveSchedule}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teacher" className="space-y-6">
          <Card>
            <CardHeader className="bg-card border-b">
              <div className="text-center">
                <h2 className="text-xl font-bold">TEACHING SCHEDULE</h2>
                <p className="text-muted-foreground">School: Hanoi International School</p>
                <p className="text-muted-foreground">Address: 123 Example Street, Hanoi</p>
                <div className="mt-2 flex justify-center space-x-4">
                  <p>Duration: 45/2024</p>
                  <p>Week: {selectedWeek || "03/02/2025"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Morning Schedule Display */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Morning</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.morning.map(slot => (
                        <TableRow key={slot}>
                          <TableCell className="font-medium">{slot}</TableCell>
                          {days.map(day => (
                            <TableCell key={`${slot}-${day}`}>
                              {scheduleData[slot]?.[day] || 
                                (day === "Mon" && slot === "7:15-8:00" ? "8A1" : 
                                 day === "Tue" && slot === "8:00-8:45" ? "7C1" : 
                                 day === "Wed" && slot === "9:15-10:00" ? "BREAK TIME" : 
                                 day === "Thu" && slot === "10:00-10:45" ? "8A3" : 
                                 day === "Fri" && slot === "10:45-11:30" ? "9A6" : "")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Afternoon Schedule Display */}
              <div>
                <h3 className="font-medium text-lg mb-3">Afternoon</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.afternoon.map(slot => (
                        <TableRow key={slot}>
                          <TableCell className="font-medium">{slot}</TableCell>
                          {days.map(day => (
                            <TableCell key={`${slot}-${day}`}>
                              {scheduleData[slot]?.[day] || 
                                (day === "Mon" && slot === "13:30-14:15" ? "6B2" : 
                                 day === "Thu" && slot === "14:15-15:00" ? "7A4" : "")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mt-6 border-t pt-4">
                <div className="font-medium">Total of period per week: {calculateTotals().periodCount || 20}</div>
                <div className="font-medium">Teaching hours per week: {calculateTotals().teachingHours || 15}</div>
              </div>
              
              {/* Materials Display */}
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium">Materials:</h4>
                <p className="text-sm">{materials || "Textbooks for grades 6-9, worksheets A4-A8, flashcards set B"}</p>
              </div>
              
              {/* Download Button */}
              <div className="mt-6 flex justify-end">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
