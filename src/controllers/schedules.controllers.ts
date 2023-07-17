import { Request, Response } from "express";
import { createScheduleService } from "../services/schedules.services/createSchedule.service";
import { listAllSchedulesByPropertyService } from "../services/schedules.services/listAllSchedulesByProperty.service";

export const createScheduleCotronller =async (req:Request, res:Response):Promise<Response> => {
    const scheduleData = req.body
    console.log(scheduleData);
    
    const userId:number = parseInt(res.locals.userId)
    console.log(userId);
    
    const schedule = await createScheduleService(scheduleData, userId)
    return res.status(201).json({message:"Schedule created"})
}

export const listAllSchedulesByPropertyController = async (req:Request, res:Response):Promise<Response> => {
    const propertyId:number = parseInt(req.params.id)
    
    const schedulesByProperty = await listAllSchedulesByPropertyService(propertyId)
    
    return res.status(200).json(schedulesByProperty)
}