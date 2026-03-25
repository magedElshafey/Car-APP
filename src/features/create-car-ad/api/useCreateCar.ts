import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";

export type CreateCarPayload = {
  trim_id: number;
  city_id: number;
  condition: "new" | "used";
  mileage_km: number;
  transmission: "automatic" | "manual";
  fuel_type: string;
  color: string;
  price: number;
  financing_available: boolean;
  financing: {
    down_payment: number;
    duration_months: number;
    monthly_installment: number;
  } | null;
  feature_option_ids: number[];
  highlight_type_ids: number[];
  is_imported: boolean;
  is_taxi: boolean;
  is_special_needs: boolean;
  contact_phone: string;
  whatsapp_allowed: boolean;
};

const useCreateCar = () => {
  return useMutation({
    mutationFn: async (payload: CreateCarPayload) => {
      const { data } = await Axios.post(apiRoutes.cars, payload);
      return data;
    },
  });
};

export default useCreateCar;
