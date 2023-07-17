import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TCategory } from "../../interfaces/categories.interfaces";
import { listCategoriesSchema } from "../../schemas/categories.schemas";


export const listAllCategoriesService = async (): Promise<TCategory[]> => {
 
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

  const categories:Category[] = await categoryRepository.find();

  const categoriesReturn = listCategoriesSchema.parse(categories)

  return categoriesReturn;
};