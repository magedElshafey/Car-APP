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
    defaultValues: {
      condition: undefined,
      car_type: undefined,
      fuel_type: "",
      city: "",
      color: "",
      price: "",
      can_be_financed: undefined,
      down_payment: "",
      duration_months: "",
      monthly_installment: "",
    },
  });
};

export default useCreateCarAdForm;