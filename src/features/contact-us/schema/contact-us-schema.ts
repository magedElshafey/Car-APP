import { z } from "zod";

export const contactUsSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "contact-us.phoneRequired" })
    .regex(/^\+?[0-9\s\-()]{7,20}$/, { message: "contact-us.invalidPhone" }),

  email: z
    .string()
    .min(1, { message: "contact-us.emailRequired" })
    .email({ message: "contact-us.invalidEmail" }),

  subject: z
    .string()
    .min(3, { message: "contact-us.subjectMin" })
    .max(100, { message: "contact-us.subjectMax" }),

  message: z
    .string()
    .min(10, { message: "contact-us.messageMin" })
    .max(1000, { message: "contact-us.messageMax" }),
});

export type ContactUsFormData = z.infer<typeof contactUsSchema>;
