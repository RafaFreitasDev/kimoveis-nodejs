import { Repository } from "typeorm";
import { TListUsers } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { responseListUsersSchema } from "../../schemas/users.schemas";
import { User } from "../../entities";


export const listAllUsersService = async (): Promise<TListUsers> => {
 
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users:User[] = await userRepository.find({
    withDeleted:true,
  });

  const usersReturn = responseListUsersSchema.parse(users)

  return usersReturn;
};