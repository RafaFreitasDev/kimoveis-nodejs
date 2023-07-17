import { Repository } from "typeorm";
import { TUser, TUserResponse, TUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseUserSchema } from '../../schemas/users.schemas';
import { AppError } from "../../error";

export const updateUserService = async (userId:number,updateData:TUserUpdate, logedUserId:number, admin:boolean):Promise<TUserResponse> => {
    if(userId!==logedUserId && !admin){
        throw new AppError("Insufficient permission", 403)
    }
    
    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const oldUserData: User | null = await userRepository.findOneBy({id:userId})

    if(!oldUserData){
        throw new AppError("User not found",404)
    }
    
    const newUserData:User = userRepository.create({
        ...oldUserData,
        ...updateData
    })

    await userRepository.save(newUserData)

    const newUser:TUserResponse = responseUserSchema.parse(newUserData)

    return newUser
}