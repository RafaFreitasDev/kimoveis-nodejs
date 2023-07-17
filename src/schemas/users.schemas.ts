import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullish(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const responseUserSchema = userSchema.omit({ password: true });

export const responseListUsersSchema = z.array(responseUserSchema);

export const updateUserSchema = userSchema
  .omit({
    id: true,
    admin: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .partial();
