import { z } from 'zod';

export const changeUserInfoSchema = z.object({
  animelist: z.string(),
  username: z.string()
})


export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, { message: "Password must be atleast 6 characters" }),
  renewPassword: z.string().min(6, { message: "Password must be atleast 6 characters" }),
}).refine((data) => data.newPassword === data.renewPassword, {
  message: "Passwords don't match",
  path: ["renewPassword"]
});