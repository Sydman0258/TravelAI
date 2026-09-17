import OpenAI from "openai";
import { GenerateItineraryRequest } from "../types";

const openai = new OpenAI({
baseURL: "http://localhost:11434/v1",  // 
  apiKey: "ollama"
});


export async function generateItinerary(
  data: GenerateItineraryRequest
): Promise<string> {
  const { destination, startDate, endDate, budget, preferences } = data;

  const days =
    Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  const prefsText = preferences
    ? `
Travel Style: ${preferences.travelStyle || "balanced"}
Interests: ${(preferences.interests || []).join(", ") || "general sightseeing"}
Accommodation preference: ${preferences.accommodation || "any"}
Pace: ${preferences.pace || "moderate"}
`
    : "No specific preferences given – create a balanced, enjoyable itinerary.";

  const prompt = `
You are an expert travel planner for a modern travel-tech company.
Create a detailed, day-by-day itinerary for a trip to **${destination}**.

Trip details:
- Start date: ${startDate}
- End date: ${endDate}
- Duration: ${days} days
- Budget: ${budget ? `$${budget} USD total` : "flexible / not specified"}

User preferences:
${prefsText}

Requirements:
1. Structure the response clearly
2. Start with a short overview and estimated total cost breakdown.
3. Provide a day-by-day plan (Day 1, Day 2, ...).
4. For each day include:
   - Morning / Afternoon / Evening activities
   - Recommended restaurants or food experiences
   - Estimated daily cost
   - Practical tips (transport, tickets, best times)
5. Include at least one local experience or hidden gem.
6. End with packing tips and any important travel notes for ${destination}.
7. Keep the tone friendly, practical, and exciting.
8. If budget is given, respect it and suggest cost-saving alternatives where helpful.
`;

  const completion = await openai.chat.completions.create({
    model: "llama3.2", 
    messages: [
      {
        role: "system",
        content:
          "You are a professional travel planner AI that creates realistic, personalized itineraries.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 2500,
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Failed to generate itinerary from AI provider");
  }

  return content;
}
