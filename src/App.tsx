import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Activities from "@/pages/Activities";
import AiCoach from "@/pages/AiCoach";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";

import { AuthProvider } from "@/lib/auth";
import Protected from "@/components/Protected";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* public */}
            <Route path="/login" element={<Login />} />

            {/* protected (w środku layout) */}
            <Route
              path="/"
              element={
                <Protected>
                  <AppLayout />
                </Protected>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="activities" element={<Activities />} />
              <Route path="coach" element={<AiCoach />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
