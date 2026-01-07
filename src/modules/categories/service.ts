import * as categoryRepository from "./repository";



export const createCategory = async (body: { name: string; description?: string; user_id: number; color?: string; }) => {
  if (!body.name || !body.user_id) throw new Error("name and user_id required");
  return await categoryRepository.createCategory(body);
};


export const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};


export const getCategoriesByUser = async (user_id: number) => {
  return await categoryRepository.getCategoriesByUser(user_id);
};


export const getCategoryById = async (id: number) => {
  const category = await categoryRepository.getCategoryById(id);
  if (!category) throw new Error("Category not found");
  return category;
};


export const updateCategory = async (id: number, body: { name?: string; description?: string; color?: string; }) => {
  
  if (body.name && body.description && body.color === undefined) throw new Error("At least one field to update");

  const updated = await categoryRepository.updateCategory(id, body);

  if (!updated) throw new Error("Category not found");

  return updated;

};


export const deleteCategory = async (id: number) => {
  const deleted = await categoryRepository.deleteCategory(id);
  if (!deleted) throw new Error("Category not found");
  return deleted;
};