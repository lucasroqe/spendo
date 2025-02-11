import { z } from "zod";
import { Category } from "@prisma/client";

const AuthSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});


const FormSchema = z.object({
  date: z.date({
    required_error: "A date of transaction is required.",
  }),
  category: z.nativeEnum(Category),
  amount: z.number({
    required_error: "Amount is required.",
    invalid_type_error: "Amount must be a number",
  }).min(1, { message: "Amount must be at least R$1" }),
  description: z.string().optional(),
});

const PasswordSchema = z
.object({
  oldPassword: z.string().min(1, "Current password is required"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export { AuthSchema, FormSchema, PasswordSchema };
