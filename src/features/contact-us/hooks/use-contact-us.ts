import {
  ContactUsFormData,
  contactUsSchema,
} from "@/features/contact-us/schema/contact-us-schema";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import toastErrorMessage from "@/utils/toastApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useContactUs = () => {
  const form = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onTouched",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [apiRoutes.contactUs],
    mutationFn: async (data: ContactUsFormData) =>
      Axios.post<Response>(apiRoutes.contactUs, data),
    onSuccess: (data) => toast.success(data.data.message),
    onError: (err) => toastErrorMessage(err),
  });

  const onSubmit = async (data: ContactUsFormData) => {
    try {
      await mutateAsync(data);
      form.reset();
    } catch (error: any) {
      console.error("Submission error:", error);
    }
  };

  return {
    methods: form,
    submit: form.handleSubmit(onSubmit),
    isPending,
  };
};
export default useContactUs;
