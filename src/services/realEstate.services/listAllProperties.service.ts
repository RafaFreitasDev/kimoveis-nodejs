import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

export const listAllPropertiesService = async (): Promise<RealEstate[]> => {
 
  const propertyRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const properties:RealEstate[] = await propertyRepository.find({
    relations: {
        address:true
    }
  });

return properties
};