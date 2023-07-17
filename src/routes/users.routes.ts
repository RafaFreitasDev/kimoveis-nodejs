import { Router } from "express";
import {
  createUserCotroller,
  deleteUsersControler,
  listAllUsersControler,
  updateUserControler,
} from "../controllers/users.controllers";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import { ensureIdExists } from "../middlewares/ensureIdExists.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureBodyIsValid(createUserSchema),
  ensureEmailNotExists,
  createUserCotroller
);

usersRoutes.get("", ensureTokenIsValid, ensureIsAdmin, listAllUsersControler);

usersRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureIdExists,
  ensureBodyIsValid(updateUserSchema),
  updateUserControler
);

usersRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureIdExists,
  ensureIsAdmin,
  deleteUsersControler
);
