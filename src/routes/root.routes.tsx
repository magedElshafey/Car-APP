import { websiteRoutes } from "./website.routes";
import AxiosConfig from "../lib/axios/Axios";
import RootLayout from "../common/layout/root/RootLayout";
import NotFound from "@/features/app-status/pages/not-found/NotFound";
import ErrorBoundary from "@/features/error/ErrorBoundary";
import { authRoutes } from "@/routes/auth.routes";
import AuthProvider from "@/store/AuthProvider";
export const rootRoutes = {
  path: "/",
  element: (
    <AuthProvider>
      <AxiosConfig />
      <RootLayout />
    </AuthProvider>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    websiteRoutes,
    authRoutes,

    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
