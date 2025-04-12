
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
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
  </QueryClientProvider>
);

export default App;
