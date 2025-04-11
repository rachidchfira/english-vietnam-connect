
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCard } from "@/components/DashboardCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, FilterX } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const mockPerformanceData = [
  { id: 1, teacher: "John Smith", school: "Hanoi International School", schoolFeedback: 4.8, studentRating: 4.6, attendance: 98 },
  { id: 2, teacher: "Sarah Johnson", school: "HCMC Language Center", schoolFeedback: 4.5, studentRating: 4.7, attendance: 100 },
  { id: 3, teacher: "Michael Chen", school: "Da Nang English Academy", schoolFeedback: 4.2, studentRating: 4.4, attendance: 95 },
  { id: 4, teacher: "Emma Wilson", school: "Hanoi International School", schoolFeedback: 4.6, studentRating: 4.3, attendance: 97 },
  { id: 5, teacher: "David Lee", school: "HCMC Language Center", schoolFeedback: 4.9, studentRating: 4.8, attendance: 99 },
];

const mockChartData = [
  { month: 'Jan', avgFeedback: 4.6, avgAttendance: 98 },
  { month: 'Feb', avgFeedback: 4.7, avgAttendance: 97 },
  { month: 'Mar', avgFeedback: 4.5, avgAttendance: 99 },
  { month: 'Apr', avgFeedback: 4.6, avgAttendance: 96 },
  { month: 'May', avgFeedback: 4.8, avgAttendance: 98 },
  { month: 'Jun', avgFeedback: 4.4, avgAttendance: 95 },
];

export function PerformanceDashboard() {
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedSchool, setSelectedSchool] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("");
  
  // Filter data based on selections
  const filteredData = mockPerformanceData.filter(item => {
    return (selectedTeacher === "all" || item.teacher === selectedTeacher) && 
           (selectedSchool === "all" || item.school === selectedSchool);
  });
  
  // Calculate averages
  const calculateAverages = () => {
    if (filteredData.length === 0) return { avgSchoolFeedback: 0, avgStudentRating: 0, avgAttendance: 0 };
    
    const avgSchoolFeedback = filteredData.reduce((sum, item) => sum + item.schoolFeedback, 0) / filteredData.length;
    const avgStudentRating = filteredData.reduce((sum, item) => sum + item.studentRating, 0) / filteredData.length;
    const avgAttendance = filteredData.reduce((sum, item) => sum + item.attendance, 0) / filteredData.length;
    
    return {
      avgSchoolFeedback: parseFloat(avgSchoolFeedback.toFixed(1)),
      avgStudentRating: parseFloat(avgStudentRating.toFixed(1)),
      avgAttendance: parseFloat(avgAttendance.toFixed(1))
    };
  };
  
  const averages = calculateAverages();
  
  // Reset filters
  const resetFilters = () => {
    setSelectedTeacher("all");
    setSelectedSchool("all");
    setDateRange("");
  };

  // Get unique teachers and schools for filter dropdowns
  const teachers = Array.from(new Set(mockPerformanceData.map(item => item.teacher)));
  const schools = Array.from(new Set(mockPerformanceData.map(item => item.school)));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Performance Dashboard</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {teachers.map(teacher => (
                <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSchool} onValueChange={setSelectedSchool}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              {schools.map(school => (
                <SelectItem key={school} value={school}>{school}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-[180px] pl-9"
            />
            <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button variant="ghost" size="icon" onClick={resetFilters}>
            <FilterX className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard 
          title="Average School Feedback" 
          description="Scale: 1-5 stars"
        >
          <div className="flex items-center">
            <div className="text-4xl font-bold">{averages.avgSchoolFeedback}</div>
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(averages.avgSchoolFeedback) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Average Student Rating" 
          description="Scale: 1-5 stars"
        >
          <div className="flex items-center">
            <div className="text-4xl font-bold">{averages.avgStudentRating}</div>
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(averages.avgStudentRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Average Attendance" 
          description="Percentage of scheduled classes"
        >
          <div className="text-4xl font-bold">{averages.avgAttendance}%</div>
        </DashboardCard>
      </div>
      
      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>6-month rolling average</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="avgFeedback" name="Average Feedback" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="avgAttendance" name="Average Attendance %" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Teacher Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher Performance Details</CardTitle>
          <CardDescription>Individual teacher metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>School Feedback</TableHead>
                  <TableHead>Student Rating</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.teacher}</TableCell>
                    <TableCell>{teacher.school}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{teacher.schoolFeedback}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.round(teacher.schoolFeedback) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{teacher.studentRating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.round(teacher.studentRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.attendance}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
