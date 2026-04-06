import { z } from "zod";

export const createCarAdSchema = z
  .object({
    trim_id: z.number().int().positive().optional(),
    city_id: z.number().int().positive(),

    sub_type: z.string().trim().optional(),
    vehicle_type: z.string().trim().optional(),

    condition: z.enum(["new", "used"], {
      message: "createCarAd.validation.conditionRequired",
    }),

    transmission: z.enum(["automatic", "manual"], {
      message: "createCarAd.validation.carTypeRequired",
    }),

    fuel_type: z
      .string()
      .trim()
      .min(1, "createCarAd.validation.fuelTypeRequired"),

    city: z.string().trim().min(1, "createCarAd.validation.locationRequired"),
    brand_id: z
      .number({ message: "createCarAd.validation.brandRequired" })
      .int()
      .positive(),
    model_id: z
      .number({ message: "createCarAd.validation.modelRequired" })
      .int()
      .positive(),
    year: z.string().min(1, {
      message: "createCarAd.validation.yearRequired",
    }),
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

    // financing (flat as requested)
    // can_be_financed: z.enum(["yes", "no"], {
    //   message: "createCarAd.validation.canBeFinancedRequired",
    // }),
    // down_payment: z.string().trim().optional(),
    // duration_months: z.string().trim().optional(),
    // monthly_installment: z.string().trim().optional(),

    // additional specs (all optional & flat)
    cylinders: z.string().trim().optional(),
    drive_type: z.string().trim().optional(),
    fuel_tank_capacity_l: z.string().trim().optional(),
    height_mm: z.string().trim().optional(),
    length_mm: z.string().trim().optional(),
    width_mm: z.string().trim().optional(),
    wheelbase_mm: z.string().trim().optional(),

    power_hp: z.string().trim().optional(),
    torque_nm: z.string().trim().optional(),
    top_speed_kmh: z.string().trim().optional(),

    seats: z.string().trim().optional(),
    warranty_km: z.string().trim().optional(),

    // arrays
    feature_option_ids: z.array(z.number()).optional(),
    highlight_type_ids: z.array(z.number()).optional(),
  })
  .superRefine((data, ctx) => {
    // if (!data.trim_id) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "createCarAd.validation.trimRequired",
    //     path: ["trim_id"],
    //   });
    // }

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

    // if (!data.down_payment?.trim()) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "createCarAd.validation.downPaymentRequired",
    //     path: ["down_payment"],
    //   });
    // }

    // if (!data.duration_months?.trim()) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "createCarAd.validation.durationMonthsRequired",
    //     path: ["duration_months"],
    //   });
    // }

    // if (!data.monthly_installment?.trim()) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "createCarAd.validation.monthlyInstallmentRequired",
    //     path: ["monthly_installment"],
    //   });
    // }
  });

export type CreateCarAdSchemaType = z.infer<typeof createCarAdSchema>;
