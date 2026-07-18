import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm focus:outline-hidden"
      aria-label="Toggle theme mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-amber-400" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700" />
        )}
      </motion.div>
    </button>
  );
}
