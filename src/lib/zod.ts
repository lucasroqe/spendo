import { z } from "zod";
import { Category } from "@prisma/client";

const AuthSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of transaction is required.",
  }),
  category: z.nativeEnum(Category),
  amount: z.number({
    required_error: "Amount is required.",
    invalid_type_error: "Amount must be a number",
  }),
  description: z.string().optional(),
});

export { AuthSchema, FormSchema };
