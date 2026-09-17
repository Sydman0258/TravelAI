import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateItinerary } from "../services/ai.service";
import { GenerateItineraryRequest } from "../types";

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/itineraries
 * Generate a new AI itinerary and save it to the database.
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as GenerateItineraryRequest;

    // Basic validation
    if (!body.destination || !body.startDate || !body.endDate) {
      return res.status(400).json({
        error: "destination, startDate and endDate are required",
      });
    }

    // Generate with AI
    const content = await generateItinerary(body);

    // Persist to database
    const itinerary = await prisma.itinerary.create({
      data: {
        destination: body.destination,
        startDate: body.startDate,
        endDate: body.endDate,
        budget: body.budget ?? null,
        preferences: body.preferences
          ? JSON.stringify(body.preferences)
          : null,
        content,
      },
    });

    res.status(201).json({
      message: "Itinerary generated successfully",
      data: itinerary,
    });
  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({
      error: "Failed to generate itinerary",
      details: error.message,
    });
  }
});

/**
 * GET /api/itineraries
 * List all previously generated itineraries (newest first)
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const itineraries = await prisma.itinerary.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        destination: true,
        startDate: true,
        endDate: true,
        budget: true,
        createdAt: true,
      },
    });

    res.json({ data: itineraries });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch itineraries" });
  }
});

/**
 * GET /api/itineraries/:id
 * Get a single itinerary by ID (full content)
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const itinerary = await prisma.itinerary.findUnique({
      where: { id: req.params.id },
    });

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    res.json({ data: itinerary });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch itinerary" });
  }
});

/**
 * DELETE /api/itineraries/:id
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.itinerary.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Itinerary deleted" });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete itinerary" });
  }
});

export default router;
