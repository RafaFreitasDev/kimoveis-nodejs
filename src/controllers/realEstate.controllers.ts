import { Request, Response } from "express";
import { createPropertyService } from "../services/realEstate.services/createProperty.service";
import { listAllPropertiesService } from "../services/realEstate.services/listAllProperties.service";

export const createPropertyController = async (req:Request, res:Response):Promise<Response> => {
    const data = req.body

    const realEstate = await createPropertyService(data)
    return res.status(201).json(realEstate)
}

export const listAllPropertiesController = async (req:Request, res:Response):Promise<Response> => {
    
    const properties = await listAllPropertiesService()
    
    return res.status(200).json(properties)
}

