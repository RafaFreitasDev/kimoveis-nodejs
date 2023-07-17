import { z } from "zod";
import { createRealEstateSchema, realEstateSchema, responseRealEstateSchema } from "../schemas/realEstate.schemas";
import { addressSchema } from "../schemas/addresses.schemas";

export type TProperty = z.infer<typeof realEstateSchema>

export type TPropertyRequest = z.infer<typeof createRealEstateSchema>

export type TPropertyResponse = z.infer<typeof responseRealEstateSchema>

export type TAddress = z.infer<typeof addressSchema>