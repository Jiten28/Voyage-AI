export interface Activity {
  time: string;
  title: string;
  description: string;
  costEstimate?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export interface BudgetCategory {
  category: string;
  amount: string;
  percentage: number;
  description?: string;
}

export interface BudgetBreakdown {
  totalEstimatedCost: string;
  currency: string;
  categories: BudgetCategory[];
}

export interface HotelRecommendation {
  name: string;
  priceRange: string;
  rating: string;
  description: string;
  location?: string;
}

export interface RestaurantRecommendation {
  name: string;
  cuisine: string;
  priceRange: string;
  rating: string;
  description: string;
  recommendedDish: string;
}

export interface TouristAttraction {
  name: string;
  description: string;
  duration?: string;
  cost?: string;
  highlights?: string;
}

export interface TripPlan {
  destinationName: string;
  overview: string;
  highlights: string[];
  budget: BudgetBreakdown;
  itinerary: DayPlan[];
  hotels: HotelRecommendation[];
  restaurants: RestaurantRecommendation[];
  attractions: TouristAttraction[];
  transportation: string;
  weatherTips: string;
  packingChecklist: string[];
  safetyTips: string[];
  posterConceptPrompt: string;
}

export interface TripSearchParams {
  destination: string;
  budget: string;
  days: number;
  travelers: number;
  travelStyle: string;
  interests: string[];
  additionalPreferences: string;
}
