import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Search, MapPin, Phone, Calendar, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

// Define a type that matches our database schema
interface School {
  id: string;
  name: string;
  location: string;
  contact_person: string;
  phone: string;
  contract_end: string;
  status: string;
}

interface SchoolListProps {
  onSchoolSelect: (id: string) => void;
}

export function SchoolList({ onSchoolSelect }: SchoolListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch schools from Supabase
  useEffect(() => {
    async function fetchSchools() {
      setIsLoading(true);
      try {
        let { data, error } = await supabase
          .from('schools')
          .select('id, name, location, contact_person, phone, contract_end, status');
          
        if (error) {
          console.error("Error fetching schools:", error);
        } else {
          setSchools(data || []);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSchools();
  }, []);
  
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          school.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || school.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "renewal":
        return <Badge className="bg-amber-500">Renewal Needed</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schools..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="renewal">Renewal Needed</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
      
      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">School Directory</CardTitle>
            <span className="text-sm text-muted-foreground">{filteredSchools.length} schools</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">Loading schools...</div>
          ) : (
            <>
              <div className="border-b px-6 py-3 grid grid-cols-1 md:grid-cols-5 font-medium text-sm">
                <div className="hidden md:block">School Name</div>
                <div className="hidden md:block">Location</div>
                <div className="hidden md:block">Contact</div>
                <div className="hidden md:block">Contract End</div>
                <div className="hidden md:block">Status</div>
              </div>
              <div className="divide-y">
                {filteredSchools.length > 0 ? filteredSchools.map((school) => (
                  <div 
                    key={school.id} 
                    className="px-6 py-4 grid grid-cols-1 md:grid-cols-5 gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => onSchoolSelect(school.id)}
                  >
                    <div className="font-medium flex items-center">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground md:hidden" /> 
                      {school.name}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground md:hidden" />
                      {school.location}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground md:hidden" />
                        {school.contact_person}
                      </div>
                      <div className="text-muted-foreground text-xs">{school.phone}</div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground md:hidden" />
                      {new Date(school.contract_end).toLocaleDateString()}
                    </div>
                    <div>
                      {getStatusBadge(school.status)}
                    </div>
                  </div>
                )) : (
                  <div className="px-6 py-8 text-center text-muted-foreground">
                    No schools found matching your search criteria
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
