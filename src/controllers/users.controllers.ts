import { Request, Response } from "express";
import { createUserService } from "../services/users.services/createUser.service";
import { TListUsers, TUserRequest, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { listAllUsersService } from "../services/users.services/listAllUsers.service";
import { deleeteUserService } from "../services/users.services/deleteUser.service";
import { updateUserService } from "../services/users.services/updateUser.service";

export const createUserCotroller =async (req:Request, res:Response):Promise<Response> => {
    const userData:TUserRequest = req.body

    const newUser = await createUserService(userData)
    
    return res.status(201).json(newUser)
}

export const listAllUsersControler = async (req:Request, res:Response):Promise<Response> => {
    
    const users:TListUsers = await listAllUsersService()
    
    return res.status(200).json(users)
}

export const updateUserControler = async (req:Request, res:Response):Promise<Response> => {
    const userId:number = parseInt(req.params.id)
    const updateData:TUserUpdate = req.body
    const logedUserId:number = parseInt(res.locals.userId)
    const admin:boolean = res.locals.userAdmin

    const updatedUser = await updateUserService(userId,updateData, logedUserId, admin)
    return res.status(200).json(updatedUser)
}

export const deleteUsersControler = async (req:Request, res:Response):Promise<Response> => {
    const userId = parseInt(req.params.id)

    const deleteUser = await deleeteUserService(userId)
    return res.status(204).send()
}