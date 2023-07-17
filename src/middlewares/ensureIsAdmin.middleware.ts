import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const ensureIsAdmin = (req:Request, res:Response, next:NextFunction) => {

    const admin =  res.locals.userAdmin

    if(!admin){
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}