import { z } from "zod";
import { addressSchema, createAndResponseAddressSchema } from "./addresses.schemas";
import { categorySchema } from "./categories.schemas";

export const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.string().or(z.number().positive()),
  size: z.number().positive(),
  address: addressSchema,
  category: categorySchema,
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
});

export const createRealEstateSchema = z.object({
    value: z.string().or(z.number().positive()),
    size: z.number().positive(),
    address: createAndResponseAddressSchema,
    categoryId: z.number().positive()
  });

export const responseRealEstateSchema = realEstateSchema.omit({});

export const listPropertiesSchema = z.array(realEstateSchema)
