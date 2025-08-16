import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Webinars from "./pages/Webinars";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    setWalletAddress(address);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setWalletAddress(undefined);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="islamic-pattern min-h-screen">
            <Header 
              onWalletConnect={handleWalletConnect}
              isWalletConnected={isWalletConnected}
              walletAddress={walletAddress}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route 
                path="/profile" 
                element={
                  <Profile 
                    isWalletConnected={isWalletConnected}
                    walletAddress={walletAddress}
                    onWalletConnect={handleWalletConnect}
                    onWalletDisconnect={handleWalletDisconnect}
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
