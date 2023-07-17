import { createUserSchema, responseListUsersSchema, responseUserSchema } from './../schemas/users.schemas';
import { z } from "zod";
import { userSchema } from "../schemas/users.schemas";
import { DeepPartial } from 'typeorm';

export type TUser = z.infer<typeof userSchema>

export type TUserRequest = z.infer<typeof createUserSchema>



export type TUserResponse = z.infer<typeof responseUserSchema>

export type TListUsers = z.infer<typeof responseListUsersSchema>

export type TUserUpdate = DeepPartial<TUserRequest> 