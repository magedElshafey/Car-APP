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
      brand_id: undefined,
      model_id: undefined,
      year: "",
      trim_id: undefined,
      city_id: undefined,

      sub_type: "",
      vehicle_type: "car",

      condition: "new",
      transmission: "automatic",

      fuel_type: "",
      city: "",
      color: "",
      mileage_km: "",

      // booleans
      is_special_needs: false,
      is_taxi: false,
      is_imported: false,
      whatsapp_allowed: false,

      contact_phone: "",
      description: "",
      price: "",

      // financing
      can_be_financed: undefined,
      down_payment: "",
      duration_months: "",
      monthly_installment: "",

      // additional specs
      cylinders: "",
      drive_type: "",
      fuel_tank_capacity_l: "",
      height_mm: "",
      length_mm: "",
      width_mm: "",
      wheelbase_mm: "",

      power_hp: "",
      torque_nm: "",
      top_speed_kmh: "",

      seats: "",
      warranty_km: "",

      // arrays
      feature_option_ids: [],
      highlight_type_ids: [],
    },
  });
};

export default useCreateCarAdForm;
