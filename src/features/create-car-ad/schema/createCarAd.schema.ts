import { z } from "zod";

export const createCarAdSchema = z.object({
  condition: z.enum(["new", "used"], {
    message: "createCarAd.validation.conditionRequired",
  }),
  car_type: z.enum(["automatic", "manual"], {
    message: "createCarAd.validation.carTypeRequired",
  }),
  fuel_type: z.string().trim().min(1, "createCarAd.validation.fuelTypeRequired"),
  city: z.string().trim().min(1, "createCarAd.validation.locationRequired"),
  color: z.string().trim().min(1, "createCarAd.validation.colorRequired"),
  price: z.string().trim().min(1, "createCarAd.validation.priceRequired"),
  can_be_financed: z.enum(["yes", "no"], {
    message: "createCarAd.validation.canBeFinancedRequired",
  }),
  down_payment: z.string().trim().optional(),
  duration_months: z.string().trim().optional(),
  monthly_installment: z.string().trim().optional(),
}).superRefine((data, ctx) => {
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