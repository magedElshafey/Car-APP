import { z } from "zod";

export const createCarAdSchema = z.object({
  trim_id: z.number().int().positive().optional(),
  city_id: z.number().int().positive().optional(),
  condition: z.enum(["new", "used"], {
    message: "createCarAd.validation.conditionRequired",
  }),
  car_type: z.enum(["automatic", "manual"], {
    message: "createCarAd.validation.carTypeRequired",
  }),
  fuel_type: z.string().trim().min(1, "createCarAd.validation.fuelTypeRequired"),
  city: z.string().trim().min(1, "createCarAd.validation.locationRequired"),
  color: z.string().trim().min(1, "createCarAd.validation.colorRequired"),
  mileage_km: z.string().trim().optional(),
  is_special_needs: z.boolean().optional(),
  is_taxi: z.boolean().optional(),
  is_imported: z.boolean().optional(),
  whatsapp_allowed: z.boolean().optional(),
  contact_phone: z
    .string()
    .trim()
    .min(1, "createCarAd.validation.contactPhoneRequired")
    .regex(/^\+?[0-9]{7,15}$/, "createCarAd.validation.contactPhoneInvalid"),
  description: z.string().trim().optional(),
  price: z.string().trim().min(1, "createCarAd.validation.priceRequired"),
  can_be_financed: z.enum(["yes", "no"], {
    message: "createCarAd.validation.canBeFinancedRequired",
  }),
  down_payment: z.string().trim().optional(),
  duration_months: z.string().trim().optional(),
  monthly_installment: z.string().trim().optional(),
}).superRefine((data, ctx) => {
  if (!data.trim_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "createCarAd.validation.trimRequired",
      path: ["trim_id"],
    });
  }

  if (!data.city_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "createCarAd.validation.locationRequired",
      path: ["city_id"],
    });
  }

  if (data.condition === "used") {
    if (!data.mileage_km?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "createCarAd.validation.mileageRequired",
        path: ["mileage_km"],
      });
    } else if (!/^\d+$/.test(data.mileage_km.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "createCarAd.validation.mileageInvalid",
        path: ["mileage_km"],
      });
    }
  }

  if (data.can_be_financed !== "yes") return;

  if (!data.down_payment?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "createCarAd.validation.downPaymentRequired",
      path: ["down_payment"],
    });
  }

  if (!data.duration_months?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "createCarAd.validation.durationMonthsRequired",
      path: ["duration_months"],
    });
  }

  if (!data.monthly_installment?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "createCarAd.validation.monthlyInstallmentRequired",
      path: ["monthly_installment"],
    });
  }
});

export type CreateCarAdSchemaType = z.infer<typeof createCarAdSchema>;