
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  Users, 
  FileCheck, 
  DollarSign, 
  Book, 
  Building, 
  BarChart, 
  Calendar,
  Menu,
  Globe
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  titleVi: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
};

const navItems: NavItem[] = [
  {
    title: "Workforce",
    titleVi: "Nhân lực",
    icon: Users,
    path: "/workforce"
  },
  {
    title: "Compliance",
    titleVi: "Tuân thủ",
    icon: FileCheck,
    path: "/compliance"
  },
  {
    title: "Financial",
    titleVi: "Tài chính",
    icon: DollarSign,
    path: "/financial"
  },
  {
    title: "Resources",
    titleVi: "Tài nguyên",
    icon: Book,
    path: "/resources"
  },
  {
    title: "Clients",
    titleVi: "Khách hàng",
    icon: Building,
    path: "/clients"
  },
  {
    title: "Analytics",
    titleVi: "Phân tích",
    icon: BarChart,
    path: "/analytics"
  },
  {
    title: "Scheduling",
    titleVi: "Lịch biểu",
    icon: Calendar,
    path: "/scheduling"
  }
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  return (
    <Sidebar
      className={cn(
        "border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex w-full items-center justify-between">
          {!isCollapsed && (
            <h2 className="font-bold tracking-tight">TeachViet</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <nav className="grid gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "nav-item",
                isActive ? "active" : "",
                isCollapsed ? "justify-center py-3" : ""
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{language === 'en' ? item.title : item.titleVi}</span>}
            </NavLink>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "sm"}
          onClick={toggleLanguage}
          className="w-full"
        >
          <Globe className="h-5 w-5 mr-2" />
          {!isCollapsed && <span>{language === 'en' ? 'Vietnamese' : 'English'}</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
