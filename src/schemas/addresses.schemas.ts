import { z } from "zod";

export const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(120),
  state: z.string().max(2),
});

export const createAndResponseAddressSchema = addressSchema.omit({ id: true });

