import { z } from "zod";
import { loginSchema } from "./loginSchema";
import { emailSchema } from "@/features/auth/schema/emailSchema";
export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, "user name is required"),
    email: emailSchema,
    phone: z
      .string()
      .transform((val) => val.replace(/\s+/g, "").replace(/^(\+20|0020)/, "0"))
      .refine(
        (val) => /^(010|011|012|015)\d{8}$/.test(val),
        "invalid Egyptian phone number",
      ),
    password_confirmation: z.string(),
    // agree_on_terms: z
    //   .boolean()
    //   .refine((val) => val === true, { message: "must-agree-on-terms" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
