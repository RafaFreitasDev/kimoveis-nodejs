import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import {
  TProperty,
  TPropertyRequest,
  TPropertyResponse,
} from "../../interfaces/realEstate.interfaces";
import { AppError } from "../../error";


export const createPropertyService = async (
  data: TPropertyRequest
): Promise<TPropertyResponse> => {
  const categoryId = data.categoryId;

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const foundCategory = await categoryRepository.findOneBy({ id: categoryId });

  if (!foundCategory) {
    throw new AppError("Category not found", 404);
  }

  const addressData = data.address;

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const findAddress = await addressRepository.findOneBy({
    ...addressData,
    number:addressData.number || ""
  });

  if(findAddress){
    throw new AppError("Address already exists", 409)
  }
  
  const address: Address = addressRepository.create(addressData);
  await addressRepository.save(address);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const property: TProperty = realEstateRepository.create({
    value: data.value,
    size: data.size,
    address: address,
    category: foundCategory,
  });

  await realEstateRepository.save(property);

  return property;
};
