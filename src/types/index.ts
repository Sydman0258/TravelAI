export interface GenerateItineraryRequest {
  destination: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  budget?: number;
  preferences?: {
    travelStyle?: string;      // e.g. "adventure", "relaxation", "culture"
    interests?: string[];      // e.g. ["food", "history", "nature"]
    accommodation?: string;    // e.g. "hotel", "hostel", "airbnb"
    pace?: string;             // e.g. "relaxed", "moderate", "packed"
  };
}

export interface ItineraryResponse {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number | null;
  preferences?: string | null;
  content: string;
  createdAt: Date;
}
