import React, { useState } from "react";
import { Compass, Calendar, Users, DollarSign, Tag, ClipboardList, Info } from "lucide-react";
import { motion } from "motion/react";
import { TripSearchParams } from "../types";

interface TripFormProps {
  onSubmit: (params: TripSearchParams) => void;
  loading: boolean;
}

const TRAVEL_STYLES = [
  { value: "Budget", label: "Budget", desc: "Economical and practical" },
  { value: "Luxury", label: "Luxury", desc: "Premium stays and fine dining" },
  { value: "Romantic", label: "Romantic", desc: "Couples and scenic views" },
  { value: "Adventure", label: "Adventure", desc: "Thrills, hiking, and exploring" },
  { value: "Family", label: "Family", desc: "Kid-friendly and relaxing" },
  { value: "Business", label: "Business", desc: "Work-friendly and efficient" },
];

const INTERESTS = [
  { id: "beaches", name: "Beaches", emoji: "🏖️" },
  { id: "mountains", name: "Mountains", emoji: "🏔️" },
  { id: "nature", name: "Nature", emoji: "🌿" },
  { id: "cafes", name: "Cafes", emoji: "☕" },
  { id: "food", name: "Food", emoji: "🍕" },
  { id: "shopping", name: "Shopping", emoji: "🛍️" },
  { id: "nightlife", name: "Nightlife", emoji: "🌃" },
  { id: "wildlife", name: "Wildlife", emoji: "🦁" },
  { id: "historical_places", name: "Historical Places", emoji: "🏛️" },
  { id: "photography", name: "Photography", emoji: "📷" },
];

export default function TripForm({ onSubmit, loading }: TripFormProps) {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("Moderate");
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [travelStyle, setTravelStyle] = useState("Adventure");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [additionalPreferences, setAdditionalPreferences] = useState("");

  const handleInterestToggle = (interestName: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestName)
        ? prev.filter((name) => name !== interestName)
        : [...prev, interestName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({
      destination,
      budget,
      days,
      travelers,
      travelStyle,
      interests: selectedInterests,
      additionalPreferences,
    });
  };

  return (
    <div id="trip-planner-form-container" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl transition-all">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-400 rounded-lg">
          <Compass className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-blue-900 dark:text-blue-300 serif">Plan Your Next <span className="italic">Adventure</span></h2>
          <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">Fill in details and let AI orchestrate the perfect itinerary.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Field */}
        <div className="space-y-2">
          <label htmlFor="destination-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            Destination <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Compass className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <input
              id="destination-input"
              type="text"
              placeholder="e.g., Paris, Tokyo, Bali, Switzerland"
              required
              disabled={loading}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Duration and Travelers Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="days-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" /> Number of Days
            </label>
            <input
              id="days-input"
              type="number"
              min="1"
              max="14"
              disabled={loading}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-slate-400">Supports plans up to 14 days.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="travelers-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" /> Number of Travelers
            </label>
            <input
              id="travelers-input"
              type="number"
              min="1"
              max="20"
              disabled={loading}
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Budget Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-slate-400" /> Budget Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["Budget", "Moderate", "Luxury"].map((level) => (
              <button
                key={level}
                type="button"
                disabled={loading}
                onClick={() => setBudget(level)}
                className={`py-3 px-4 rounded-xl font-medium border text-sm transition-all focus:outline-hidden flex flex-col items-center justify-center gap-1 ${
                  budget === level
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="font-bold">
                  {level === "Budget" ? "$" : level === "Moderate" ? "$$" : "$$$"}
                </span>
                <span>{level}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400" /> Travel Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.value}
                type="button"
                disabled={loading}
                onClick={() => setTravelStyle(style.value)}
                className={`p-3.5 rounded-xl border text-left transition-all focus:outline-hidden flex flex-col justify-between h-20 ${
                  travelStyle === style.value
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="font-semibold text-sm">{style.label}</span>
                <span className="text-2xs text-slate-400 dark:text-slate-500 truncate leading-tight">{style.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interests Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-slate-400" /> What are you interested in?
          </label>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest.name);
              return (
                <button
                  key={interest.id}
                  type="button"
                  disabled={loading}
                  onClick={() => handleInterestToggle(interest.name)}
                  className={`px-3 py-2 rounded-full border text-sm font-medium transition-all focus:outline-hidden flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{interest.emoji}</span>
                  <span>{interest.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Preferences */}
        <div className="space-y-2">
          <label htmlFor="preferences-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Info className="h-4 w-4 text-slate-400" /> Additional Preferences
          </label>
          <textarea
            id="preferences-input"
            rows={3}
            placeholder="e.g., Vegetarian dining options, close to public transport, accessible rooms, prefer vintage coffee shops, etc."
            disabled={loading}
            value={additionalPreferences}
            onChange={(e) => setAdditionalPreferences(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          id="trip-form-submit-btn"
          type="submit"
          disabled={loading || !destination.trim()}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md focus:outline-hidden flex items-center justify-center gap-2 ${
            loading || !destination.trim()
              ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Consulting VoyageAI Planners...</span>
            </>
          ) : (
            <>
              <Compass className="h-5 w-5" />
              <span>Generate Travel Plan</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
