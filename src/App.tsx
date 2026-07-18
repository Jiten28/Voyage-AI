import { useState, useEffect } from "react";
import { Compass, Sparkles, AlertCircle, Info, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./components/ThemeToggle";
import HeroSection from "./components/HeroSection";
import TripForm from "./components/TripForm";
import TripResults from "./components/TripResults";
import { TripPlan, TripSearchParams } from "./types";

const LOADING_STEPS = [
  "Analyzing optimal travel vectors...",
  "Consulting local guides and expert advisors...",
  "Curating boutique hotel matches...",
  "Scouting off-the-beaten-path culinary gems...",
  "Synthesizing budget options & cost projections...",
  "Mapping daily timelines & duration limits...",
  "Drafting weather advisories & packing lists...",
  "Designing your bespoke artistic travel poster...",
];

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [searchParams, setSearchParams] = useState<TripSearchParams | null>(null);

  // Sync dark mode class with root html element and localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Then check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Cycle loading steps during active travel engineering
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handlePlanTrip = async (params: TripSearchParams) => {
    setLoading(true);
    setError(null);
    setSearchParams(params);
    setTripPlan(null);

    try {
      const response = await fetch("/api/plan-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate travel plan from the server.");
      }

      const planData = await response.json();
      setTripPlan(planData);
    } catch (err: any) {
      console.error("Error calling plan-trip:", err);
      setError(
        err.message ||
          "VoyageAI was unable to construct your plan. Please check if your Gemini API Key is configured correctly in Secrets."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTripPlan(null);
    setSearchParams(null);
    setError(null);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("trip-planner-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col">
      {/* 1. Header Area */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 group cursor-pointer focus:outline-hidden">
            <div className="p-1.5 bg-blue-900 text-white rounded-lg group-hover:rotate-12 transition-transform shadow-md shadow-blue-900/20">
              <Compass className="h-5 w-5" />
            </div>
            <div className="text-left flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-blue-900 dark:text-blue-300">
                Voyage<span className="font-light italic serif">AI</span>
              </span>
              <span className="hidden md:inline-block text-2xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest">
                Plan. Visualize. Travel.
              </span>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </header>

      {/* 2. Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 md:px-6 py-8">
        <AnimatePresence mode="wait">
          {/* A. Dynamic Loading Screen */}
          {loading && (
            <motion.div
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-6"
            >
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
                <Compass className="absolute inset-0 m-auto h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500 animate-bounce" />
                  VoyageAI Planner Core Active
                </h3>
                {/* Crossfade loading steps */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-slate-500 dark:text-slate-400 font-medium h-5 italic"
                  >
                    {LOADING_STEPS[loadingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* B. Error Notice Card */}
          {!loading && error && (
            <motion.div
              key="error-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-6 rounded-2xl shadow-md space-y-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-rose-500 shrink-0" />
                <div className="space-y-1.5">
                  <h3 className="font-bold text-rose-800 dark:text-rose-400">Generation Failed</h3>
                  <p className="text-sm text-rose-700 dark:text-rose-300/90 leading-relaxed">{error}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/30 p-4 rounded-xl text-xs space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5 text-blue-500" /> Troubleshooting Guide:
                </p>
                <ol className="list-decimal pl-4.5 space-y-1">
                  <li>Verify that your <strong>GEMINI_API_KEY</strong> is loaded correctly in the Settings Secrets tab.</li>
                  <li>Ensure the internet connections / quota limits of your API key are fully compliant.</li>
                  <li>Click retry below to submit your trip parameters again.</li>
                </ol>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 border border-rose-300 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-sm font-semibold rounded-xl hover:bg-rose-100/50 transition-all focus:outline-hidden"
                >
                  Back to Form
                </button>
                <button
                  onClick={() => searchParams && handlePlanTrip(searchParams)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-1 focus:outline-hidden"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry Generation
                </button>
              </div>
            </motion.div>
          )}

          {/* C. Home Screen (Hero + Form) */}
          {!loading && !error && !tripPlan && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <HeroSection onPlanClick={scrollToForm} />
              <TripForm onSubmit={handlePlanTrip} loading={loading} />

              {/* Startup informational section */}
              <section id="about-app" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-900 dark:text-blue-400 block">01. Smart Itineraries</span>
                  <h4 className="text-xl font-light text-slate-800 dark:text-slate-200 serif">Bespoke <span className="italic text-blue-900 dark:text-blue-400">Schedules</span></h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">No generic lists. Every single hour is configured according to your speed, travelers count, and selected hobby style.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-900 dark:text-blue-400 block">02. Destination Posters</span>
                  <h4 className="text-xl font-light text-slate-800 dark:text-slate-200 serif">Artistic <span className="italic text-blue-900 dark:text-blue-400">Representation</span></h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">VoyageAI commands image models to create stylized vintage-themed postcards reflecting your personal holiday getaway.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-900 dark:text-blue-400 block">03. Expense Forecasting</span>
                  <h4 className="text-xl font-light text-slate-800 dark:text-slate-200 serif">Budget <span className="italic text-blue-900 dark:text-blue-400">Analytics</span></h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Know where your money goes. Automatically divides budgets into categorized visual graphs with detailed lodging & dinner options.</p>
                </div>
              </section>
            </motion.div>
          )}

          {/* D. Premium Guidebook Results Screen */}
          {!loading && !error && tripPlan && searchParams && (
            <motion.div
              key="results-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TripResults plan={tripPlan} searchParams={searchParams} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer Area */}
      <footer className="border-t border-slate-200/60 dark:border-slate-900 py-6 text-center text-xs text-slate-400 mt-16">
        <p>© 2026 VoyageAI Inc. Powered by Gemini Pro and Image Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}
