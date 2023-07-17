import { Router } from "express";
import {
  createPropertyController,
  listAllPropertiesController,
} from "../controllers/realEstate.controllers";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValid,
  ensureIsAdmin,
  ensureBodyIsValid(createRealEstateSchema),
  createPropertyController
);
realEstateRoutes.get("", listAllPropertiesController);
