import { z } from "zod";
import { singlePasswordSchema } from "./passwordSchema";
import { emailSchema } from "@/features/auth/schema/emailSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: singlePasswordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
