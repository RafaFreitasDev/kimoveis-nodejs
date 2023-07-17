import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

export const listAllSchedulesByPropertyService = async (
  propertyId: number
): Promise<RealEstate|null> => {
  const propertyRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

    
    
    

    
    
    // const propertySchedules: RealEstate | null= await propertyRepository
    //   .createQueryBuilder("prop")
    //   .innerJoinAndSelect("prop.schedule", "sch")
    //   .innerJoinAndSelect("prop.addresses", "add")
    //   .innerJoinAndSelect("prop.categories", "cat")
    //   .where("prop.id = :propertyId", { propertyId })
    //   .getOne()
  //   console.log(propertyRepository);
  
  const propertySchedules: RealEstate|null = await propertyRepository.findOne({
    where:{
      id:propertyId,
    },
    relations:{
      schedules:{
        user:true
      },
      address:true,
      category:true
    }
  })
  console.log(propertySchedules);
  if(!propertySchedules){
      throw new AppError("RealEstate not found", 404)
  }
  
  return propertySchedules
};
