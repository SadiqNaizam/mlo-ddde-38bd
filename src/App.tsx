import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ActivityScreen from "./pages/ActivityScreen";
import DashboardScreen from "./pages/DashboardScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import ParentalControlScreen from "./pages/ParentalControlScreen";
import SavingsScreen from "./pages/SavingsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/activity-screen" element={<ActivityScreen />} />
          <Route path="/dashboard-screen" element={<DashboardScreen />} />
          <Route path="/parental-control-screen" element={<ParentalControlScreen />} />
          <Route path="/savings-screen" element={<SavingsScreen />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
