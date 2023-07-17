import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureEmailNotExists = async (req:Request, res:Response, next:NextFunction) => {
    const emailRequest:string = req.body.email
    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user:User | null = await userRepository.findOneBy({email:emailRequest})

    if(!user){
        return next()
    }else{
        throw new AppError("Email already exists", 409)
    }

}