
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Filter, Users } from "lucide-react";

const Scheduling = () => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Class Scheduling</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Today
          </Button>
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              className={`rounded-none ${viewMode === 'day' ? 'bg-secondary' : ''}`}
              onClick={() => setViewMode("day")}
            >
              Day
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none ${viewMode === 'week' ? 'bg-secondary' : ''}`}
              onClick={() => setViewMode("week")}
            >
              Week
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none ${viewMode === 'month' ? 'bg-secondary' : ''}`}
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button>
          <Users className="mr-2 h-4 w-4" /> Add Class
        </Button>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Teachers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              <SelectItem value="available">Available Teachers</SelectItem>
              <SelectItem value="scheduled">Scheduled Teachers</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-schools">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Schools" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-schools">All Schools</SelectItem>
              <SelectItem value="school-1">Hanoi International</SelectItem>
              <SelectItem value="school-2">HCMC Language Center</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Weekly Schedule</CardTitle>
          <CardDescription>April 11-17, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <div className="flex h-full">
              <div className="w-20 border-r flex-shrink-0">
                <div className="h-12 border-b"></div>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-12 border-b flex items-end justify-end pr-2 text-xs text-muted-foreground">
                    {(i + 7) % 12 === 0 ? '12' : (i + 7) % 12}:00 {i + 7 < 12 ? 'AM' : 'PM'}
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-auto">
                <div className="flex">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex-1 border-r">
                      <div className="h-12 border-b flex items-center justify-center font-medium text-sm">
                        {day}
                      </div>
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-12 border-b">
                          {/* Sample class blocks - these would be dynamically generated */}
                          {day === "Monday" && i === 2 && (
                            <div className="m-1 p-1 bg-teal-100 border border-teal-300 rounded text-xs h-[58px] overflow-hidden">
                              <div className="font-medium">IELTS Prep</div>
                              <div className="text-[10px] text-muted-foreground">9:00-10:30 AM</div>
                              <div className="text-[10px]">Sarah Johnson</div>
                            </div>
                          )}
                          {day === "Tuesday" && i === 4 && (
                            <div className="m-1 p-1 bg-blue-100 border border-blue-300 rounded text-xs h-[34px] overflow-hidden">
                              <div className="font-medium">Business English</div>
                              <div className="text-[10px] text-muted-foreground">11:00-12:00 PM</div>
                            </div>
                          )}
                          {day === "Wednesday" && i === 6 && (
                            <div className="m-1 p-1 bg-purple-100 border border-purple-300 rounded text-xs h-[34px] overflow-hidden">
                              <div className="font-medium">Kids Class</div>
                              <div className="text-[10px] text-muted-foreground">1:00-2:00 PM</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Conflicts</CardTitle>
            <CardDescription>AI-detected potential issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Double booking: Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Friday, April 15 • 10:00-11:00 AM</p>
                </div>
                <Button size="sm">Resolve</Button>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Insufficient break: Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Tuesday, April 12 • Back-to-back classes</p>
                </div>
                <Button size="sm">Resolve</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Teacher Availability</CardTitle>
            <CardDescription>Available teachers for scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-sm font-medium">
                  SJ
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Available: Mon, Wed, Fri • Morning</p>
                </div>
                <Button variant="outline" size="sm">Schedule</Button>
              </div>
              
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                  MC
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Available: Tue, Thu • Afternoon</p>
                </div>
                <Button variant="outline" size="sm">Schedule</Button>
              </div>
              
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium">
                  EW
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Emma Wilson</p>
                  <p className="text-xs text-muted-foreground">Available: Mon-Fri • Evening</p>
                </div>
                <Button variant="outline" size="sm">Schedule</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scheduling;
