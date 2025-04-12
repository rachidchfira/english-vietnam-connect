
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Filter, Users, School, Search } from "lucide-react";
import { SchedulingTool } from "@/components/SchedulingTool";

const Scheduling = () => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [activeTab, setActiveTab] = useState<"calendar" | "tool">("calendar");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-schedule-header">Class Scheduling</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="border-primary text-primary">
            <Calendar className="mr-2 h-4 w-4" /> Today
          </Button>
          <div className="flex items-center border border-primary rounded-md">
            <Button 
              variant="ghost" 
              className={`rounded-none ${viewMode === 'day' ? 'bg-primary text-white' : 'text-primary'}`}
              onClick={() => setViewMode("day")}
            >
              Day
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none ${viewMode === 'week' ? 'bg-primary text-white' : 'text-primary'}`}
              onClick={() => setViewMode("week")}
            >
              Week
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none ${viewMode === 'month' ? 'bg-primary text-white' : 'text-primary'}`}
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "calendar" | "tool")} className="w-full">
        <TabsList className="w-full mb-6 bg-accent">
          <TabsTrigger value="calendar" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="tool" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
            Scheduling Tool
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Button className="bg-schedule-green hover:bg-schedule-green/90 text-white">
              <Users className="mr-2 h-4 w-4" /> Add Class
            </Button>
            <div className="flex-1"></div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search classes..." 
                  className="pl-8 border-primary/50 focus:border-primary w-full"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-primary/50">
                  <SelectValue placeholder="All Teachers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  <SelectItem value="available">Available Teachers</SelectItem>
                  <SelectItem value="scheduled">Scheduled Teachers</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-schools">
                <SelectTrigger className="w-[180px] border-primary/50">
                  <SelectValue placeholder="All Schools" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-schools">All Schools</SelectItem>
                  <SelectItem value="school-1">Hanoi International</SelectItem>
                  <SelectItem value="school-2">HCMC Language Center</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="border-primary text-primary">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border-primary/20 shadow-md overflow-hidden">
            <CardHeader className="bg-schedule-green text-white pb-3">
              <CardTitle className="text-lg">Weekly Schedule</CardTitle>
              <CardDescription className="text-white/80">April 11-17, 2025</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px]">
                <div className="flex h-full">
                  <div className="w-20 border-r flex-shrink-0">
                    <div className="h-12 border-b bg-schedule-green"></div>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="h-12 border-b flex items-end justify-end pr-2 text-xs text-schedule-header font-medium bg-schedule-light-green/50">
                        {(i + 7) % 12 === 0 ? '12' : (i + 7) % 12}:00 {i + 7 < 12 ? 'AM' : 'PM'}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-auto">
                    <div className="flex">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex-1 border-r">
                          <div className="h-12 border-b flex items-center justify-center font-medium text-sm bg-schedule-green text-white">
                            {day}
                          </div>
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className={`h-12 border-b ${i % 2 === 0 ? "bg-white" : "bg-schedule-light-green/10"}`}>
                              {/* Sample class blocks */}
                              {day === "Monday" && i === 2 && (
                                <div className="m-1 p-1 bg-schedule-light-green border border-primary rounded text-xs h-[58px] overflow-hidden">
                                  <div className="font-medium text-schedule-header">IELTS Prep</div>
                                  <div className="text-[10px] text-muted-foreground">9:00-10:30 AM</div>
                                  <div className="text-[10px]">Sarah Johnson</div>
                                </div>
                              )}
                              {day === "Tuesday" && i === 4 && (
                                <div className="m-1 p-1 bg-blue-100 border border-blue-300 rounded text-xs h-[34px] overflow-hidden">
                                  <div className="font-medium text-blue-800">Business English</div>
                                  <div className="text-[10px] text-muted-foreground">11:00-12:00 PM</div>
                                </div>
                              )}
                              {day === "Wednesday" && i === 6 && (
                                <div className="m-1 p-1 bg-purple-100 border border-purple-300 rounded text-xs h-[34px] overflow-hidden">
                                  <div className="font-medium text-purple-800">Kids Class</div>
                                  <div className="text-[10px] text-muted-foreground">1:00-2:00 PM</div>
                                </div>
                              )}
                              {day === "Wednesday" && i === 2 && (
                                <div className="m-1 p-1 bg-schedule-yellow border border-amber-400 rounded text-xs h-[34px] overflow-hidden">
                                  <div className="font-medium">BREAK TIME</div>
                                  <div className="text-[10px] text-muted-foreground">9:00-10:00 AM</div>
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
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="bg-schedule-light-green border-b">
                <CardTitle>Schedule Conflicts</CardTitle>
                <CardDescription>AI-detected potential issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-schedule-red/10 border border-schedule-red rounded-lg">
                    <div className="h-2 w-2 bg-schedule-red rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Double booking: Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Friday, April 15 • 10:00-11:00 AM</p>
                    </div>
                    <Button size="sm" className="bg-schedule-red hover:bg-schedule-red/80">Resolve</Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Insufficient break: Michael Chen</p>
                      <p className="text-xs text-muted-foreground">Tuesday, April 12 • Back-to-back classes</p>
                    </div>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-500/80">Resolve</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="bg-schedule-light-green border-b">
                <CardTitle>Teacher Availability</CardTitle>
                <CardDescription>Available teachers for scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-schedule-light-green/10 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-white">
                      SJ
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-schedule-header">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Available: Mon, Wed, Fri • Morning</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary text-primary">Schedule</Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-schedule-light-green/10 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-schedule-green flex items-center justify-center text-sm font-medium text-white">
                      MC
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-schedule-header">Michael Chen</p>
                      <p className="text-xs text-muted-foreground">Available: Tue, Thu • Afternoon</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary text-primary">Schedule</Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-schedule-light-green/10 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-sm font-medium text-white">
                      EW
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-schedule-header">Emma Wilson</p>
                      <p className="text-xs text-muted-foreground">Available: Mon-Fri • Evening</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary text-primary">Schedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tool">
          <SchedulingTool />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scheduling;
