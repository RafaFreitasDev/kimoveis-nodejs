import { Router } from "express";
import { createCategoryCotronller, listAllCategoriesController, listAllPropertiesByCategoryController } from "../controllers/categories.controllers";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { createCategorySchema } from "../schemas/categories.schemas";



export const categoriesRoutes: Router = Router()

categoriesRoutes.post("",ensureTokenIsValid, ensureIsAdmin,ensureBodyIsValid(createCategorySchema), createCategoryCotronller)

categoriesRoutes.get("", listAllCategoriesController)

categoriesRoutes.get("/:id/realEstate", listAllPropertiesByCategoryController)