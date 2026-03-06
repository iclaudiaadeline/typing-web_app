import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Settings from "./pages/Settings";
import TypingPractice from "./pages/TypingPractice";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import Certificates from "./pages/Certificates";
import VoiceTyping from "./pages/VoiceTyping";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Public Typing and Voice Pages */}
          <Route path="/typing" element={<TypingPractice />} />
          <Route path="/voice" element={<VoiceTyping />} />
          
          {/* Dashboard Routes (Protected) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/assignments" element={<Assignments />} />
          <Route path="/dashboard/classes" element={<Classes />} />
          <Route path="/dashboard/students" element={<Students />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/practice" element={<TypingPractice />} />
          <Route path="/dashboard/achievements" element={<Achievements />} />
          <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
          <Route path="/dashboard/certificates" element={<Certificates />} />
          <Route path="/dashboard/voice" element={<VoiceTyping />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
