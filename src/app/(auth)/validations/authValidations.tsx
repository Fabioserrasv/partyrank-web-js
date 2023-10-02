import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  repassword: z.string()
}).refine((data) => data.password === data.repassword, {
  message: "Passwords don't match",
  path: ["repassword"]
});