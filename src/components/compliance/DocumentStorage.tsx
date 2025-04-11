
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Filter, FileText, Search } from "lucide-react";

export function DocumentStorage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Secure Document Storage</CardTitle>
            <CardDescription>Store and manage important teacher documentation</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8 w-[250px]" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <div className="px-4 py-3 border-b bg-muted/50 grid grid-cols-5 font-medium text-sm">
            <div>Document Type</div>
            <div>Related To</div>
            <div>Date Added</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div>
            {[
              {
                type: "Work Permit",
                person: "Sarah Johnson",
                date: "2024-08-15",
                status: "verified"
              },
              {
                type: "Academic Credentials",
                person: "Michael Chen",
                date: "2024-10-03",
                status: "pending"
              },
              {
                type: "Background Check",
                person: "Emma Wilson",
                date: "2024-02-10",
                status: "verified"
              },
              {
                type: "TESOL Certificate",
                person: "David Kim",
                date: "2024-09-22",
                status: "verified"
              },
            ].map((doc, i) => (
              <div key={i} className="px-4 py-3 border-b grid grid-cols-5 text-sm items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {doc.type}
                </div>
                <div>{doc.person}</div>
                <div>{doc.date}</div>
                <div>
                  <Badge 
                    variant={doc.status === "verified" ? "outline" : "secondary"}>
                    {doc.status === "verified" ? "Verified" : "Pending Verification"}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
