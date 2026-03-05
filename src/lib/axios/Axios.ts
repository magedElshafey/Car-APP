import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { apiUrl } from "../../services/api-routes/apiRoutes";
import i18n from "../i18n/i18n";

export const Axios = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

const AxiosConfig = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      Axios.interceptors.response.eject(responseInterceptor);
    };
  }, [i18n.language]);
  return null;
};
export default AxiosConfig;
