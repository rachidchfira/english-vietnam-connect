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
            {/* Other module routes would be added here */}
            <Route path="/financial" element={<Dashboard />} />
            <Route path="/resources" element={<Dashboard />} />
            <Route path="/clients" element={<Dashboard />} />
            <Route path="/analytics" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
