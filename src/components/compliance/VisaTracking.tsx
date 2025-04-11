
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function VisaTracking() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Visa Status Overview</CardTitle>
            <CardDescription>Tracking all teacher work permits and visas</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Calendar View
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valid Visas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <div className="text-xs text-muted-foreground">70% of total workforce</div>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-muted-foreground">Within 60 days</div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Immediate Action</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13</div>
                <div className="text-xs text-muted-foreground">Within 14 days or expired</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="border rounded-lg">
            <div className="px-4 py-3 border-b bg-muted/50 grid grid-cols-6 font-medium text-sm">
              <div>Teacher Name</div>
              <div>Visa Type</div>
              <div>Issue Date</div>
              <div>Expiry Date</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            <div>
              {[
                {
                  name: "Sarah Johnson",
                  type: "Work Permit",
                  issueDate: "2024-08-15",
                  expiryDate: "2025-05-12",
                  status: "valid"
                },
                {
                  name: "Michael Chen",
                  type: "Business Visa",
                  issueDate: "2024-10-03",
                  expiryDate: "2025-04-20",
                  status: "expiring"
                },
                {
                  name: "Emma Wilson",
                  type: "Work Permit",
                  issueDate: "2024-02-10",
                  expiryDate: "2025-04-18",
                  status: "urgent"
                },
                {
                  name: "David Kim",
                  type: "Teacher Visa",
                  issueDate: "2024-09-22",
                  expiryDate: "2025-09-20",
                  status: "valid"
                },
              ].map((person, i) => (
                <div key={i} className="px-4 py-3 border-b grid grid-cols-6 text-sm items-center">
                  <div>{person.name}</div>
                  <div>{person.type}</div>
                  <div>{person.issueDate}</div>
                  <div>{person.expiryDate}</div>
                  <div>
                    <Badge 
                      variant={person.status === "valid" ? "outline" : 
                              person.status === "expiring" ? "secondary" : "destructive"}>
                      {person.status === "valid" ? "Valid" : 
                       person.status === "expiring" ? "Expiring Soon" : "Urgent Action"}
                    </Badge>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
