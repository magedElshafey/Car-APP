import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";

export type CreateCarPayload = {
  trim_id: number;
  city_id: number;
  sub_type?: string;
  vehicle_type?: string;

  contact_phone: string;
  whatsapp_allowed?: 1 | 0;

  price: number;

  financing_available: 0 | 1;
  financing: {
    down_payment: number;
    duration_months: number;
    monthly_installment: number;
  } | null;

  feature_option_ids: number[];
  highlight_type_ids: number[];

  images: File[];

  details: {
    condition: "new" | "used";
    color: string;
    transmission: "automatic" | "manual";
    fuel_type: string;

    mileage_km?: number;

    // booleans
    is_imported: 0 | 1;
    is_taxi: 0 | 1;
    is_special_needs: 0 | 1;

    // specs
    cylinders?: number;
    drive_type?: string;
    fuel_tank_capacity_l?: number;
    height_mm?: number;
    length_mm?: number;
    width_mm?: number;
    wheelbase_mm?: number;

    power_hp?: number;
    torque_nm?: number;
    top_speed_kmh?: number;

    seats?: number;
    warranty_km?: number;
  };
};

const useCreateCar = () => {
  return useMutation({
    mutationFn: async (payload: CreateCarPayload) => {
      const { data } = await Axios.post(apiRoutes.cars, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
  });
};

export default useCreateCar;
