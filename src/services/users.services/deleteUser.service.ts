import { Repository } from "typeorm";
import { TUser, TUserResponse, TUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseUserSchema } from '../../schemas/users.schemas';
import { AppError } from "../../error";

export const deleeteUserService = async (userId:number):Promise<void> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User)

   
    const user: User | null = await userRepository.findOneBy({id:userId})

    if(!user){
        throw new AppError("User not found", 404)
    }
    await userRepository.softRemove(user)
    
}