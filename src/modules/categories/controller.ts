import type { Request, Response } from "express";
import * as categoryService from "./service";


export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const rows = await categoryService.getAllCategories();
    res.send(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const getCategoriesByUser = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategoriesByUser(parseInt(req.params.userId));
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(parseInt(req.params.id));
    res.json(category);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await categoryService.updateCategory(parseInt(req.params.id), req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await categoryService.deleteCategory(parseInt(req.params.id));
    res.json({ message: "Category deleted", deleted });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};