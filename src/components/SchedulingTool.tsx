
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Save, Calendar, FileCheck, AlertTriangle, Clock, User, School } from "lucide-react";

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
      <Tabs 
        defaultValue={view} 
        onValueChange={(value) => setView(value as "admin" | "teacher")}
        className="w-full"
      >
        <TabsList className="w-full mb-6 bg-accent">
          <TabsTrigger value="admin" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
            Admin View
          </TabsTrigger>
          <TabsTrigger value="teacher" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
            Teacher View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="admin" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary flex-shrink-0" />
              <Select>
                <SelectTrigger className="border-primary">
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <School className="h-5 w-5 text-primary flex-shrink-0" />
              <Select>
                <SelectTrigger className="border-primary">
                  <SelectValue placeholder="Select School" />
                </SelectTrigger>
                <SelectContent>
                  {mockSchools.map(school => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <Input
                type="date"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                placeholder="Select Week"
                className="border-primary"
              />
            </div>
          </div>
          
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-schedule-light-green border-b">
              <CardTitle className="text-schedule-header">Schedule Assignment</CardTitle>
              <CardDescription>Assign classes by entering class codes (e.g., "8A1") or "BREAK TIME"</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {/* Morning Schedule */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 flex items-center text-schedule-header">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Morning
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24 bg-schedule-green text-white">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day} className="bg-schedule-green text-white">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.morning.map((slot, idx) => (
                        <TableRow key={slot} className={idx % 2 === 0 ? "bg-white" : "bg-schedule-light-green/30"}>
                          <TableCell className="font-medium bg-schedule-light-green">{slot}</TableCell>
                          {days.map(day => (
                            <TableCell key={`${slot}-${day}`} className="p-1">
                              <Input 
                                className="h-9 focus:border-primary bg-white/80"
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
                <h3 className="font-bold text-lg mb-3 flex items-center text-schedule-header">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Afternoon
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24 bg-schedule-green text-white">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day} className="bg-schedule-green text-white">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.afternoon.map((slot, idx) => (
                        <TableRow key={slot} className={idx % 2 === 0 ? "bg-white" : "bg-schedule-light-green/30"}>
                          <TableCell className="font-medium bg-schedule-light-green">{slot}</TableCell>
                          {days.map(day => (
                            <TableCell key={`${slot}-${day}`} className="p-1">
                              <Input 
                                className="h-9 focus:border-primary bg-white/80"
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
              <div className="mt-6 p-4 bg-schedule-yellow/20 border border-schedule-yellow rounded-md flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-schedule-red flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Tet Holiday Block</h4>
                  <p className="text-sm text-muted-foreground">February 10-16, 2025 is blocked for Tet holidays</p>
                </div>
              </div>
              
              {/* Materials Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2 text-schedule-header">Materials</label>
                <Textarea 
                  placeholder="List required materials for this schedule..."
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="border-primary/50 focus:border-primary"
                />
              </div>
              
              {/* Totals and Save Button */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-3 bg-schedule-light-green rounded-lg">
                <div>
                  <div className="text-sm font-medium flex items-center">
                    <FileCheck className="mr-2 h-4 w-4 text-primary" />
                    Total periods: {calculateTotals().periodCount}
                  </div>
                  <div className="text-sm font-medium ml-6">Teaching hours: {calculateTotals().teachingHours}</div>
                </div>
                <Button onClick={handleSaveSchedule} className="bg-schedule-green hover:bg-schedule-green/80">
                  <Save className="mr-2 h-4 w-4" />
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teacher" className="space-y-6">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-schedule-green text-white border-b">
              <div className="text-center">
                <h2 className="text-xl font-bold">TEACHING SCHEDULE</h2>
                <p className="text-white/80">School: Hanoi International School</p>
                <p className="text-white/80">Address: 123 Example Street, Hanoi</p>
                <div className="mt-2 flex justify-center space-x-4">
                  <p>Duration: 45/2024</p>
                  <p>Week: {selectedWeek || "03/02/2025"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Morning Schedule Display */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 flex items-center text-schedule-header">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Morning
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24 bg-schedule-green text-white">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day} className="bg-schedule-green text-white">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.morning.map((slot, idx) => {
                        const isBreakRow = slot === "9:15-10:00";
                        return (
                          <TableRow key={slot} className={isBreakRow ? "bg-schedule-yellow" : (idx % 2 === 0 ? "bg-white" : "bg-schedule-light-green/30")}>
                            <TableCell className={`font-medium ${isBreakRow ? "bg-schedule-yellow" : "bg-schedule-light-green"}`}>
                              {slot}
                            </TableCell>
                            {days.map(day => {
                              let cellContent = scheduleData[slot]?.[day] || "";
                              if (isBreakRow) cellContent = "BREAK TIME";
                              else if (day === "Mon" && slot === "7:15-8:00") cellContent = "8A1";
                              else if (day === "Tue" && slot === "8:00-8:45") cellContent = "7C1";
                              else if (day === "Thu" && slot === "10:00-10:45") cellContent = "8A3";
                              else if (day === "Fri" && slot === "10:45-11:30") cellContent = "9A6";
                              
                              return (
                                <TableCell 
                                  key={`${slot}-${day}`} 
                                  className={isBreakRow ? "font-bold text-center" : "text-center"}
                                >
                                  {cellContent}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Afternoon Schedule Display */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center text-schedule-header">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Afternoon
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-24 bg-schedule-green text-white">Time</TableHead>
                        {days.map(day => (
                          <TableHead key={day} className="bg-schedule-green text-white">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.afternoon.map((slot, idx) => {
                        const isBreakRow = slot === "15:30-16:15";
                        return (
                          <TableRow key={slot} className={isBreakRow ? "bg-schedule-yellow" : (idx % 2 === 0 ? "bg-white" : "bg-schedule-light-green/30")}>
                            <TableCell className={`font-medium ${isBreakRow ? "bg-schedule-yellow" : "bg-schedule-light-green"}`}>
                              {slot}
                            </TableCell>
                            {days.map(day => {
                              let cellContent = scheduleData[slot]?.[day] || "";
                              
                              if (isBreakRow) cellContent = "BREAK TIME";
                              else if (day === "Mon" && slot === "13:30-14:15") cellContent = "6B2";
                              else if (day === "Thu" && slot === "14:15-15:00") cellContent = "7A4";
                              
                              const isHighlighted = day === "Wed" && (slot === "13:30-14:15" || slot === "14:15-15:00" || slot === "16:15-17:00");
                              
                              return (
                                <TableCell 
                                  key={`${slot}-${day}`} 
                                  className={`text-center ${isBreakRow ? "font-bold" : ""} ${isHighlighted ? "text-schedule-red font-bold" : ""}`}
                                >
                                  {isHighlighted ? "7TC4" : cellContent}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Teacher Name Row */}
              <div className="mt-4 border rounded-lg overflow-hidden">
                <div className="bg-schedule-green text-white py-2 px-4 text-center font-medium">
                  Teacher Name
                </div>
                <div className="grid grid-cols-5 divide-x">
                  {days.map(day => (
                    <div key={day} className="py-2 text-center text-schedule-red font-bold">
                      Rachid
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              <div className="mt-6 border-t pt-4">
                <div className="font-medium flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-primary" />
                  Total of period per week: {calculateTotals().periodCount || 20}
                </div>
                <div className="font-medium ml-7">Teaching hours per week: {calculateTotals().teachingHours || 15}</div>
              </div>
              
              {/* Materials Display */}
              <div className="mt-4 p-4 bg-schedule-light-green rounded-md">
                <h4 className="font-medium">Materials:</h4>
                <p className="text-sm">{materials || "Textbooks for grades 6-9, worksheets A4-A8, flashcards set B"}</p>
              </div>
              
              {/* Download Button */}
              <div className="mt-6 flex justify-end">
                <Button className="bg-schedule-green hover:bg-schedule-green/80">
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
