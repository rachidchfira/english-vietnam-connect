
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Workforce from "./pages/Workforce";
import Compliance from "./pages/Compliance";
import Scheduling from "./pages/Scheduling";
import Financial from "./pages/Financial";
import Resources from "./pages/Resources";
import ClientManagement from "./pages/ClientManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workforce" element={<Workforce />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/clients" element={<ClientManagement />} />
              <Route path="/analytics" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
