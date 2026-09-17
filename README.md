#  TravelAI – AI-Powered Travel Itinerary Planner

**Portfolio project** designed to demonstrate the exact skills required for a  
**Software Engineering Intern – AI/ML** role (Node.js, TypeScript, AI/ML, REST APIs, databases, practical AI products).

Built with a travel focus so it is especially relevant for companies like **Travel Help**.

---

## What it does

- Users enter a destination, travel dates, budget and preferences
- The backend calls an LLM (OpenAI) to generate a detailed, day-by-day itinerary
- The itinerary is saved in a database
- Users can view past itineraries
- Clean modern UI included

This is a **real, working AI product**, not a toy demo.

---

##  Tech Stack (maps directly to internship requirements)

| Skill from job description                  | How this project shows it                          |
|--------------------------------------------|----------------------------------------------------|
| Hands-on experience with **Node.js**       | Full Express backend                               |
| **TypeScript**                             | Strict TypeScript throughout                       |
| Understanding of **AI / Machine Learning** | Practical LLM integration (prompt engineering)     |
| **REST APIs**                              | Clean `/api/itineraries` endpoints                 |
| **Databases**                              | Prisma ORM + SQLite (easy to switch to Postgres)   |
| Software development practices             | Proper project structure, types, error handling    |
| Git & collaboration ready                  | Clean commits, clear README, .env.example          |
| Cloud / production readiness               | Easy to deploy (Render, Railway, Fly.io, etc.)     |
| Building practical **AI-powered products** | End-to-end user-facing AI feature                  |

---

##  Project Structure

```
TravelAI/
├── prisma/
│   └── schema.prisma          # Database models
├── public/
│   └── index.html             # Modern single-page frontend
├── src/
│   ├── routes/
│   │   └── itinerary.routes.ts
│   ├── services/
│   │   └── ai.service.ts      # OpenAI / LLM logic
│   ├── types/
│   │   └── index.ts
│   └── index.ts               # Express app entry point
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-...
```

### 3. Initialize the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the app

```bash
npm run dev
```

Open → [http://localhost:3000](http://localhost:3000)

---

##  API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/api/health`           | Health check                    |
| POST   | `/api/itineraries`      | Generate + save new itinerary   |
| GET    | `/api/itineraries`      | List all itineraries            |
| GET    | `/api/itineraries/:id`  | Get full itinerary by ID        |
| DELETE | `/api/itineraries/:id`  | Delete an itinerary             |

### Example POST body

```json
{
  "destination": "Tokyo, Japan",
  "startDate": "2025-04-10",
  "endDate": "2025-04-15",
  "budget": 1800,
  "preferences": {
    "travelStyle": "culture",
    "interests": ["temples", "ramen", "photography"],
    "pace": "moderate",
    "accommodation": "hotel"
  }
}
```

---

## AI Design Notes 

- Uses **gpt-4o-mini** for cost-effectiveness while still producing high-quality output or local LLMs
- Careful prompt engineering: structured day-by-day format, budget awareness, local tips
- Temperature 0.7 balances creativity and reliability
- Graceful error handling when the AI provider fails
- All generated content is persisted so users can revisit it

---

## Possible Future Improvements 

- User authentication (JWT / NextAuth)
- Streaming responses (Server-Sent Events)
- Map integration (Google Maps / Mapbox)
- Multi-language support
- Switch SQLite → PostgreSQL + deploy to cloud
- Rate limiting & caching
- A/B testing different prompts

---

## Why this project is strong for the Travel Help internship

- Directly related to the travel domain
- Shows you can ship a complete AI feature end-to-end
- Demonstrates clean TypeScript + Node.js architecture
- Ready to discuss trade-offs, prompt design, and production concerns

---

