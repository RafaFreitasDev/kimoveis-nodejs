import { Repository } from "typeorm";
import { TUserResponse, TUserRequest } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { responseUserSchema } from "../../schemas/users.schemas";
import { User } from "../../entities";


export const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const newUser: TUserResponse = responseUserSchema.parse(user);

  return newUser;
};
