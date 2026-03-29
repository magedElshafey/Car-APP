// schema.ts
import { emailSchema } from "@/features/auth/schema/emailSchema";
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),

  email: emailSchema,

  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, "").replace(/^(\+20|0020)/, "0"))
    .refine(
      (val) => /^(010|011|012|015)\d{8}$/.test(val),
      "invalid Egyptian phone number",
    ),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
