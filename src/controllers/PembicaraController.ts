import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";
import { prisma } from "../lib/db";

// Get all pembicara
export const getPembicara = async (req: Request, res: Response) => {
  try {
    const allPembicara = await prisma.pembicara.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(allPembicara);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new pembicara
export const createPembicara = async (req: Request, res: Response) => {
  try {
    const { nama, role } = req.body;
    if (!nama || !role) {
      return res.status(400).json({ error: "Nama dan role wajib diisi" });
    }
    const created = await prisma.pembicara.create({
      data: { nama, role },
    });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update pembicara
export const updatePembicara = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nama, role } = req.body;
    const updated = await prisma.pembicara.update({
      where: { id },
      data: { nama, role },
    });
    res.json(updated);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pembicara tidak ditemukan" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete pembicara
export const deletePembicara = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.pembicara.delete({ where: { id } });
    res.json({ message: "Pembicara berhasil dihapus" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pembicara tidak ditemukan" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};