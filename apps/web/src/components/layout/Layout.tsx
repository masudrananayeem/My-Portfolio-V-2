import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../../lib/lenis";

export function Layout() {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    scrollToTop(true);
    const handleScroll = () => setShowTop(window.scrollY > 480);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-base-black">
      <div aria-hidden="true" className="site-background" />
      <Navbar />
      <main className="pt-20">
        <LayoutGroup id="portfolio-route">
          <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </main>
      <Footer />
      <button
        type="button"
        onClick={() => scrollToTop(false)}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-base-border bg-base-near/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan hover:text-accent-cyan sm:bottom-7 sm:right-7 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp size={17} />
      </button>
    </div>
  );
}
