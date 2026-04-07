import { z } from "zod";
import { singlePasswordSchema } from "./passwordSchema";

export const loginSchema = z.object({
  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, "").replace(/^(\+20|0020)/, "0"))
    .refine(
      (val) => /^(010|011|012|015)\d{8}$/.test(val),
      "invalid Egyptian phone number",
    ),
  password: singlePasswordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
