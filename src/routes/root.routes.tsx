import { websiteRoutes } from "./website.routes";
import AxiosConfig from "../lib/axios/Axios";
import RootLayout from "../common/layout/root/RootLayout";
import NotFound from "@/features/app-status/pages/not-found/NotFound";
import ErrorBoundary from "@/features/error/ErrorBoundary";
export const rootRoutes = {
  path: "/",
  element: (
    <>
      <AxiosConfig />
      <RootLayout />
    </>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    websiteRoutes,

    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
