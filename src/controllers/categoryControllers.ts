import { Request, Response } from "express";
import { Category } from "../types/category";
import { prisma } from "../lib/db";

let categories: Category[] = [];

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newCategory = await prisma.category.create({ data: { name } });
  res.status(201).json(newCategory);
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const updated = await prisma.category.update({
      where: { id },
      data: { name },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.category.delete({ where: { id } });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
};