import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  repassword: z.string(),
  // email: z.string().email(),
  // confirmEmail: z.string().email()
}).refine((data) => data.password === data.repassword, {
  message: "Passwords don't match",
  path: ["repassword"]
});
// .refine((data) => data.email === data.confirmEmail, {
//   message: "Emails don't match",
//   path: ["confirmEmail"]
// });