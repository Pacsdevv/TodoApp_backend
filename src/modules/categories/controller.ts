import type { NextFunction, Request, Response } from "express";
import * as categoryService from "./service";
import type { AuthRequest } from "../../lib/types";
import { createError } from "../../middlewares/errorHandler";

export const createCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const newCategory = await categoryService.createCategory(req.body, user_id);

    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllCategories = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const categories = await categoryService.getAllCategories(user_id);

    res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (err: any) {
    next(err);
  }
};

// export const getCategoriesByUser = async (req: Request, res: Response) => {
//   try {
//     const categories = await categoryService.getCategoriesByUser(
//       Number(req.params.userId)
//     );
//     res.json(categories);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getCategoryById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const category_id = Number(req.params.id);
    if (category_id < 1) {
      throw createError("Invalid category id", 400);
    }

    const category = await categoryService.getCategoryById(
      category_id,
      user_id
    );

    res.status(200).json({
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const category_id = Number(req.params.id);
    if (category_id < 1) {
      throw createError("Invalid category id", 400);
    }

    const category = await categoryService.updateCategory(
      category_id,
      req.body,
      user_id
    );

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const category_id = Number(req.params.id);
    if (category_id < 1) {
      throw createError("Invalid category id", 400);
    }

    await categoryService.deleteCategory(category_id, user_id);

    res.json({ message: "Category deleted" });
  } catch (err: any) {
    next(err);
  }
};
