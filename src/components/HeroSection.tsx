import { Compass, ArrowDown } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onPlanClick: () => void;
}

export default function HeroSection({ onPlanClick }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-radial from-blue-600 to-indigo-900 text-white rounded-3xl p-8 md:p-16 mb-12 shadow-xl">
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Grid Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-sm font-medium border border-white/10"
          >
            <Compass className="h-4 w-4 text-blue-200 animate-spin-slow" />
            <span>AI-Powered Travel Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-light tracking-tight leading-tight serif"
          >
            VoyageAI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-blue-200 italic serif"
          >
            Plan. Visualize. Travel.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-blue-100 max-w-xl leading-relaxed"
          >
            Experience custom-tailored luxury or pocket-friendly adventures made simple. VoyageAI uses state-of-the-art models to construct comprehensive day-by-day itineraries, visual travel posters, restaurant gems, hotel stays, and detailed budgets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <button
              id="hero-plan-btn"
              onClick={onPlanClick}
              className="px-8 py-3.5 bg-white text-indigo-900 font-semibold rounded-xl shadow-lg hover:bg-slate-50 active:scale-95 hover:shadow-xl transition-all flex items-center gap-2 group focus:outline-hidden"
            >
              Plan My Trip
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="#about-app"
              className="px-6 py-3.5 bg-indigo-800/40 text-blue-100 font-medium rounded-xl border border-white/20 hover:bg-white/10 transition-all focus:outline-hidden"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Beautiful visual representation / vector scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full max-w-sm hidden lg:block"
        >
          <div className="relative p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs shadow-2xl overflow-hidden aspect-4/3 flex items-center justify-center">
            {/* Visual Travel Poster placeholder inside the Hero */}
            <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 filter brightness-90" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80')" }} />
            <div className="relative text-center p-6 space-y-4">
              <Compass className="h-16 w-16 mx-auto text-blue-200 animate-pulse" />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-blue-200">Featured Destination</p>
                <p className="text-2xl font-light text-white serif italic">Kyoto, Japan</p>
              </div>
              <p className="text-xs text-blue-100">Bespoke cherry blossoms, traditional shrines, and tea ceremonies customized for you.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
