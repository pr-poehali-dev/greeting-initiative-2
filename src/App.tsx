
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import MainMenu from "./pages/MainMenu";
import Chat from "./pages/Chat";
import Music from "./pages/Music";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setIsRegistered(profile.registered);
    }
  }, []);

  const handleRegister = (name: string, age: number) => {
    const profile = { name, age, registered: true };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsRegistered(true);
  };

  if (!isRegistered) {
    return <RegisterForm onRegister={handleRegister} />;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/cards" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/music" element={<Music />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;