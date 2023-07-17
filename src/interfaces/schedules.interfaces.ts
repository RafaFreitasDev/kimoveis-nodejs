import { createScheduleSchema, scheduleSchema } from './../schemas/schedules.schemas';
import { z } from "zod";

export type TSchedule = z.infer<typeof scheduleSchema>

export type TScheduleRequest = z.infer<typeof createScheduleSchema>