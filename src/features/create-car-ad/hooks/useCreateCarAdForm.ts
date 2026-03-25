import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createCarAdSchema,
  type CreateCarAdSchemaType,
} from "../schema/createCarAd.schema";

const useCreateCarAdForm = () => {
  return useForm<CreateCarAdSchemaType>({
    resolver: zodResolver(createCarAdSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      trim_id: undefined,
      city_id: undefined,
      condition: "new",
      car_type: "automatic",
      fuel_type: "",
      city: "",
      color: "",
      mileage_km: "",
      is_special_needs: false,
      is_taxi: false,
      is_imported: false,
      whatsapp_allowed: false,
      contact_phone: "",
      description: "",
      price: "",
      can_be_financed: undefined,
      down_payment: "",
      duration_months: "",
      monthly_installment: "",
    },
  });
};

export default useCreateCarAdForm;