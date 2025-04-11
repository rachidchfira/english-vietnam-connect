
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, FileCheck } from "lucide-react";

export function ComplianceCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Calendar</CardTitle>
        <CardDescription>Important regulatory deadlines and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">Next 30 days</div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Compliance Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">Requiring immediate attention</div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  <span>Compliance Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">92%</span>
                  <Progress value={92} className="h-2 flex-1" />
                </div>
                <div className="text-xs text-muted-foreground">Above industry average</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-[300px] border rounded flex items-center justify-center">
            <p className="text-muted-foreground">Interactive compliance calendar will be implemented here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
