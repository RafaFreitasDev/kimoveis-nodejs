import { Request, Response } from "express";
import { TCategoryRequest } from "../interfaces/categories.interfaces";
import { createCategoryService } from "../services/categories.services/createCategory.service";
import { listAllCategoriesService } from "../services/categories.services/listAllCategories.service";
import { listAllPropertiesByCategoryService } from "../services/categories.services/listAllPropertiesByCategory.service";

export const createCategoryCotronller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;
console.log(req.body);

  const category = await createCategoryService(categoryData);

  return res.status(201).json(category);
};

export const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listAllCategoriesService();
  
  return res.status(200).json(categories);
};

export const listAllPropertiesByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
    const categoryId = parseInt(req.params.id)

    const properties = await listAllPropertiesByCategoryService(categoryId)
  return res.status(200).json(properties);
};
