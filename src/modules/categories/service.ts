import * as categoryRepository from "./repository";
import type {
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../../lib/dtos";
import type { Category } from "../../lib/types";
import { createError } from "../../middlewares/errorHandler";

export const createCategory = async (
  body: CreateCategoryDTO,
  user_id: number
): Promise<CategoryDTO> => {
  // if (!body.name || !user_id) throw new Error("name and user_id required");
  const category = await categoryRepository.createCategory({
    name: body.name,
    description: body.description,
    user_id,
    color: body.color,
  });

  return category;
};

export const getAllCategories = async (
  user_id: number
): Promise<CategoryDTO[]> => {
  const categories = await categoryRepository.getAllCategories(user_id);

  return categories;
};

export const getCategoryById = async (
  id: number,
  user_id: number
): Promise<CategoryDTO> => {
  const category = await categoryRepository.getCategoryById(id, user_id);
  if (!category) throw createError("Category not found", 404);

  return category;
};

export const updateCategory = async (
  id: number,
  body: UpdateCategoryDTO,
  user_id: number
): Promise<CategoryDTO> => {
  if (
    body.name === undefined &&
    body.description === undefined &&
    body.color === undefined
  ) {
    throw createError("At least one field to update", 400);
  }

  const updated = await categoryRepository.updateCategory(id, body, user_id);
  if (!updated) throw createError("Category not found", 404);

  return updated;
};

export const deleteCategory = async (
  id: number,
  user_id: number
): Promise<void> => {
  const deleted = await categoryRepository.deleteCategory(id, user_id);
  if (!deleted) throw createError("Category not found", 404);
};
