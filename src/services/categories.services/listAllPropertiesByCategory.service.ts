import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

export const listAllPropertiesByCategoryService = async (
  categoryId: number
): Promise<Category|null> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({id:categoryId})

    if(!findCategory){
        throw new AppError("Category not found",404)
    }

  const categoryProperties: Category | null= await categoryRepository
    .createQueryBuilder("cat")
    .innerJoinAndSelect("cat.realEstate", "re")
    .where("cat.id = :categoryId", { categoryId })
    .getOne()
    
    return categoryProperties
};
