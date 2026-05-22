import { Request, Response } from "express";
import { Event } from "../types/event";
import { prisma } from "../lib/db";

let events: Event[] = [];

// 1. Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        pembicara: true,
      },
    });
    res.json(allEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. Create new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, pembicaraId, tanggal, description } = req.body;
    if (!name || !categoryId || !pembicaraId || !tanggal) {
      return res.status(400).json({ error: "Name, categoryId, pembicaraId, and tanggal are required" });
    }
    const newEvent = await prisma.event.create({
      data: {
        name,
        tanggal: new Date(tanggal),
        description: description || "",
        categoryId: Number(categoryId),
        pembicaraId: Number(pembicaraId),
      },
      include: {
        category: true,
        pembicara: true,
      },
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 3. Get event by id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        pembicara: true,
      },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 4. Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, categoryId, pembicaraId, tanggal, description } = req.body;
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        categoryId: categoryId ? Number(categoryId) : undefined,
        pembicaraId: pembicaraId ? Number(pembicaraId) : undefined,
        tanggal: tanggal ? new Date(tanggal) : undefined,
        description,
      },
      include: {
        category: true,
        pembicara: true,
      },
    });
    res.json(updatedEvent);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Event not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 5. Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Event not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};