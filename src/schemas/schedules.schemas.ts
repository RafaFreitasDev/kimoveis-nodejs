import { z } from "zod";
import { realEstateSchema } from "./realEstate.schemas";
import { userSchema } from "./users.schemas";

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.date().or(z.string()),
  hour: z.string(),
  realEstate: realEstateSchema,
  user: userSchema,
});

export const createScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});