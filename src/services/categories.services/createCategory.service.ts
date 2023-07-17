import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  TCategory,
  TCategoryRequest,
} from "../../interfaces/categories.interfaces";
import { categorySchema } from "../../schemas/categories.schemas";
import { AppError } from "../../error";

export const createCategoryService = async (
  categoryData: TCategoryRequest
): Promise<TCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({name:categoryData.name})

    if(findCategory){
        throw new AppError("Category already exists", 409)
    }

  const category: Category = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  const newcategory: TCategory = categorySchema.parse(category);

  return newcategory;
};
