import { z } from 'zod';

export const changeUserInfoSchema = z.object({
  animelist: z.string(),
  username: z.string()
})

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const changeProfilePictureSchema = z.object({
  profileImage: z.any()
    .refine((files) => files?.length === 1, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, { message: "Password must be atleast 6 characters" }),
  renewPassword: z.string().min(6, { message: "Password must be atleast 6 characters" }),
}).refine((data) => data.newPassword === data.renewPassword, {
  message: "Passwords don't match",
  path: ["renewPassword"]
});