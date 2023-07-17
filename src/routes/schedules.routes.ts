import { Router } from "express";
import {
  createScheduleCotronller,
  listAllSchedulesByPropertyController,
} from "../controllers/schedules.controllers";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { createScheduleSchema } from "../schemas/schedules.schemas";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";

export const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValid,
  ensureBodyIsValid(createScheduleSchema),
  createScheduleCotronller
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValid,
  ensureIsAdmin,
  listAllSchedulesByPropertyController
);
