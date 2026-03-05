import { createRoot } from "react-dom/client";
import "./style/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/tanstack-react-query/queryClient";
import { RouterProvider } from "react-router-dom";
import LanguageProvider from "./store/LanguageProvider";
import { Toaster } from "sonner";
import { router } from "./routes/index";
import SeoProvider from "./common/components/seo/SeoProvider";

createRoot(document.getElementById("root")!).render(
  <SeoProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Toaster position="top-center" richColors closeButton duration={3000} />
        <RouterProvider router={router} />
      </LanguageProvider>
    </QueryClientProvider>
  </SeoProvider>,
);
