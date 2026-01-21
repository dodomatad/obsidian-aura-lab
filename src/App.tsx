import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransitionProvider, useTransition } from "./context/TransitionContext";
import DiveTransition from "./components/DiveTransition";
import ScrollToTop from "./components/ScrollToTop";
import OpiumLoader from "./components/ui/opium-loader";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Historia from "./pages/Historia";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Inner component to access TransitionContext
const AppContent = () => {
  const { isLoaderVisible } = useTransition();
  
  return (
    <>
      <ScrollToTop />
      <DiveTransition />
      <OpiumLoader isVisible={isLoaderVisible} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/modelo/:id" element={<ProductDetail />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <TransitionProvider>
          <AppContent />
        </TransitionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
