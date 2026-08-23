import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactDrawer from "@/components/ui/contact-drawer";
import ShaderBg from "@/components/home/shader-bg";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import SparkleEffect from "@/components/ui/sparkle-effect";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If it has a hash location, bypass scroll-to-top to let smooth-hash-click work
    if (window.location.hash) return;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isPreview = typeof window !== "undefined" && window.location.search.includes("preview=true");
  // Hide the shader (black hole background) on the /about, /projects, and /blog routes, or when in iframe preview mode
  const showShaderBg = !isPreview && location.pathname !== "/about" && location.pathname !== "/projects" && !location.pathname.startsWith("/blog");

  return (
    <SmoothScrollProvider>
      {showShaderBg && <ShaderBg />}
      {!isPreview && <Navbar />}
      <ContactDrawer />
      {!isPreview && <SparkleEffect />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          {/* Unmatched routes redirect home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
