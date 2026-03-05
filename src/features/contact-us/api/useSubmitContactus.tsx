import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { ContactFormValues } from "../schema/contact.schema";
const useSubmitContactus = () => {
  return useMutation({
    mutationFn: async (contactData: ContactFormValues) => {
      const { data } = await Axios.post(apiRoutes?.contacts, contactData);
      return data;
    },
  });
};

export default useSubmitContactus;
